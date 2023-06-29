import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { InboxOutlined } from "@ant-design/icons";
import { Input, Upload, message, Button, Spin } from "antd";
import { createPath, useNavigate } from 'react-router-dom';

import "./VectorOverlay.css";
import { Container, Row, Col } from "react-bootstrap";

const Uploader = () => {

    // --------------------------------------------------------------------
    // Refs
    const inputFileRef1 = useRef(null);
    const inputFileRef2 = useRef(null);

    // --------------------------------------------------------------------
    // Constants

    const { Dragger } = Upload;

    const navigate = useNavigate();

    const { userToken, setUserToken, userDetails, setUserDetails } = useContext(UserContext);

    // --------------------------------------------------------------------
    // States

    // Spinner state
    const [showSpinner, setShowSpinner] = useState(true);

    // State to store the video file
    const [fileListVideo, setFileListVideo] = useState([]);

    // State to store the txt file
    const [fileListText, setFileListText] = useState([]);

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
        forcePlateNames: [""],
        lengthOfPlate: "",
        widthOfPlate: "",
        heightOfPlate: "",
    });

    // State to display Output
    const [outputVisibility, setOutputVisibility] = useState(false);

    // State to store the output
    const [outputUrl, setOutputUrl] = useState('');


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
    }, [])

    // --------------------------------------------------------------------
    // Methods

    const handleFileChange = (event) => {
        setRequestData({ ...requestData, [event.target.name]: event.target.files[0] })
    }

    // Handle video file change
    // const videoFile = {
    //     onRemove: (file) => {
    //         const index = fileListVideo.indexOf(file);
    //         const newFileList = fileListVideo.slice();
    //         newFileList.splice(index, 1);
    //         setFileListVideo(newFileList);
    //         setRequestData({ ...requestData, videoFile: newFileList });
    //         console.log(requestData)
    //     },
    //     beforeUpload: (file) => {
    //         setFileListVideo([...fileListVideo, file]);
    //         setRequestData({ ...requestData, videoFile: [...fileListText, file] });
    //         return false;
    //     },
    //     fileListVideo,
    // };

    // Handle text file change
    // const textFile = {
    //     onRemove: (file) => {
    //         const index = fileListText.indexOf(file);
    //         const newFileList = fileListText.slice();
    //         newFileList.splice(index, 1);
    //         setFileListText(newFileList);
    //         setRequestData({ ...requestData, textFile: newFileList });
    //         console.log(requestData)
    //     },
    //     beforeUpload: (file) => {
    //         setFileListText([...fileListText, file]);
    //         setRequestData({ ...requestData, textFile: [...fileListText, file] });
    //         return false;
    //     },
    //     fileListText,
    // };

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
                setOutputUrl(response.data.videoFile)
                console.log(response.data.videoFile)
                // setRequestData({
                //     ...requestData,
                //     videoFile: [],
                //     textFile: [],
                //     samplingRate: "",
                //     bodyWeightPerMeter: "",
                //     forcePlateNames: [""],
                //     lengthOfPlate: "",
                //     widthOfPlate: "",
                //     heightOfPlate: "",
                // })
                // setForcePlateList([""]);
                // setOutputVisibility(true);
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
                            {/* Upload Your Video */}
                            {/* <Dragger {...videoFile}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag file to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                    Upload you video here to get a vector overlay on your video.
                                </p>
                            </Dragger> */}
                            <Row>
                                <Col md={12}>
                                    Upload Your Video
                                    <input
                                        type="file"
                                        placeholder="Upload you video"
                                        name="videoFile"
                                        ref={inputFileRef1}
                                        onChange={event => handleFileChange(event)}
                                    />
                                </Col>
                            </Row>
                            <br />
                            {/* Upload .txt file generated by the force plates*/}
                            {/* Upload Force Plate details */}
                            {/* <Dragger {...textFile}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag file to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                    Upload you video here to get a vector overlay on your video.
                                </p>
                            </Dragger> */}
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
                            <iframe width="640" height="300" title='input_video' src={outputUrl} autoPlay muted loop>
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
