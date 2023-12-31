import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
// import { InboxOutlined } from "@ant-design/icons";
import { Input, Button, Spin, Modal, message, Select } from "antd";
import { useNavigate } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";

const Uploader = () => {

    // --------------------------------------------------------------------
    // Refs
    const inputFileRef1 = useRef(null);
    const inputFileRef2 = useRef(null);
    const firsRowRef = useRef(null);
    const flipRef = useRef(null);
    const addButtonRef = useRef(null);
    const modeRef = useRef(null);
    const submitButtonRef = useRef(null);
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
    const [flipList, setFlipList] = useState([]);
    const [flipListSum, setFlipListSum] = useState([0]);

    //   State to store Request Data
    const [requestData, setRequestData] = useState({
        userID: "",
        videoFile: [],
        textFile: [],
        samplingRate: "",
        mode: "",
        bodyWeight: "",
        bodyWeightPerMeter: "",
        flips: ['0'],
        forcePlateNames: [],
        lengthOfPlate: "",
        widthOfPlate: "",
        contactFrame: "",
        forceThreshold: "",
        view: "",
        endPointsX: [],
        endPointsY: [],
    });

    // State to display Output
    const [outputVisibility, setOutputVisibility] = useState(false);
    const [videoToggle, setVideoToggle] = useState(false);

    // State to store the output
    const [inputUrl, setInputUrl] = useState('');
    const [outputUrl, setOutputUrl] = useState('');

    // State to handle Modal visibility for crop modal
    const [isModalOpenCrop, setIsModalOpenCrop] = useState(false);
    const [videoWidth, setVideoWidth] = useState(500);

    // State to handle Modal visibility for plate end points
    const [isModalOpenEndPoint, setIsModalOpenEndPoint] = useState(false);

    // States to handle cropping area

    // State to handle end point of force Plates
    const [endPointsX, setEndPointsX] = useState([]);
    const [endPointsY, setEndPointsY] = useState([]);

    //state to validate input and display error
    const [validator, setValidator] = useState({
        videoFile: "",
        textFile: "",
        samplingRate: "",
        mode: "",
        bodyWeight: "",
        bodyWeightPerMeter: "",
        forcePlateNames: "",
        lengthOfPlate: "",
        widthOfPlate: "",
        contactFrame: "",
        forceThreshold: "",
        view: "",
    });

    //flip dropdown options
    const flipOptions =
        [
            {
                value: 1,
                label: 'Fx',
            },
            {
                value: 2,
                label: 'Fy',
            },
            {
                value: 4,
                label: 'Ax',
            },
            {
                value: 8,
                label: 'Ay',
            },
        ]

    // mode dropdown options
    const modeOptions =
        [
            {
                value: 'combine',
                label: 'Combine',
            },
            {
                value: 'ind',
                label: 'Individual',
            },
        ]

    // view dropdown options
    const viewOptions =
        [
            {
                value: 'fx',
                label: 'fx',
            },
            {
                value: 'fy',
                label: 'fy',
            },
        ]


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

    // Handle click on file inputs
    const handleInputClick = (event, id) => {
        event.preventDefault();
        const inputElement = document.getElementById(id);
        if (inputElement) {
            inputElement.click();
        }

    }

    // Handle video file change
    const handleVideoFileChange = (event) => {
        setRequestData({ ...requestData, [event.target.name]: event.target.files[0] })
        setIsModalOpenCrop(true)
        setTimeout(() => {
            generateCanvas(event.target.files[0], 1)
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
    const generateCanvas = (file, generationType) => {
        const canvas = canvasRefCrop.current;
        const video = videoRef.current;
        video.crossOrigin = 'anonymous';
        video.src = URL.createObjectURL(file);
        video.load()
        video.oncanplay = () => {
            // Set canvas dimensions to match video
            if (generationType === 1) {
                message.success("Video Loaded")
            }
            if (video.videoWidth > (0.75 * window.innerWidth)) {
                canvas.width = video.videoWidth / 2;
                canvas.height = video.videoHeight / 2;
                setVideoWidth(video.videoWidth / 2 + 50);
                canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, video.videoWidth / 2, video.videoHeight / 2);
            } else {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                setVideoWidth(video.videoWidth + 50);
                canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, video.videoWidth, video.videoHeight);
            }
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

        const video = videoRef.current;

        const handleMouseDown = (event) => {
            const rect = canvas.getBoundingClientRect();
            if (video.videoWidth > (0.75 * window.innerWidth)) {
                setStartX((event.clientX - rect.left) * 2);
                setStartY((event.clientY - rect.top) * 2);
            } else {
                setStartX((event.clientX - rect.left));
                setStartY((event.clientY - rect.top));
            }
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
                if (video.videoWidth > (0.75 * window.innerWidth)) {
                    setEndX((event.clientX - rect.left) * 2);
                    setEndY((event.clientY - rect.top) * 2);
                    drawSelection((event.clientX - rect.left) * 2, (event.clientY - rect.top) * 2);
                } else {
                    setEndX((event.clientX - rect.left));
                    setEndY((event.clientY - rect.top));
                    drawSelection((event.clientX - rect.left), (event.clientY - rect.top));
                }
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
        const video = videoRef.current;
        const canvas = canvasRefCrop.current;
        const context = canvas.getContext('2d');
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        if (video.videoWidth > (0.75 * window.innerWidth)) {
            context.strokeRect(startX / 2, startY / 2, (eX - startX) / 2, (eY - startY) / 2);
        } else {
            context.strokeRect(startX, startY, (eX - startX), (eY - startY));
        }
    };

    // Clear rectangle selections
    const clearCanvasSelection = (event) => {
        event.preventDefault();
        generateCanvas(requestData.videoFile, 0)
    }

    // Crop Video Data
    const handleCrop = () => {
        setIsModalOpenCrop(false);
        setIsModalOpenEndPoint(true);
        setEndPointsX([]);
        setEndPointsY([]);
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
            canvas.width = (endX - startX) * 3;
            canvas.height = (endY - startY) * 3;
            setVideoWidth(((endX - startX) * 3) + 50);
            canvas.getContext('2d').drawImage(video, startX, startY, (endX - startX), (endY - startY), 0, 0, (endX - startX) * 3, (endY - startY) * 3);
        };
    }

    useEffect(() => {
        const canvas = canvasRefEndPoint.current;
        if (!canvas) return;

        const handleMouseDown = (event) => {
            const rect = canvas.getBoundingClientRect();
            const context = canvas.getContext('2d');
            context.strokeRect(event.clientX - rect.left, event.clientY - rect.top, 2, 2);
            setEndPointsX([...endPointsX, (startX + (event.clientX - rect.left) / 3)]);
            setEndPointsY([...endPointsY, (startY + (event.clientY - rect.top) / 3)]);
        };

        canvas.addEventListener('mousedown', handleMouseDown);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
        };
    }, [canvasRefEndPoint, isModalOpenEndPoint, endPointsX, endPointsY]); // eslint-disable-line react-hooks/exhaustive-deps


    // Canvas Modal for End Point
    const handleCancelEndPoint = () => {
        const video = videoRef.current;
        if (video.videoWidth > (0.75 * window.innerWidth)) {
            setVideoWidth(video.videoWidth / 2 + 50);
        } else {
            setVideoWidth(video.videoWidth + 50);
        }
        setIsModalOpenEndPoint(false);
        setIsModalOpenCrop(true);
        setEndPointsX([]);
        setEndPointsY([]);
    };

    // Save End Points
    const selectEndpoints = () => {
        if (endPointsX.length % 4 !== 0 || endPointsX.length === 0) {
            message.error("Invalid Selection of Points. Please Select Points Again")
            clearEndPoints();
        } else {
            message.success(`${endPointsX.length} end points selected`)
            setRequestData({ ...requestData, endPointsX: endPointsX, endPointsY: endPointsY })
            setIsModalOpenEndPoint(false);
        }
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
        setFlipList([...flipList, []]);
        setFlipListSum([...flipListSum, 0]);
    };

    // Remove Row from Force Plate List
    const deleteForcePlate = (index) => {
        const values = [...forcePlateList];
        const flipValues = [...flipList];
        const flipSum = [...flipListSum];
        values.splice(index, 1);
        flipValues.splice(index, 1);
        flipSum.splice(index, 1);
        setForcePlateList(values);
        setFlipList(flipValues);
        setFlipListSum(flipSum);
        setRequestData({ ...requestData, flips: flipSum, forcePlateNames: values })
    };

    // Handle form data change (Generic)
    // const handleFormChange = (event) => {
    //     setRequestData({ ...requestData, [event.target.name]: event.target.value });
    // }

    const handleFormChangeNotNegativeIntegers = (event) => {
        if (event.target.value[0] === "-") {
            setRequestData({ ...requestData, [event.target.name]: "" })
        } else {
            setRequestData({ ...requestData, [event.target.name]: event.target.value.split('.')[0] })
        }
    }

    const handleFormChangeNotNegativeFloat = (event) => {
        if (event.target.value[0] === "-") {
            setRequestData({ ...requestData, [event.target.name]: "" })
        } else {
            setRequestData({ ...requestData, [event.target.name]: event.target.value })
        }
    }



    //Handle Vector overlay Mode change
    const handleModeChange = (value) => {
        setRequestData({ ...requestData, mode: value });
    }

    // Handel Vector overlay view change
    const handleViewChange = (value) => {
        setRequestData({ ...requestData, view: value });
    }


    // Handle form data change for Force Plates
    const handleFormChangeForcePlate = (event, index) => {
        const values = [...forcePlateList];
        values[index] = event.target.value;
        setForcePlateList(values);
        setRequestData({ ...requestData, forcePlateNames: values })
    }

    const handleFormChangeFlip = (value, index) => {
        const values = [...flipList];
        const flipSum = [...flipListSum]
        values[index] = value;
        setFlipList(values);
        flipSum[index] = value.reduce((a, b) => a + b, 0).toString();
        setFlipListSum(flipSum);
        setRequestData({ ...requestData, flips: flipSum })
    }

    // Submit Form and Send request
    const handleUpload = (e) => {
        e.preventDefault();
        console.log(requestData);

        setOutputVisibility(false);



        if (requestData.videoFile.length === 0) {
            setValidator({
                videoFile: "error",
                textFile: "",
                samplingRate: "",
                mode: "",
                bodyWeight: "",
                bodyWeightPerMeter: "",
                forcePlateNames: "",
                lengthOfPlate: "",
                widthOfPlate: "",
                contactFrame: "",
                forceThreshold: "",
                view: "",
            });
            message.error("Please upload a video file")
        } else if (requestData.textFile.length === 0) {
            setValidator({
                videoFile: "",
                textFile: "error",
                samplingRate: "",
                mode: "",
                bodyWeight: "",
                bodyWeightPerMeter: "",
                forcePlateNames: "",
                lengthOfPlate: "",
                widthOfPlate: "",
                contactFrame: "",
                forceThreshold: "",
                view: "",
            });
            message.error("Please upload a force file")
        } else if (requestData.samplingRate === "" || requestData.samplingRate <= 0) {
            setValidator({
                videoFile: "",
                textFile: "",
                samplingRate: "error",
                mode: "",
                bodyWeight: "",
                bodyWeightPerMeter: "",
                forcePlateNames: "",
                lengthOfPlate: "",
                widthOfPlate: "",
                contactFrame: "",
                forceThreshold: "",
                view: "",
            });
        } else if (requestData.mode === "") {
            setValidator({
                videoFile: "",
                textFile: "",
                samplingRate: "",
                mode: "error",
                bodyWeight: "",
                bodyWeightPerMeter: "",
                forcePlateNames: "",
                lengthOfPlate: "",
                widthOfPlate: "",
                contactFrame: "",
                forceThreshold: "",
                view: "",
            });
        } else if (requestData.bodyWeight === "" || requestData.bodyWeight <= 0) {
            setValidator({
                videoFile: "",
                textFile: "",
                samplingRate: "",
                mode: "",
                bodyWeight: "error",
                bodyWeightPerMeter: "",
                forcePlateNames: "",
                lengthOfPlate: "",
                widthOfPlate: "",
                contactFrame: "",
                forceThreshold: "",
                view: "",
            });
        } else if (requestData.bodyWeightPerMeter === "" || requestData.bodyWeightPerMeter <= 0) {
            setValidator({
                videoFile: "",
                textFile: "",
                samplingRate: "",
                mode: "",
                bodyWeight: "",
                bodyWeightPerMeter: "error",
                forcePlateNames: "",
                lengthOfPlate: "",
                widthOfPlate: "",
                contactFrame: "",
                forceThreshold: "",
                view: "",
            });
        } else if (requestData.contactFrame === "" || requestData.contactFrame <= 0) {
            setValidator({
                videoFile: "",
                textFile: "",
                samplingRate: "",
                mode: "",
                bodyWeight: "",
                bodyWeightPerMeter: "",
                forcePlateNames: "",
                lengthOfPlate: "",
                widthOfPlate: "",
                contactFrame: "error",
                forceThreshold: "",
                view: "",
            });
        } else if (requestData.lengthOfPlate === "" || requestData.lengthOfPlate <= 0) {
            setValidator({
                videoFile: "",
                textFile: "",
                samplingRate: "",
                mode: "",
                bodyWeight: "",
                bodyWeightPerMeter: "",
                forcePlateNames: "",
                lengthOfPlate: "error",
                widthOfPlate: "",
                contactFrame: "",
                forceThreshold: "",
                view: "",
            });
        } else if (requestData.widthOfPlate === "" || requestData.widthOfPlate <= 0) {
            setValidator({
                videoFile: "",
                textFile: "",
                samplingRate: "",
                mode: "",
                bodyWeight: "",
                bodyWeightPerMeter: "",
                forcePlateNames: "",
                lengthOfPlate: "",
                widthOfPlate: "error",
                contactFrame: "",
                forceThreshold: "",
                view: "",
            });
        } else if (requestData.forceThreshold === "" || requestData.forceThreshold <= 0) {
            setValidator({
                videoFile: "",
                textFile: "",
                samplingRate: "",
                mode: "",
                bodyWeight: "",
                bodyWeightPerMeter: "",
                forcePlateNames: "",
                lengthOfPlate: "",
                widthOfPlate: "",
                contactFrame: "",
                forceThreshold: "error",
                view: "",
            });
        } else if (requestData.view === "") {
            setValidator({
                videoFile: "",
                textFile: "",
                samplingRate: "",
                mode: "",
                bodyWeight: "",
                bodyWeightPerMeter: "",
                forcePlateNames: "",
                lengthOfPlate: "",
                widthOfPlate: "",
                contactFrame: "",
                forceThreshold: "",
                view: "error",
            });
        } else if (requestData.forcePlateNames.length !== endPointsX.length / 4) {
            message.error("Invalid number of Force Plates")
            message.info(`Please enter names of ${endPointsX.length / 4} plate(s) as ${endPointsX.length} end points have been selected`)
        } else {
            const key = 'updatable';
            message.open({
                key,
                type: 'loading',
                content: 'Processing your vector overlay',
                duration: 20
            })
            setValidator({
                videoFile: "",
                textFile: "",
                samplingRate: "",
                mode: "",
                bodyWeight: "",
                bodyWeightPerMeter: "",
                forcePlateNames: "",
                lengthOfPlate: "",
                widthOfPlate: "",
                contactFrame: "",
                forceThreshold: "",
                view: "",
            });
            axios.post(process.env.REACT_APP_SERVER_URL.concat("api/v1/data_uploader/"), requestData, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response, _) => {
                    message.open({
                        key,
                        type: 'loading',
                        content: 'Processing output video'
                    })
                    setOutputUrl(response.data.videoFileOutput)
                    setInputUrl(response.data.videoFileInput)
                    console.log(response.data.videoFileOutput)
                    // setRequestData({
                    //     ...requestData,
                    //     videoFile: [],
                    //     textFile: [],
                    //     samplingRate: "",
                    //     mode: "",
                    //     bodyWeight: "",
                    //     bodyWeightPerMeter: "",
                    //     flips: [],
                    //     forcePlateNames: [],
                    //     lengthOfPlate: "",
                    //     widthOfPlate: "",
                    //     contactFrame: "",
                    //     view: "",
                    //     forceThreshold: "",
                    //     endPointsX: [],
                    //     endPointsY: [],
                    // })
                    // setForcePlateList([""]);
                    // setFlipList([""]);
                    // setFlipListSum([0]);
                    setOutputVisibility(true);
                    // if (inputFileRef1.current) {
                    //     inputFileRef1.current.value = null;
                    // }
                    // if (inputFileRef2.current) {
                    //     inputFileRef2.current.value = null;
                    // }
                    message.open({
                        key,
                        type: 'success',
                        content: 'Vector overlay ready for download'
                    })
                    setTimeout(() => {
                        const outputSection = document.getElementById('output_section');
                        if (outputSection) {
                            outputSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            });
                        }
                    }, 300);
                })
                .catch((error) => {
                    message.open({
                        key,
                        type: 'error',
                        content: "Cannot Process this video. Couldn't generate a vector overlay"
                    })
                })
        }
    };

    // Toggle between input and output Video
    const handleVideoToggle = () => {
        setVideoToggle(!videoToggle);
    }

    // Download Vector Overlay
    const downloadVideo = async () => {
        const response = await fetch(outputUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'vector_overlay.mp4';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    //Tour
    const redirectToTour = () => {
        navigate('/vectorOverlayTutorial');
    }

    return (
        <>
            {showSpinner ? <Spin /> :
                <div className="bg-[#eeeeee]">
                    <div className="w-[80%] mt-[2%] mx-auto bg-white shadow-md rounded-lg px-[2rem] py-[2rem]">
                        {/* div to pack video data into a request */}
                        <form enctype="multipart/form-data">
                            {/* Upload video file */}
                            <Row>
                                <Col md={12}>
                                    <p>
                                        Upload Your Video
                                    </p>
                                    <div className="relative">
                                        <button onClick={(event) => { handleInputClick(event, 'video_input') }} class="absolute bg-white border-2 border-purple-500 text-pruple-500 w-[7.2rem] py-[0.3rem] rounded hover:cursor-pointer z-10">
                                            Choose File
                                        </button>
                                        <input
                                            type="file"
                                            id="video_input"
                                            className="z-5 placeholder-pl-10 pl-[1rem] pt-[0.2rem]"
                                            name="videoFile"
                                            ref={inputFileRef1}
                                            onChange={event => handleVideoFileChange(event)}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <br />

                            <video ref={videoRef} controls autoPlay style={{ display: "none" }}></video>
                            <Modal
                                title="Please Crop the Area of the Force Plate"
                                open={isModalOpenCrop}
                                onCancel={handleCancelCropVideo}
                                closeIcon={false}
                                width={videoWidth}
                                footer={[

                                    <Button key="crop" onClick={event => clearCanvasSelection(event)}>Clear Selection</Button>,
                                    <Button key="back" onClick={handleCrop}>
                                        Crop
                                    </Button>,
                                ]}>
                                <canvas ref={canvasRefCrop} style={{ display: "inline" }}></canvas>
                            </Modal>
                            <Modal
                                title="Please Select the End Points of Force Plate by clicking on the canvas"
                                open={isModalOpenEndPoint}
                                onCancel={handleCancelEndPoint}
                                closeIcon={false}
                                width={videoWidth}
                                footer={[

                                    <Button key="crop" onClick={event => clearEndPoints(event)}>Clear</Button>,
                                    <Button key="back" onClick={selectEndpoints}>
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
                                    <p>
                                        Upload Force Plate details
                                    </p>
                                    <div className="relative">
                                        <button onClick={(event) => { handleInputClick(event, 'force_input') }} class="absolute bg-white border-2 border-purple-500 text-pruple-500 w-[7.2rem] py-[0.3rem] rounded hover:cursor-pointer z-10">
                                            Choose File
                                        </button>
                                        <input
                                            type="file"
                                            id="force_input"
                                            className="z-5 placeholder-pl-10 pl-[1rem] pt-[0.2rem]"
                                            placeholder="Upload details of force plate"
                                            name="textFile"
                                            ref={inputFileRef2}
                                            onChange={event => handleFileChange(event)}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <br />
                            <br />
                            {/* Other required data */}
                            <Row ref={firsRowRef}>
                                <Col md={4}>
                                    Sampling Rate
                                    <Input
                                        type="number"
                                        placeholder="Sampling Rate in Hz"
                                        name="samplingRate"
                                        value={requestData.samplingRate}
                                        onChange={event => handleFormChangeNotNegativeIntegers(event)}
                                        status={validator.samplingRate}
                                        min={1}
                                        step={1}
                                    />
                                </Col>
                                <Col md={4}>
                                    Contact Frame
                                    <Input
                                        type="number"
                                        placeholder="Contact Frame"
                                        name="contactFrame"
                                        value={requestData.contactFrame}
                                        onChange={event => handleFormChangeNotNegativeIntegers(event)}
                                        status={validator.contactFrame}
                                        min={1}
                                        step={1}
                                    />
                                </Col>
                                <Col md={4} >
                                    View
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder={"Select Vector Overlay View"}
                                        options={viewOptions}
                                        onChange={handleViewChange}
                                        status={validator.view}
                                    />
                                </Col>
                            </Row>
                            <br />
                            <br />
                            <Row>
                                <Col md={4}>
                                    Body Weight
                                    <Input
                                        type="number"
                                        placeholder="N"
                                        name="bodyWeight"
                                        value={requestData.bodyWeight}
                                        onChange={event => handleFormChangeNotNegativeIntegers(event)}
                                        status={validator.bodyWeight}
                                        min={1}
                                        step={1}
                                    />
                                </Col>
                                <Col md={4}>
                                    Body Weight per meter (kg/m)
                                    <Input
                                        type="number"
                                        placeholder="N/m"
                                        name="bodyWeightPerMeter"
                                        value={requestData.bodyWeightPerMeter}
                                        onChange={event => handleFormChangeNotNegativeIntegers(event)}
                                        status={validator.bodyWeightPerMeter}
                                        min={1}
                                        step={1}
                                    />
                                </Col>
                                <Col md={4}>
                                    Force Threshold
                                    <Input
                                        placeholder="N"
                                        type="number"
                                        name="forceThreshold"
                                        value={requestData.forceThreshold}
                                        onChange={event => handleFormChangeNotNegativeFloat(event)}
                                        status={validator.forceThreshold}
                                        min={0}
                                        step={0.1}
                                    />
                                </Col>
                            </Row>
                            <br />
                            <br />
                            {/* Dynamic Force plates names */}
                            <Row>
                                <Col xs={6}>
                                    Names of Force Plates
                                </Col>
                                <Col>
                                    Select Flip
                                </Col>
                            </Row>
                            {forcePlateList.map((forcePlate, index) => (
                                <Row key={index}>
                                    <Col xs={6}>
                                        <Input
                                            placeholder={`Name of Force Plate ${index + 1}`}
                                            onChange={event => { handleFormChangeForcePlate(event, index) }}
                                            value={forcePlate}
                                        />
                                    </Col>
                                    <Col xs={5} ref={flipRef}>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder={`Flip for Force Plate ${index + 1}`}
                                            onChange={value => handleFormChangeFlip(value, index)}
                                            options={flipOptions}
                                            value={flipList[index]}
                                        />
                                    </Col>
                                    {index === 0 ? (
                                        <Col xs={1}>
                                            <button
                                                type="button"
                                                className="w-[2rem] h-[2rem] border-2 border-purple-400 text-purple-400 rounded-lg"
                                                onClick={addForcePlate}
                                                ref={addButtonRef}
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
                                                className="w-[2rem] h-[2rem] border-2 border-red-400 text-red-400 rounded-lg"
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
                                <Col md={4}>
                                    Length of Plate
                                    <Input
                                        placeholder="Length of Plate"
                                        type="number"
                                        name="lengthOfPlate"
                                        value={requestData.lengthOfPlate}
                                        onChange={event => handleFormChangeNotNegativeFloat(event)}
                                        status={validator.lengthOfPlate}
                                        min={0}
                                        step={0.1}
                                    />
                                </Col>
                                <Col md={4}>
                                    Width of Plate
                                    <Input
                                        placeholder="Width of Plate"
                                        type="number"
                                        name="widthOfPlate"
                                        value={requestData.widthOfPlate}
                                        onChange={event => handleFormChangeNotNegativeFloat(event)}
                                        status={validator.widthOfPlate}
                                        min={0}
                                        step={0.1}
                                    />
                                </Col>
                                <Col md={4} ref={modeRef}>
                                    Mode
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder={"Select Vector Overlay Mode"}
                                        options={modeOptions}
                                        onChange={handleModeChange}
                                        status={validator.mode}
                                    />
                                </Col>
                            </Row>
                            <br />
                            {/* Submit Form */}
                            {/* <div className="flex justify-between mt-[1rem]"> */}
                            <button
                                type=""
                                className="bg-purple-400 rounded-lg w-[10rem] h-[2rem] text-white border-none"
                                onClick={(event) => handleUpload(event)}
                                ref={submitButtonRef}
                            >
                                Get Vector Overlay
                            </button>
                        </form>
                        <div className="flex justify-end">
                            <button type="primary" className="border-none mx-1 bg-transparent text-purple-400" onClick={redirectToTour}>Need help?</button>
                            <button type="primary" className="border-none mx-1 bg-transparent text-purple-400">How it works</button>
                        </div>

                    </div>
                    {outputVisibility ?
                        <div id="output_section" className="bg-white w-[95%] shadow-md mx-auto rounded-[2rem] my-[5rem] py-[3rem] px-[3rem]">
                            <h2 className="">Results</h2>
                            {videoToggle ?
                                <div>
                                    <button onClick={downloadVideo} className="text-white bg-purple-500 rounded-lg px-2 py-2 mr-2">Download Vector Overlay</button>
                                    <button onClick={handleVideoToggle} className="text-white bg-purple-500 rounded-lg px-2 py-2">Show Vector Overlay</button>
                                    <h5>Input Video</h5>
                                    <iframe width="100%" height="600" title='input_video' src={inputUrl} key={inputUrl} autoPlay muted loop>
                                    </iframe>
                                </div>
                                :
                                <div>
                                    <button onClick={downloadVideo} className="text-white bg-purple-500 rounded-lg px-2 py-2 mr-2">Download Vector Overlay</button>
                                    <button onClick={handleVideoToggle} className="text-white bg-purple-500 rounded-lg px-2 py-2">Show Input Video</button>
                                    <h5>Vector Overlay</h5>
                                    <iframe width="100%" height="600" title='input_video' src={outputUrl} key={outputUrl} autoPlay muted loop>
                                    </iframe>
                                </div>
                            }
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
