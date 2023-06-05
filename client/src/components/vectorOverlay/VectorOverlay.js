import React, { useState } from 'react';
import axios from 'axios';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { Container, Button } from 'react-bootstrap';

import Uploader from './Uploader';
import './VectorOverlay.css';
import VideoPlayer from './VideoPlayer';




const VectorOverlay = () => {

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
        <div className='vector-overlay'>
            <h3 className='page-title'>Vector Overlay</h3>
            <div className='project-description-container'>
                <p className='project-description-p1'>Some Description about the vector overlay project Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed in lectus ipsum. In et nunc auctor, placerat turpis sed, posuere mi. Ut quis nulla in mi accumsan tempus eget ac mi. Ut felis justo, eleifend vitm. Nunc fermentum vitae nisi id dapibus. Nam nec commodo dolor. Nulla id volutpat </p>
                <p className='project-description-p2'>ae est et, mollis consectetur augue. Proin bibendum velit lectus, dignissim consectetur magna viverra blandit. Morbi pharetra elit tempus nisi blandit luctus. Pellentesque euismod consequat velit id pellentesque. Donec tincidunt tellus et arcu malesuada vulputate. Pellentesque efficitur tellus non tortor rutrum, non eleifend tellus malesuada. Praesent magna nibh, sollicitudin in dignissim non, vehicula at est. </p>
            </div>
            <VideoPlayer />
            <Uploader />


        </div>
    );
};

export default VectorOverlay;   