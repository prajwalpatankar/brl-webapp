import React, { useState } from 'react';
import axios from 'axios';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';


import './VectorOverlay.css';
import { Container, Button } from 'react-bootstrap';




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



    // const props = {
    //     name: 'file',
    //     multiple: true,
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     onChange(info) {
    //       const { status } = info.file;
    //       if (status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //       }
    //       if (status === 'done') {
    //         message.success(`${info.file.name} file uploaded successfully.`);
    //       } else if (status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //       }
    //     },
    //     onDrop(e) {
    //       console.log('Dropped files', e.dataTransfer.files);
    //     },
    //   };


    // const props = {
    //     name: 'file',
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     headers: {
    //       authorization: 'authorization-text',
    //     },
    //     onChange(info) {
    //       if (info.file.status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //       }
    //       if (info.file.status === 'done') {
    //         message.success(`${info.file.name} file uploaded successfully`);
    //       } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //       }
    //     },
    //   };




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
            <h3>Vector Overlay</h3>
            <p>Some Description about the vector overlay project Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed in lectus ipsum. In et nunc auctor, placerat turpis sed, posuere mi. Ut quis nulla in mi accumsan tempus eget ac mi. Ut felis justo, eleifend vitae est et, mollis consectetur augue. Proin bibendum velit lectus, dignissim consectetur magna viverra blandit. Morbi pharetra elit tempus nisi blandit luctus. Pellentesque euismod consequat velit id pellentesque. Donec tincidunt tellus et arcu malesuada vulputate. Pellentesque efficitur tellus non tortor rutrum, non eleifend tellus malesuada. Praesent magna nibh, sollicitudin in dignissim non, vehicula at est. Donec rutrum, mi vitae gravida interdum, lacus ex rhoncus massa, et interdum dolor arcu ultrices felis. Suspendisse tempus elit a nibh posuere vestibulum. Nunc fermentum vitae nisi id dapibus. Nam nec commodo dolor. Nulla id volutpat </p>
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

                    <Button type="primary" onClick={(event) => handleUpload(event)} >
                        Upload Video
                    </Button>
                </form>
            </Container>


        </div>
    );
};

export default VectorOverlay;   