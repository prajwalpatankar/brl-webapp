import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';

// Importing Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing Contexts
import { UserContext } from './contexts/UserContext';

// Importing components
import Sidebar from './components/sidebar/Sidebar'
import Home from './components/home/Home';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import VectorOverlay from './components/vectorOverlay/VectorOverlay';


function App() {

  const [userDetails, setUserDetails] = useState({
    token: "",
  });

  const [userToken, setUserToken] = useState("");

  return (
    <div className='App'>
      <UserContext.Provider value={{userDetails, setUserDetails, userToken, setUserToken}} >
        <BrowserRouter>
          <Sidebar />
          <div className='content'>
            <Routes>
              {/* Mention all Routes Here */}

              {/* Change path of Vector Overlay to /vectorOverlay and Home to / if a login system is developed */}
              <Route exact path="/vectorOverlay" element={<VectorOverlay />} />
              <Route exact path="/" element={<Home />} />

              <Route exact path="/login" element={<LogIn />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
