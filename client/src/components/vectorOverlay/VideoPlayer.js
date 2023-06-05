import React, { useState } from 'react';
import './VectorOverlay.css';
import VideoInput from './VideoInput';
import VideoOutput from './VideoOutput';

const VideoPlayer = () => {


    return (
        <div>
            <div className='video-input-container'>
                <VideoInput />
            </div>
            <div className='video-output-container'>
                <VideoOutput />
            </div>
        </div>
    )


};

export default VideoPlayer;