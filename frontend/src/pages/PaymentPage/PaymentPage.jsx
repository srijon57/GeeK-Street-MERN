import React, { useState } from 'react';
import './PaymentPage.css';
import axios from 'axios';

const PaymentPage = () => {
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BASEURL}/send-email`, {
                to: 'crisiscreed12@gmail.com',
                subject: 'New Order Received',
                text: `Address: ${address}\nPhone: ${phone}`,
            });
            alert('Order completed. An email has been sent.');
        } catch (error) {
            console.error('Error sending email:', error);
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
                <button type='button' onClick={handleSubmit} className='payment-button'>
                    DONE
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;
