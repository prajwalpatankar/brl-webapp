import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
// import { InboxOutlined } from "@ant-design/icons";
import { Input, Button, Spin, Modal } from "antd";
import { useNavigate } from 'react-router-dom';

import "./VectorOverlay.css";
import { Container, Row, Col } from "react-bootstrap";

const Uploader = () => {

    // --------------------------------------------------------------------
    // Refs
    const inputFileRef1 = useRef(null);
    const inputFileRef2 = useRef(null);
    const videoRef = useRef(null);
    const canvasRefCrop = useRef(null);
    const canvasRefEndPoint = useRef(null);

    // --------------------------------------------------------------------
    // Constants

    const navigate = useNavigate();

    const { setUserToken, userDetails, setUserDetails } = useContext(UserContext);

    // --------------------------------------------------------------------
    // States

    // Spinner state
    const [showSpinner, setShowSpinner] = useState(true);

    // State to store the video file
    // const [fileListVideo, setFileListVideo] = useState([]);

    // State to store the txt file
    // const [fileListText, setFileListText] = useState([]);

    // State to handle file uploading stage
    //   const [uploading, setUploading] = useState(false);

    // State to handle dynamic force plate list 
    const [forcePlateList, setForcePlateList] = useState([""]);

    //   State to store Request Data
    const [requestData, setRequestData] = useState({
        userID: "",
        videoFile: [],
        textFile: [],
        samplingRate: "",
        bodyWeightPerMeter: "",
        forcePlateNames: [],
        lengthOfPlate: "",
        widthOfPlate: "",
        heightOfPlate: "",
        endPointsX: [],
        endPointsY: [],
    });

    // State to display Output
    const [outputVisibility, setOutputVisibility] = useState(false);

    // State to store the output
    const [inputUrl, setInputUrl] = useState('');
    const [outputUrl, setOutputUrl] = useState('');

    // State to handle Modal visibility for crop modal
    const [isModalOpenCrop, setIsModalOpenCrop] = useState(false);

    // State to handle Modal visibility for plate end points
    const [isModalOpenEndPoint, setIsModalOpenEndPoint] = useState(false);

    // States to handle cropping area

    // State to handle end point of force Plates
    const [endPointsX, setEndPointsX] = useState([]);
    const [endPointsY, setEndPointsY] = useState([]);



    // --------------------------------------------------------------------
    // Initializers

    useEffect(() => {
        if (localStorage.getItem('token') === '') {
            navigate('/login')
        } else {
            setUserToken(localStorage.getItem('token'))
            axios.post(process.env.REACT_APP_SERVER_URL.concat("api/v1/auth/jwt/verify/"), { token: localStorage.getItem('token') })
                .then((res, _) => {
                    //valid token
                    console.log("Token Verification: ", res.status)
                    setShowSpinner(false);
                    if (userDetails.id === "") {
                        axios.get(process.env.REACT_APP_SERVER_URL.concat("api/v1/auth/users/me/"), {
                            headers: {
                                Authorization: `JWT ${localStorage.getItem('token')}`,
                            },
                        })
                            .then((response, request) => {
                                setUserDetails(response.data)
                                setRequestData({ ...requestData, userID: response.data.id })
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    } else {
                        setRequestData({ ...requestData, userID: userDetails.id })
                    }
                })
                .catch((error) => {
                    console.log(error)
                    navigate('/login')
                })
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps



    // --------------------------------------------------------------------
    // Methods

    // Handle video file change
    const handleVideoFileChange = (event) => {
        setRequestData({ ...requestData, [event.target.name]: event.target.files[0] })
        setIsModalOpenCrop(true)
        setTimeout(() => {
            generateCanvas(event.target.files[0])
        }, 300)
    }

    // Canvas Modal
    const handleCancelCropVideo = () => {
        if (inputFileRef1.current) {
            inputFileRef1.current.value = null;
        }
        setIsModalOpenCrop(false);
    };

    // display first frame of the video in a canvas
    const generateCanvas = (file) => {
        const canvas = canvasRefCrop.current;
        const video = videoRef.current;
        video.crossOrigin = 'anonymous';
        video.src = URL.createObjectURL(file);
        video.load()

        video.oncanplay = () => {
            // Set canvas dimensions to match video
            canvas.width = video.videoWidth / 2;
            canvas.height = video.videoHeight / 2;
            canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, video.videoWidth / 2, video.videoHeight / 2);
        };
    }

    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [endX, setEndX] = useState(0);
    const [endY, setEndY] = useState(0);
    const [isSelecting, setIsSelecting] = useState(false);

    useEffect(() => {
        const canvas = canvasRefCrop.current;
        if (!canvas) return;

        const handleMouseDown = (event) => {
            console.log("DOWN")
            const rect = canvas.getBoundingClientRect();
            console.log("X", (event.clientX - rect.left) * 2)
            console.log("Y", (event.clientY - rect.top) * 2)
            setStartX((event.clientX - rect.left) * 2);
            setStartY((event.clientY - rect.top) * 2);
            setIsSelecting(true);
        };

        // const handleMouseMove = (event) => {
        //     if (isSelecting) {
        //         const rect = canvas.getBoundingClientRect();
        //         setEndtX((event.clientX - rect.left) * 2);
        //         setEndY((event.clientY - rect.top) * 2);
        //         drawSelection();
        //     }
        // };

        const handleMouseUp = (event) => {
            if (isSelecting) {
                setIsSelecting(false);
                const rect = canvas.getBoundingClientRect();
                setEndX((event.clientX - rect.left) * 2);
                setEndY((event.clientY - rect.top) * 2);
                drawSelection((event.clientX - rect.left) * 2, (event.clientY - rect.top) * 2);
            }
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        // canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            // canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, [canvasRefCrop, isSelecting, isModalOpenCrop]); // eslint-disable-line react-hooks/exhaustive-deps


    const drawSelection = (eX, eY) => {
        const canvas = canvasRefCrop.current;
        const context = canvas.getContext('2d');
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.strokeRect(startX / 2, startY / 2, (eX - startX) / 2, (eY - startY) / 2);
    };

    // Clear rectangle selections
    const clearCanvasSelection = (event) => {
        event.preventDefault();
        generateCanvas(requestData.videoFile)
    }

    // Crop Video Data
    const handleCrop = () => {
        setIsModalOpenCrop(false);
        setIsModalOpenEndPoint(true);
        setTimeout(() => {
            generateCanvasEndPoint(requestData.videoFile);
        }, 300)
    };

    // Generate a new cropped canvas
    const generateCanvasEndPoint = (file) => {
        const canvas = canvasRefEndPoint.current;
        const video = videoRef.current;
        video.crossOrigin = 'anonymous';
        video.src = URL.createObjectURL(file);
        video.load()

        video.oncanplay = () => {
            // Set canvas dimensions to match video
            canvas.width = endX - startX;
            canvas.height = endY - startY;
            canvas.getContext('2d').drawImage(video, startX, startY, (endX - startX), (endY - startY), 0, 0, (endX - startX), (endY - startY));
        };
    }

    useEffect(() => {
        const canvas = canvasRefEndPoint.current;
        if (!canvas) return;

        const handleMouseDown = (event) => {
            const rect = canvas.getBoundingClientRect();
            console.log("X", (event.clientX - rect.left))
            console.log("Y", (event.clientY - rect.top))
            const context = canvas.getContext('2d');
            context.strokeRect(event.clientX - rect.left,event.clientY - rect.top,1,1);
            setEndPointsX([...endPointsX, (startX + event.clientX - rect.left)]);
            setEndPointsY([...endPointsY, (startY + event.clientY - rect.top)]);
        };

        canvas.addEventListener('mousedown', handleMouseDown);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
        };
    }, [canvasRefEndPoint, isModalOpenEndPoint, endPointsX, endPointsY]); // eslint-disable-line react-hooks/exhaustive-deps


    // Canvas Modal for End Point
    const handleCancelEndPoint = () => {
        setIsModalOpenEndPoint(false);
        setIsModalOpenCrop(true);
        setEndPointsX([]);
        setEndPointsY([]);
    };

    // Save End Points
    const selectEndpoints = () => {
        console.log(endPointsX)
        console.log(endPointsY)
        setRequestData({...requestData, endPointsX: endPointsX, endPointsY: endPointsY})
        setIsModalOpenEndPoint(false);
    }

    const clearEndPoints = () => {
        setEndPointsX([]);
        setEndPointsY([]);
        generateCanvasEndPoint(requestData.videoFile);
    }




    // Handle force plate file change
    const handleFileChange = (event) => {
        setRequestData({ ...requestData, [event.target.name]: event.target.files[0] })
    }

    // Add dynamic Row to Force Plate List
    const addForcePlate = () => {
        // var len = forcePlateList.length;
        // if (len !== 0 && forcePlateList[len - 1] === "") {
        //   message.error("Please update existing row before adding another row");
        //   return;
        // }
        setForcePlateList([...forcePlateList, ""]);
    };

    // Remove Row from Force Plate List
    const deleteForcePlate = (index) => {
        const values = [...forcePlateList];
        values.splice(index, 1);
        setForcePlateList(values);
    };

    // Handle form data change (Generic)
    const handleFormChange = (event) => {
        setRequestData({ ...requestData, [event.target.name]: event.target.value });
        // console.log(requestData);
    }


    // Handle form data change for Force Plates
    const handleFormChangeForcePlate = (event, index) => {
        const values = [...forcePlateList];
        values[index] = event.target.value;
        setForcePlateList(values);
        setRequestData({ ...requestData, forcePlateNames: values })
    }

    // Submit Form and Send request
    const handleUpload = (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // fileListVideo.forEach((file) => {
        //     formData.append("files[]", file);
        // });
        // // setUploading(true);
        // console.log(formData);


        // // Send Request here
        console.log(forcePlateList)
        console.log(requestData);

        axios.post(process.env.REACT_APP_SERVER_URL.concat("api/v1/data_uploader/"), requestData, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response, _) => {
                setOutputUrl(response.data.videoFileInput)
                setInputUrl(response.data.videoFileInput)
                console.log(response.data.videoFile)
                // setRequestData({
                //     ...requestData,
                //     videoFile: [],
                //     textFile: [],
                //     samplingRate: "",
                //     bodyWeightPerMeter: "",
                //     forcePlateNames: [],
                //     lengthOfPlate: "",
                //     widthOfPlate: "",
                //     heightOfPlate: "",
                //     endPointsX: [],
                //     endPointsY: [],
                // })
                // setForcePlateList([""]);
                setOutputVisibility(true);
                // if (inputFileRef1.current) {
                //     inputFileRef1.current.value = null;
                // }
                // if (inputFileRef2.current) {
                //     inputFileRef2.current.value = null;
                // }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <>
            {showSpinner ? <Spin /> :
                <div>
                    <Container className="form-container text-left">
                        {/* Container to pack video data into a request */}
                        <form enctype="multipart/form-data">
                            {/* Upload video file */}
                            <Row>
                                <Col md={12}>
                                    Upload Your Video
                                    <input
                                        type="file"
                                        placeholder="Upload you video"
                                        name="videoFile"
                                        ref={inputFileRef1}
                                        onChange={event => handleVideoFileChange(event)}
                                    />
                                </Col>
                            </Row>
                            <br />

                            <video ref={videoRef} controls autoPlay style={{ display: "none" }}></video>
                            <Modal
                                title="Please Crop the Area of the Force Plate"
                                open={isModalOpenCrop}
                                onCancel={handleCancelCropVideo}
                                closeIcon={false}
                                footer={[

                                    <Button key="crop" onClick={event => clearCanvasSelection(event)}>Clear Selection</Button>,
                                    <Button type="primary" key="back" onClick={handleCrop}>
                                        Crop
                                    </Button>,
                                ]}>
                                <canvas ref={canvasRefCrop} style={{ display: "inline" }}></canvas>
                            </Modal>
                            <Modal
                                title="Please Select the End Points of Force Plate by double clicking"
                                open={isModalOpenEndPoint}
                                onCancel={handleCancelEndPoint}
                                closeIcon={false}
                                footer={[

                                    <Button key="crop" onClick={event => clearEndPoints(event)}>Clear</Button>,
                                    <Button type="primary" key="back" onClick={selectEndpoints}>
                                        Done
                                    </Button>,
                                ]}>
                                <canvas ref={canvasRefEndPoint} style={{ display: "inline" }}></canvas>
                            </Modal>
                            <br />
                            {/* Upload .txt file generated by the force plates*/}
                            {/* Upload Force Plate details */}
                            <Row>
                                <Col md={12}>
                                    Upload Force Plate details
                                    <input
                                        type="file"
                                        placeholder="Upload details of force plate"
                                        name="textFile"
                                        ref={inputFileRef2}
                                        onChange={event => handleFileChange(event)}
                                    />
                                </Col>
                            </Row>
                            <br />
                            {/* Other required data */}
                            <Row>
                                <Col md={6}>
                                    Sampling Rate
                                    <Input
                                        type="number"
                                        placeholder="Sampling Rate in Hz"
                                        name="samplingRate"
                                        value={requestData.samplingRate}
                                        onChange={event => handleFormChange(event)}
                                    />
                                </Col>

                                <Col md={6}>
                                    Body Weight per meter (kg/m)
                                    <Input
                                        type="number"
                                        step={0.01}
                                        placeholder="kg/m"
                                        name="bodyWeightPerMeter"
                                        value={requestData.bodyWeightPerMeter}
                                        onChange={event => handleFormChange(event)}
                                    />
                                </Col>
                            </Row>
                            <br />
                            <br />
                            {/* Dynamic Force plates names */}
                            <Row>&nbsp;&nbsp;&nbsp;Names of Force Plates</Row>
                            {forcePlateList.map((forcePlate, index) => (
                                <Row key={index}>
                                    <Col xs={11}>
                                        <Input
                                            placeholder={`Name of Force Plate ${index + 1}`}
                                            onChange={event => { handleFormChangeForcePlate(event, index) }}
                                            value={forcePlate}
                                        />
                                        <br />
                                        <br />
                                    </Col>
                                    {index === 0 ? (
                                        <Col xs={1}>
                                            <button
                                                type="button"
                                                className="btn btn-success force-plate-name-btn"
                                                onClick={addForcePlate}
                                            >
                                                +
                                            </button>
                                            <br />
                                            <br />
                                        </Col>
                                    ) : (
                                        <Col xs={1}>
                                            <button
                                                type="button"
                                                className="btn btn-danger force-plate-name-btn"
                                                onClick={() => {
                                                    deleteForcePlate(index);
                                                }}
                                            >
                                                -
                                            </button>
                                            <br />
                                            <br />
                                        </Col>
                                    )}
                                </Row>
                            ))}
                            {/* Dimesion Data */}
                            <Row>
                                <Col md={12}>
                                    Plate Dimensions <br />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    Length
                                    <Input
                                        placeholder="Length of Plate"
                                        name="lengthOfPlate"
                                        value={requestData.lengthOfPlate}
                                        onChange={event => handleFormChange(event)}
                                    />
                                </Col>
                                <Col md={4}>
                                    Width
                                    <Input
                                        placeholder="Width of Plate"
                                        name="widthOfPlate"
                                        value={requestData.widthOfPlate}
                                        onChange={event => handleFormChange(event)} />
                                </Col>
                                <Col md={4}>
                                    Height
                                    <Input
                                        placeholder="Height of Plate"
                                        name="heightOfPlate"
                                        value={requestData.heightOfPlate}
                                        onChange={event => handleFormChange(event)} />
                                </Col>
                            </Row>
                            <br />
                            {/* Submit Form */}
                            <Button
                                type="primary"
                                className="upload-btn"
                                onClick={(event) => handleUpload(event)}
                            >
                                Upload Video
                            </Button>
                        </form>
                        <br /><br /><br /><br /><br />


                    </Container>
                    {outputVisibility ?
                        <div className="output-window">
                            <h2 className="output-title">Output</h2>
                            <h5>Input Video</h5>
                            <iframe width="640" height="300" title='input_video' src={inputUrl} autoPlay muted loop>
                            </iframe>
                            <h5>Output Video</h5>
                            <iframe width="640" height="300" title='input_video' src={outputUrl} autoPlay muted loop>
                            </iframe>
                        </div>
                        :
                        <></>
                    }
                </div>
            }
        </>
    );
};

export default Uploader;
