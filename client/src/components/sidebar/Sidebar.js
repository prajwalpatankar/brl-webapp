import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Sidebar.css'

const Sidebar = () => {

    const [activeTab, setActiveTab] = useState('vectorOverlay');

    const handleTabChange = ( tab ) => {
        setActiveTab(tab);
    }


    return (
        <div>
            <Container fluid='true'>
                <div className="sidebar">
                    <Link to="/vectorOverlay" ><button onClick={() => handleTabChange('vectorOverlay')} className={`sidebar-btn ${activeTab === 'vectorOverlay' ? 'sidebar-link-active' : ''}`}>VectorOverlay</button></Link>
                    <Link to="/subproject1" ><button onClick={() => handleTabChange('subproject1')} className={`sidebar-btn ${activeTab === 'subproject1' ? 'sidebar-link-active' : ''}`} >Project1</button></Link>
                    <Link to="/subproject2" ><button onClick={() => handleTabChange('subproject2')} className={`sidebar-btn ${activeTab === 'subproject2' ? 'sidebar-link-active' : ''}`} >Project2</button></Link>
                    <Link to="/subproject3" ><button onClick={() => handleTabChange('subproject3')} className={`sidebar-btn ${activeTab === 'subproject3' ? 'sidebar-link-active' : ''}`} >Project3</button></Link>
                </div>
            </Container>
        </div>
    );
};

export default Sidebar;