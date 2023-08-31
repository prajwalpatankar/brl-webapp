import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Home, Diagram, Story } from 'iconsax-react';
import { SidebarContext } from '../../contexts/SideBarContext';


const Sidebar = () => {

    const {activeTab, setActiveTab} = useContext(SidebarContext);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    return (
        <div className='m-0 p-0 w-[12%] min-w-[12rem] bg-[#131313] fixed h-screen overflow-auto z-5'>
            <div className="mt-[6rem] ml-[1rem]">
                <Link className={`flex items-center no-underline ${activeTab === 'home' ? 'text-purple-500' : ' text-[#f8f8f8]'}`} to="/" ><Home /><button onClick={() => handleTabChange('home')} className={`text-[1.2rem] mx-[1rem] my-[1rem] border-none bg-transparent ${activeTab === 'home' ? 'text-purple-500' : ' text-[#f8f8f8]'}`}  >Home</button></Link>
                <Link className={`flex items-center no-underline ${activeTab === 'vectorOverlay' ? 'text-purple-500' : ' text-[#f8f8f8]'}`} to="/vectorOverlay" ><Diagram /><button onClick={() => handleTabChange('vectorOverlay')} className={`text-[1.2rem] mx-[1rem] my-[1rem] border-none bg-transparent ${activeTab === 'vectorOverlay' ? 'text-purple-500' : ' text-[#f8f8f8]'}`} >VectorOverlay</button></Link>
                <Link className={`flex items-center no-underline ${activeTab === 'subproject1' ? 'text-purple-500' : ' text-[#f8f8f8]'}`} to="/subproject1" ><Story /><button onClick={() => handleTabChange('subproject1')} className={`text-[1.2rem] mx-[1rem] my-[1rem] border-none bg-transparent ${activeTab === 'subproject1' ? 'text-purple-500' : ' text-[#f8f8f8]'}`} >Project1</button></Link>
                <Link className={`flex items-center no-underline ${activeTab === 'subproject2' ? 'text-purple-500' : ' text-[#f8f8f8]'}`} to="/subproject2" ><Story /><button onClick={() => handleTabChange('subproject2')} className={`text-[1.2rem] mx-[1rem] my-[1rem] border-none bg-transparent ${activeTab === 'subproject2' ? 'text-purple-500' : ' text-[#f8f8f8]'}`} >Project2</button></Link>
                <Link className={`flex items-center no-underline ${activeTab === 'subproject3' ? 'text-purple-500' : ' text-[#f8f8f8]'}`} to="/subproject3" ><Story /><button onClick={() => handleTabChange('subproject3')} className={`text-[1.2rem] mx-[1rem] my-[1rem] border-none bg-transparent ${activeTab === 'subproject3' ? 'text-purple-500' : ' text-[#f8f8f8]'}`} >Project3</button></Link>
            </div>
        </div>
    );
};

export default Sidebar;