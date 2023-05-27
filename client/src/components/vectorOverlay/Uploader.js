import React, { useState } from 'react';
import axios from 'axios';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';


import './VectorOverlay.css';
import { Container, Button } from 'react-bootstrap';


const Uploader = () => {


    const { Dragger } = Upload;

    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);


    const handleUpload = (e) => {
        e.preventDefault()
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });
        setUploading(true);
        // Send Request here
    };




    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };


    return (
        <Container className='form-container'>
            <form>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Upload you video here to get a vector overlay on your video.
                    </p>
                </Dragger>

                <Button type="primary" className='upload-btn' onClick={(event) => handleUpload(event)} >
                    Upload Video
                </Button>
            </form>
        </Container>
    )
};

export default Uploader;
