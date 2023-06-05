import React from 'react';
import './VectorOverlay.css';

const VideoOutput = () => {

    const outputVideoUrl = "assets/video_input.mp4";

    return (
        <div className='video-container'>
            <video width="640" height="360" autoPlay muted loop>
                <source src={outputVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )


};

export default VideoOutput;