import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing components
import Sidebar from './components/sidebar/Sidebar'
import Home from './components/home/Home';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import VectorOverlay from './components/vectorOverlay/VectorOverlay';


function App() {
  return (
    <div className='App'>
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
    </div>
  );
}

export default App;
