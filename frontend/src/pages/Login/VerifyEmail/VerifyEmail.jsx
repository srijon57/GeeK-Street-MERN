import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import "./VerifyEmail.css";
function VerifyEmailPage() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_BASEURL}/auth/verify-email`, {
                    params: { token }
                });
                enqueueSnackbar("Email verified successfully", { variant: "success" });
                navigate("/login");
            } catch (error) {
                enqueueSnackbar("Verification failed. The link may be expired or invalid.", { variant: "error" });
            }
        };

        if (token) {
            verifyEmail();
        }
    }, [token, enqueueSnackbar, navigate]);

    return (
        <div className="verify-email-page">
            <h1>Verifying your email...</h1>
        </div>
    );
}

export default VerifyEmailPage;