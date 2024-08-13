import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Spinner from "../../components/Spinner/Spinner"; 

function ResetPasswordPage() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const sendOtpHandler = async () => {
        setLoading(true);
        setLoadingStep('sendOtp');
        try {
            await axios.post(`${import.meta.env.VITE_BASEURL}/auth/forgot-password`, { email });
            enqueueSnackbar("OTP sent to your email", { variant: 'success' });
            setStep(2);
        } catch (error) {
            enqueueSnackbar(error.response?.data?.msg || "An error occurred", { variant: 'error' });
        } finally {
            setLoading(false);
            setLoadingStep(null);
        }
    };

    const verifyOtpHandler = async () => {
        setLoading(true);
        setLoadingStep('verifyOtp');
        try {
            await axios.post(`${import.meta.env.VITE_BASEURL}/auth/verify-otp`, { email, otp });
            enqueueSnackbar("OTP verified", { variant: 'success' });
            setStep(3);
        } catch (error) {
            enqueueSnackbar(error.response?.data?.msg || "An error occurred", { variant: 'error' });
        } finally {
            setLoading(false);
            setLoadingStep(null);
        }
    };

    const resetPasswordHandler = async () => {
        setLoading(true);
        setLoadingStep('resetPassword');
        try {
            await axios.post(`${import.meta.env.VITE_BASEURL}/auth/reset-password`, { email, newPassword });
            enqueueSnackbar("Password reset successfully", { variant: 'success' });
            navigate('/login');
        } catch (error) {
            enqueueSnackbar(error.response?.data?.msg || "An error occurred", { variant: 'error' });
        } finally {
            setLoading(false);
            setLoadingStep(null);
        }
    };

    return (
        <div className="reset-password-page">
            {step === 1 && (
                <div>
                    <h2>Reset Password</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={sendOtpHandler} disabled={loading && loadingStep === 'sendOtp'}>
                        {loading && loadingStep === 'sendOtp' ? <Spinner /> : 'Send OTP'}
                    </button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h2>Enter OTP</h2>
                    <input
                        type="text"
                        placeholder="Enter the OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={verifyOtpHandler} disabled={loading && loadingStep === 'verifyOtp'}>
                        {loading && loadingStep === 'verifyOtp' ? <Spinner /> : 'Verify OTP'}
                    </button>
                </div>
            )}
            {step === 3 && (
                <div>
                    <h2>Enter New Password</h2>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={resetPasswordHandler} disabled={loading && loadingStep === 'resetPassword'}>
                        {loading && loadingStep === 'resetPassword' ? <Spinner /> : 'Reset Password'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default ResetPasswordPage;
