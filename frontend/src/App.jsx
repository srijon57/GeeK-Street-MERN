import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage/Homepage";
import Navbar from "./components/Header/Navbar"; 
import Navbar1 from "./components/Header/Nav1/Navbar1"; 
import Navbar2 from "./components/Header/Nav2/Navbar2"; 
import Loginpage from "./pages/Login/Loginpage";
import About from "./pages/About/About";
import Footer from "./components/Footer/footer";
import Shop from "./pages/Shop/Shop";
import './App.css';
import ProtectedRoute from "./components/ProtectedRoutes";
import Admin from "./pages/Admin/admin";
import EditProduct from "./pages/Admin/EditProduct/EditProduct";
import DeleteProduct from "./pages/Admin/DeleteProduct/DeleteProduct";
import CreateProduct from "./pages/Admin/CreateProduct/CreateProduct";
import Cart from "./pages/Cart/Cart";
import PaymentPage from "./pages/PaymentPage/PaymentPage.jsx";
import { AuthContext } from './context/AuthContext.jsx';

function App() {
    const { user } = useContext(AuthContext);

    const renderNavbar = () => {
        if (!user.isLoggedIn) {
            return <Navbar />;
        } else if (user.role === 'admin') {
            return <Navbar1 />;
        } else {
            return <Navbar2 />;
        }
    };

    return (
        <>
            {renderNavbar()}
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/About" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/Login" element={<Loginpage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/admin/*" element={
                    <ProtectedRoute role="admin">
                        <AdminRoutes />
                    </ProtectedRoute>
                } />
            </Routes>
            <Footer />
        </>
    );
}

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/product/create" element={<CreateProduct />} />
      <Route path="/product/edit/:id" element={<EditProduct />} />
      <Route path="/product/delete/:id" element={<DeleteProduct />} />
    </Routes>
  );
};

export default App;
