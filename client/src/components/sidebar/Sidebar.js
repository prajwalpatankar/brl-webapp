import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Home, Diagram, Story } from 'iconsax-react';

import './Sidebar.css'  

const Sidebar = () => {

    const [activeTab, setActiveTab] = useState('home');

    const handleTabChange = ( tab ) => {
        setActiveTab(tab);
    }


    return (
        <div>
            <Container fluid='true'>
                <div className="sidebar">
                    <Link className='sidebar-link' to="/" ><Home /><button onClick={() => handleTabChange('home')} className={`sidebar-btn ${activeTab === 'home' ? 'sidebar-link-active' : ''}`} >Home</button></Link>
                    <Link className='sidebar-link' to="/vectorOverlay" ><Diagram /><button onClick={() => handleTabChange('vectorOverlay')} className={`sidebar-btn ${activeTab === 'vectorOverlay' ? 'sidebar-link-active' : ''}`}>VectorOverlay</button></Link>
                    <Link className='sidebar-link' to="/subproject1" ><Story /><button onClick={() => handleTabChange('subproject1')} className={`sidebar-btn ${activeTab === 'subproject1' ? 'sidebar-link-active' : ''}`} >Project1</button></Link>
                    <Link className='sidebar-link' to="/subproject2" ><Story /><button onClick={() => handleTabChange('subproject2')} className={`sidebar-btn ${activeTab === 'subproject2' ? 'sidebar-link-active' : ''}`} >Project2</button></Link>
                    <Link className='sidebar-link' to="/subproject3" ><Story /><button onClick={() => handleTabChange('subproject3')} className={`sidebar-btn ${activeTab === 'subproject3' ? 'sidebar-link-active' : ''}`} >Project3</button></Link>
                </div>
            </Container>
        </div>
    );
};

export default Sidebar;