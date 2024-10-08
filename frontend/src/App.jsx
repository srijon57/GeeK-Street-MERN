import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Homepage } from "./pages/Homepage/Homepage";
import Navbar from "./components/Header/Navbar";
import Navbar1 from "./components/Header/Nav1/Navbar1";
import Navbar2 from "./components/Header/Nav2/Navbar2";
import Loginpage from "./pages/Login/Loginpage";
import VerifyEmailPage from "./pages/Login/VerifyEmail/VerifyEmail.jsx";
import ResetPasswordPage from "./pages/Login/ResetPasswordPage.jsx";
import About from "./pages/About/About";
import Footer from "./components/Footer/footer";
import Shop from "./pages/Shop/Shop";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoutes";
import Admin from "./pages/Admin/admin";
import EditProduct from "./pages/Admin/EditProduct/EditProduct";
import DeleteProduct from "./pages/Admin/DeleteProduct/DeleteProduct";
import CreateProduct from "./pages/Admin/CreateProduct/CreateProduct";
import Cart from "./pages/Cart/Cart";
import PaymentPage from "./pages/PaymentPage/PaymentPage.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import News from "./pages/News/News.jsx";
import ThemeProvider from "./components/Theme/Theme.jsx";
import SendReport from "./components/SendReport/SendReport.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard.jsx";
import OrderHistory from './components/OrderHistory/OrderHistory';

function App() {
    const { user } = useContext(AuthContext);

    const renderNavbar = () => {
        if (!user.isLoggedIn) {
            return <Navbar />;
        } else if (user.role === "admin") {
            return <Navbar1 />;
        } else {
            return <Navbar2 />;
        }
    };

    return (
        <>
            <ThemeProvider>
                {renderNavbar()}
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/report" element={<SendReport />} />
                    <Route
                        path="/Login"
                        element={
                            user.isLoggedIn ? <Navigate to="/" /> : <Loginpage />
                        }
                    />
                    <Route
                        path="/verify-email"
                        element={
                            <ProtectedRoute>
                                <VerifyEmailPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reset-password"
                        element={
                            <ProtectedRoute>
                                <ResetPasswordPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/payment"
                        element={
                            <ProtectedRoute>
                                <PaymentPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/orderhistory"
                        element={
                            <ProtectedRoute>
                                <OrderHistory />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/*"
                        element={
                            <ProtectedRoute role="admin">
                                <AdminRoutes />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <Footer />
            </ThemeProvider>
        </>
    );
}

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="product/create" element={<CreateProduct />} />
            <Route path="product/edit/:id" element={<EditProduct />} />
            <Route path="product/delete/:id" element={<DeleteProduct />} />
            <Route path="admindashboard" element={<AdminDashboard />} />
        </Routes>
    );
};

export default App;
