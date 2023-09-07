import React, { useState, useRef } from "react";
// import { InboxOutlined } from "@ant-design/icons";
import { Input, Button, Modal, Select, Tour } from "antd";
import { useNavigate } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const Tutorial = () => {

    // --------------------------------------------------------------------
    // Refs
    const formRef = useRef(null);
    const inputFileRef1 = useRef(null);
    const modal1Ref = useRef(null);
    const clearCropRef = useRef(null);
    const cropButtonRef = useRef(null);
    const modal2Ref = useRef(null);
    const clearPointRef = useRef(null);
    const submitPointRef= useRef(null);
    const inputFileRef2 = useRef(null);
    const firsRowRef = useRef(null);
    const flipRef = useRef(null);
    const addButtonRef = useRef(null);
    const removeButtonRef = useRef(null);
    const modeRef = useRef(null);
    const submitButtonRef = useRef(null);
    const videoRef = useRef(null);
    const downloadButtonRef = useRef(null);


    // --------------------------------------------------------------------
    // Constants

    const navigate = useNavigate();

    // --------------------------------------------------------------------
    // States

    const [forcePlateList, setForcePlateList] = useState([""]);

    // State to display Output
    const [outputVisibility, setOutputVisibility] = useState(false);

    // State to handle Modal visibility for crop modal
    const [isModalOpenCrop, setIsModalOpenCrop] = useState(false);

    // State to handle Modal visibility for plate end points
    const [isModalOpenEndPoint, setIsModalOpenEndPoint] = useState(false);


    //state to display tour
    const [isTourOpen, setisTourOpen] = useState(true);

    // steps for tour
    const tourSteps = [
        {
            title: 'Upload Video',
            description: 'Upload your recorded video here',
            cover: (
                <img
                    alt="tour.png"
                    src="assets/video_bg.jpg"
                />
            ),
            target: () => inputFileRef1.current,
        },
        {
            title: 'Upload Video',
            description: 'A popup will appear to crop your force plate',
            target: () => formRef.current,
        },
        {
            title: 'Select Area to Crop',
            description: 'Using your mouse, drag the area you want to crop',
            target: () => modal1Ref.current,
        },
        {
            title: 'Clear Selection',
            description: 'If you are not satisfied with your crop, press this button to clear you crop area.',
            target: () => clearCropRef.current,
        },
        {
            title: 'Crop!',
            description: 'Once the desired area is selected, press this button to crop',
            target: () => cropButtonRef.current,
        },
        {
            title: 'Selecting end-points',
            description: 'A new popup will appear',
            target: () => formRef.current,
        },
        {
            title: 'Selecting end-points',
            description: 'Single click using your mouse to select end-points',
            target: () => modal2Ref.current,
        },
        {
            title: 'Selecting end-points',
            description: 'If you are not satisfied with your crop, press this button to clear you crop area.',
            target: () => clearPointRef.current,
        },
        {
            title: 'Selecting end-points',
            description: 'Click this button to save your endpoints',
            target: () => submitPointRef.current,
        },
        {
            title: 'Upload Force File',
            description: 'Upload your pre-processed Force file',
            cover: (
                <img
                    alt="tour.png"
                    src="assets/force_file.jpg"
                />
            ),
            target: () => inputFileRef2.current,
        },
        {
            title: 'Input Details',
            description: 'Add Details About your vector overlay',
            target: () => firsRowRef.current,
        },
        {
            title: 'Select Flips',
            description: 'Select any number of flips you want for your vector overlay',
            target: () => flipRef.current,
        },
        {
            title: 'Add more force plate details',
            description: 'Click this button to add names of more force plates',
            target: () => addButtonRef.current,
        },
        {
            title: 'Remove unwanted force plate details',
            description: 'Click this button to remove a force plates',
            target: () => removeButtonRef.current,
        },
        {
            title: 'Select Mode',
            description: 'Select if you want a combined or an individual vector overlay',
            target: () => modeRef.current,
        },
        {
            title: 'Submit!',
            description: 'Finally, click this button to submit your request. If all details are correct, you will be able to download your vector overlay',
            target: () => submitButtonRef.current,
        },{
            title: 'Processing Vector Overlay',
            description: 'Allow upto 1 minute to process your inputs',
            target: () => formRef.current,
        },
    ]

    // --------------------------------------------------------------------
    // Initializers


    // --------------------------------------------------------------------
    // Methods

    const stateChecker = (current) => {
        if (current === 1) {
            setIsModalOpenCrop(true);
        } else if(current === 5) {
            setIsModalOpenCrop(false);
            setIsModalOpenEndPoint(true);
        } else if(current === 9) {
            setIsModalOpenEndPoint(false);
        } else if(current === 13) {
            setForcePlateList(["", ""]);
        } else if(current === 14) {
            setForcePlateList([""]);
        } else if(current === 15) {
            window.scrollTo(0, document.body.scrollHeight);
            setOutputVisibility(true);
        }
    }

    const closeTour = () => {
        setisTourOpen(false);
        navigate('/vectorOverlay');
    }


    return (
        <>
            <Navbar />
            <Sidebar />
            <div className='ml-[12rem] lg:ml-[12%] pt-[5rem] bg-[#eeeeee] h-screen' >
                <h3 className='ml-[1rem] text-[3rem]'>Vector Overlay</h3>
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
                                        <button class="absolute bg-white border-2 border-purple-500 text-pruple-500 w-[7.2rem] py-[0.3rem] rounded hover:cursor-pointer z-10">
                                            Choose File
                                        </button>
                                        <input
                                            type="file"
                                            id="video_input"
                                            className="z-5 placeholder-pl-10 pl-[1rem] pt-[0.2rem]"
                                            name="videoFile"
                                            ref={inputFileRef1}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <br />

                            <video ref={videoRef} controls autoPlay style={{ display: "none" }}></video>
                            <Modal
                                title="Please Crop the Area of the Force Plate"
                                open={isModalOpenCrop}
                                closeIcon={false}
                                width={690}
                                footer={[

                                    <Button key="crop" ref={clearCropRef}>Clear Selection</Button>,
                                    <Button key="back" ref={cropButtonRef} >
                                        Crop
                                    </Button>,
                                ]}>
                                <img ref={modal1Ref} src="./assets/Tutorial_img.png" alt="input_img"></img>
                            </Modal>
                            <Modal
                                title="Please Select the End Points of Force Plate by clicking on the canvas"
                                open={isModalOpenEndPoint}
                                closeIcon={false}
                                width={470}
                                footer={[

                                    <Button key="crop" ref={clearPointRef}>Clear</Button>,
                                    <Button key="back" ref={submitPointRef}>
                                        Done
                                    </Button>,
                                ]}>
                                <img ref={modal2Ref} src="./assets/cropped_img.png" alt="input_img"></img>
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
                                        <button class="absolute bg-white border-2 border-purple-500 text-pruple-500 w-[7.2rem] py-[0.3rem] rounded hover:cursor-pointer z-10">
                                            Choose File
                                        </button>
                                        <input
                                            type="file"
                                            id="force_input"
                                            className="z-5 placeholder-pl-10 pl-[1rem] pt-[0.2rem]"
                                            placeholder="Upload details of force plate"
                                            name="textFile"
                                            ref={inputFileRef2}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <br />
                            <br />
                            {/* Other required data */}
                            <Row ref={firsRowRef}>
                                <Col md={3}>
                                    Sampling Rate
                                    <Input
                                        type="number"
                                        placeholder="Sampling Rate in Hz"
                                        name="samplingRate"
                                        min={1}
                                        step={1}
                                    />
                                </Col>

                                <Col md={3}>
                                    Body Weight
                                    <Input
                                        type="number"
                                        placeholder="N"
                                        name="bodyWeight"
                                        min={1}
                                        step={1}
                                    />
                                </Col>
                                <Col md={3}>
                                    Body Weight per meter (kg/m)
                                    <Input
                                        type="number"
                                        placeholder="N/m"
                                        name="bodyWeightPerMeter"
                                        min={1}
                                        step={1}
                                    />
                                </Col>
                                <Col md={3}>
                                    Contact Frame
                                    <Input
                                        type="number"
                                        placeholder="Contact Frame"
                                        name="contactFrame"
                                        min={1}
                                        step={1}
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
                                            value={forcePlate}
                                        />
                                    </Col>
                                    <Col xs={5} ref={flipRef}>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder={`Flip for Force Plate ${index + 1}`}
                                        />
                                    </Col>
                                    {index === 0 ? (
                                        <Col xs={1}>
                                            <button
                                                type="button"
                                                className="w-[2rem] h-[2rem] border-2 border-gray-400 text-gray-400 rounded-lg"
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
                                                ref={removeButtonRef}
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
                                <Col md={3}>
                                    Length of Plate
                                    <Input
                                        placeholder="Length of Plate"
                                        type="number"
                                        name="lengthOfPlate"
                                        min={0}
                                        step={0.1}
                                    />
                                </Col>
                                <Col md={3}>
                                    Width of Plate
                                    <Input
                                        placeholder="Width of Plate"
                                        type="number"
                                        name="widthOfPlate"
                                        min={0}
                                        step={0.1}
                                    />
                                </Col>
                                <Col md={6} ref={modeRef}>
                                    Mode
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder={"Select Vector Overlay Mode"}
                                    />
                                </Col>
                            </Row>
                            <br />
                            <button
                                type=""
                                className="bg-purple-400 rounded-lg w-[10rem] h-[2rem] text-white border-none"
                                ref={submitButtonRef}
                            >
                                Get Vector Overlay
                            </button>
                        </form>
                        <div className="flex justify-end">
                            <button type="primary" className="border-none mx-1 bg-transparent text-purple-400" onClick={() => setisTourOpen(true)}>Need help?</button>
                            <button type="primary" className="border-none mx-1 bg-transparent text-purple-400">How it works</button>
                        </div>

                    </div>
                    {outputVisibility ?
                        <div id="output_section" className="bg-white w-[95%] shadow-md mx-auto rounded-[2rem] my-[5rem] py-[3rem] px-[3rem]">
                            <h2 className="">Results</h2>
                                <div>
                                    <button className="text-white bg-purple-500 rounded-lg px-2 py-2 mr-2" ref={downloadButtonRef}>Download Vector Overlay</button>
                                    <button className="text-white bg-purple-500 rounded-lg px-2 py-2">Show Input Video Overlay</button>
                                </div>
                        </div>
                        :
                        <></>
                    }
                    <br /><br /><br />
                </div>
                <Tour open={isTourOpen} onClose={closeTour} steps={tourSteps} nextButtonProps={{ type: "link" }} previousButtonProps={{ type: "primary" }} onChange={stateChecker} />
            </div>
        </>
    );
};

export default Tutorial;
