import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import './PaymentPage.css';

const PaymentPage = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    const { user } = useContext(AuthContext);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.priceInCents * item.quantity, 0);
    const cartDetails = cartItems.map(item => `${item.name} (x${item.quantity})`).join(', ');

    const handleSubmit = async () => {
        if (!name || !address || !phone) {
            enqueueSnackbar('Name, address, and phone number are required!', { variant: 'error' });
            return;
        }
    
        if (!/^\d+$/.test(phone)) {
            enqueueSnackbar('Phone number must contain only numbers!', { variant: 'error' });
            return;
        }
    
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_BASEURL}/send-email`, {
                to: 'crisiscreed12@gmail.com',
                subject: 'New Order Received',
                text: `Name: ${name}\nE-mail: ${user.username}\nAddress: ${address}\nPhone: ${phone}\nItems: ${cartDetails}\nTotal Price: BDT ${(totalPrice).toFixed(2)}`,
            });
    
            await axios.post(`${import.meta.env.VITE_BASEURL}/sales/update-sales`, {
                items: cartItems.reduce((acc, item) => acc + item.quantity, 0),
                cost: totalPrice,
                productId: cartItems[0]._id,
                productName: cartDetails,
                totalPrice: totalPrice,
                customerName: name,
                userId: user.id, 
                date: new Date(),
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
    

    const handleConfirm = () => {
        setShowConfirmation(false);
        handleSubmit();
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    return (
        <div className='payment-container'>
            <h2>Payment Details</h2>
            <br></br>
            <h4>Please ensure that your name, address, and phone number are entered correctly for the Cash on Delivery process.</h4>
            <br></br>
            <form className='payment-form'>
                <label>
                    Name:
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
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
                        pattern="\d*"
                        title="Phone number must contain only numbers."
                    />
                </label>
                <div className='cart-summary'>
                    <p><strong>Items:</strong> {cartDetails}</p>
                    <p><strong>Total Price:</strong> BDT {(totalPrice-1).toFixed(2)}</p>
                </div>
                <button
                    type='button'
                    onClick={() => setShowConfirmation(true)}
                    className='payment-button'
                    disabled={loading}
                >
                    {loading ? <Spinner /> : 'DONE'}
                </button>
            </form>

            {showConfirmation && (
                <div className='confirmation-card'>
                    <p>Are you sure?</p>
                    <div className='confirmation-buttons'>
                        <button onClick={handleConfirm} className='confirm-button'>Yes</button>
                        <button onClick={handleCancel} className='cancel-button'>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentPage;
