import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage/Homepage";
import Navbar from ".//components/Header/Navbar";
import Loginpage  from "./pages/Login/Loginpage";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import './App.css';

function App() {
    return (
      <>
      <Navbar/>
            <Routes>
            <Route path="" element={<Homepage/>} />
                <Route path="/Login" element={<Loginpage />} />
                <Route path="/About" element={<About />} />
                <Route path="/Profile" element={<Profile />} />
            </Routes>
      </>      
    );
}

export default App;
