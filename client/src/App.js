import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';

// Importing Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing Contexts
import { UserContext } from './contexts/UserContext';
import { SidebarContext } from './contexts/SideBarContext';

// Importing components
// import Sidebar from './components/sidebar/Sidebar'
import Home from './components/home/Home';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import VectorOverlay from './components/vectorOverlay/VectorOverlay';
import ForgotPassword from './components/auth/ForgotPassword';


function App() {

  const [userDetails, setUserDetails] = useState({
    email: "",
    first_name: "",
    id: "",
    last_name: ""
  });

  const [userToken, setUserToken] = useState("");

  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className='App'>
      <UserContext.Provider value={{ userDetails, setUserDetails, userToken, setUserToken }} >
        <SidebarContext.Provider value={{ activeTab, setActiveTab }} >
          <BrowserRouter>
            <div className=''>
              <Routes>
                {/* Mention all Routes Here */}

                {/* Change path of Vector Overlay to /vectorOverlay and Home to / if a login system is developed */}
                <Route exact path="/vectorOverlay" element={<VectorOverlay />} />
                <Route exact path="/" element={<Home />} />

                <Route exact path="/login" element={<LogIn />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/forgotPassword" element={<ForgotPassword />} />
              </Routes>
            </div>
          </BrowserRouter>
        </SidebarContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
