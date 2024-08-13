import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './PaymentPage.css';

const PaymentPage = () => {
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_BASEURL}/send-email`, {
                to: 'crisiscreed12@gmail.com',
                subject: 'New Order Received',
                text: `Address: ${address}\nPhone: ${phone}`,
            });
            enqueueSnackbar('Order completed. An email has been sent.', { variant: 'success' });
            clearCart(); 
            navigate('/'); 
        } catch (error) {
            console.error('Error sending email:', error);
            enqueueSnackbar('Failed to send email. Please try again later.', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='payment-container'>
            <h2>Payment Details</h2>
            <form className='payment-form'>
                <label>
                    Address:
                    <input
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type='text'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </label>
                <button 
                    type='button' 
                    onClick={handleSubmit} 
                    className='payment-button' 
                    disabled={loading}
                >
                    {loading ? <Spinner /> : 'DONE'}
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;
