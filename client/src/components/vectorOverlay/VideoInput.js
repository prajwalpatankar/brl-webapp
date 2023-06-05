import React from 'react';
import './VectorOverlay.css';

const VideoInput = () => {

    const inputVideoUrl = "assets/video_input.mp4";


    return (
        <div className='video-container'>
            <video width="640" height="360" autoPlay muted loop>
                <source src={inputVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
};

export default VideoInput;