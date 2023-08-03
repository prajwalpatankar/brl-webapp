import React from 'react';
import Uploader from './Uploader';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';




const VectorOverlay = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className='ml-[12rem] lg:ml-[12%] pt-[5rem] bg-[#eeeeee] h-screen'>
                <h3 className='ml-[1rem] text-[3rem]' >Vector Overlay</h3>
                {/* {descriptionVisible ?
                        <div>
                            <div className='project-description-container'>
                                <p className='project-description-p1'>Some Description about the vector overlay project Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed in lectus ipsum. In et nunc auctor, placerat turpis sed, posuere mi. Ut quis nulla in mi accumsan tempus eget ac mi. Ut felis justo, eleifend vitm. Nunc fermentum vitae nisi id dapibus. Nam nec commodo dolor. Nulla id volutpat </p>
                                <p className='project-description-p2'>ae est et, mollis consectetur augue. Proin bibendum velit lectus, dignissim consectetur magna viverra blandit. Morbi pharetra elit tempus nisi blandit luctus. Pellentesque euismod consequat velit id pellentesque. Donec tincidunt tellus et arcu malesuada vulputate. Pellentesque efficitur tellus non tortor rutrum, non eleifend tellus malesuada. Praesent magna nibh, sollicitudin in dignissim non, vehicula at est. </p>
                            </div>
                            <VideoPlayer />
                            <Button onClick={handleTryButtonClick}>Try Vector Overlay</Button>
                            <br /><br /><br /><br />
                        </div>
                        :
                        <div>
                            <Uploader />
                            <br /><br /><br />
                            <Button onClick={handleTryButtonClick}>Go Back</Button>
                            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        </div>
                    } */}
                <Uploader />
            </div>
        </>
    );
};

export default VectorOverlay;   