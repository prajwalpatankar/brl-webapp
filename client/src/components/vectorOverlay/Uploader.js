import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { InboxOutlined } from "@ant-design/icons";
import { Input, Upload, message, Button, Spin } from "antd";
import { useNavigate } from 'react-router-dom';

import "./VectorOverlay.css";
import { Container, Row, Col } from "react-bootstrap";

const Uploader = () => {

    // --------------------------------------------------------------------
    // Constants

    const { Dragger } = Upload;

    const navigate = useNavigate();

    const { userToken } = useContext(UserContext);

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
        forcePlateNames: [],
        lengthOfPlate: "",
        widthOfPlate: "",
        heightOfPlate: "",
    });

    // State to display Output
    const [outputVisibility, setOutputVisibility] = useState(false);


    // --------------------------------------------------------------------
    // Initializers

    useEffect(() => {
        if (localStorage.getItem('token') === '') {
            navigate('/login')
        } else {
            axios.post(process.env.REACT_APP_SERVER_URL.concat("auth/jwt/verify/"), { token: localStorage.getItem('token') })
                .then(() => {
                    //valid token
                    setShowSpinner(false);
                    axios.get(process.env.REACT_APP_SERVER_URL.concat("auth/users/me/"), {
                        headers: {
                            Authorization: `JWT ${userToken}`,
                          },
                    })
                    .then((response,request) => {
                        console.log(response)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                })
                .catch((error) => {
                    console.log(error)
                    navigate('/login')
                })
        }
    })

    // --------------------------------------------------------------------
    // Methods

    // Handle video file change
    const videoFile = {
        onRemove: (file) => {
            const index = fileListVideo.indexOf(file);
            const newFileList = fileListVideo.slice();
            newFileList.splice(index, 1);
            setFileListVideo(newFileList);
            setRequestData({ ...requestData, videoFile: newFileList });
            console.log(requestData)
        },
        beforeUpload: (file) => {
            setFileListVideo([...fileListVideo, file]);
            setRequestData({ ...requestData, videoFile: [...fileListText, file] });
            return false;
        },
        fileListVideo,
    };

    // Handle text file change
    const textFile = {
        onRemove: (file) => {
            const index = fileListText.indexOf(file);
            const newFileList = fileListText.slice();
            newFileList.splice(index, 1);
            setFileListText(newFileList);
            setRequestData({ ...requestData, textFile: newFileList });
            console.log(requestData)
        },
        beforeUpload: (file) => {
            setFileListText([...fileListText, file]);
            setRequestData({ ...requestData, textFile: [...fileListText, file] });
            return false;
        },
        fileListText,
    };

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
        // e.preventDefault();
        // const formData = new FormData();
        // fileListVideo.forEach((file) => {
        //     formData.append("files[]", file);
        // });
        // // setUploading(true);
        // console.log(formData);


        // // Send Request here
        console.log(requestData);

        // setRequestData({
        //     userID: "",
        //     videoFile: [],
        //     textFile: [],
        //     samplingRate: "",
        //     bodyWeightPerMeter: "",
        //     forcePlateNames: [],
        //     lengthOfPlate: "",
        //     widthOfPlate: "",
        //     heightOfPlate: "",
        // })
        setOutputVisibility(true);
    };

    return (
        <>
            {showSpinner ? <Spin /> :
                <div>
                    <Container className="form-container text-left">
                        {/* Container to pack video data into a request */}
                        <form>
                            {/* Upload video file */}
                            Upload Your Video
                            <Dragger {...videoFile}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag file to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                    Upload you video here to get a vector overlay on your video.
                                </p>
                            </Dragger>
                            <br />
                            {/* Upload .txt file generated by the force plates*/}
                            Upload Force Plate details
                            <Dragger {...textFile}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag file to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                    Upload you video here to get a vector overlay on your video.
                                </p>
                            </Dragger>
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
