import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage/Homepage";
import Navbar from ".//components/Header/Navbar";
import Loginpage  from "./pages/Login/Loginpage";
import About from "./pages/About/About";
import Footer from "./components/Footer/footer";
//import Profile from "./pages/Profile/Profile";
import Shop from ".//pages/Shop/Shop"
import './App.css';
import ProtectedRoute from "./components/ProtectedRoutes";
import Admin from "./pages/Admin/admin";
import EditProduct from "./pages/Admin/EditProduct/EditProduct";
import DeleteProduct from "./pages/Admin/DeleteProduct/DeleteProduct";
import CreateProduct from "./pages/Admin/CreateProduct/CreateProduct";
import Cart from "./pages/Cart/Cart";

function App() {
    return (
      <>   
      <Navbar/>
            <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/About" element={<About />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                  <AdminRoutes/>
              </ProtectedRoute>

              } />
              
            
                {/* <Route path="/Login" element={<Loginpage />} />
                <Route path="/Shop" element={<Shop />} /> */}
            </Routes>
            <Footer/>

      </>      
    );
}
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin/>} />
      <Route path="/product/create" element={<CreateProduct/>} />
      <Route path="/product/edit/:id" element={<EditProduct/>} />
      <Route path="/product/delete/:id" element={<DeleteProduct/>} />
    </Routes>
  );
};

export default App;
