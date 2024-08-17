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
    const { cartItems, clearCart } = useCart();

    const totalPrice = cartItems.reduce((acc, item) => acc + item.priceInCents * item.quantity, 0);
    const cartDetails = cartItems.map(item => `${item.name} (x${item.quantity})`).join(', ');

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_BASEURL}/send-email`, {
                to: 'zawadalmahi@gmail.com',
                subject: 'New Order Received',
                text: `Address: ${address}\nPhone: ${phone}\nItems: ${cartDetails}\nTotal Price: BDT ${(totalPrice / 100).toFixed(2)}`,
            });
            enqueueSnackbar('Order completed. A confirmation email will be sent shortly.', { variant: 'success' });
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
                <div className='cart-summary'>
                    <p><strong>Items:</strong> {cartDetails}</p>
                    <p><strong>Total Price:</strong> BDT {(totalPrice / 100).toFixed(2)}</p>
                </div>
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
