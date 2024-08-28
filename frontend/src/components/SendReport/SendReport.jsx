import React, { useState, useContext } from 'react';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../../context/AuthContext';
import './SendReport.css';

export default function SendReport() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: user?.username || '', 
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.isLoggedIn) {
      enqueueSnackbar('You must be logged in to send a report.', { variant: 'error' });
      return;
    }

    const formURL = 'https://formspree.io/f/xnnabqpy';

    const { email, ...reportData } = formData;

    fetch(formURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...reportData,
        email: user.username, 
      }),
    })
      .then((response) => {
        if (response.ok) {
          enqueueSnackbar('Message sent successfully!', { variant: 'success' });
          setFormData({
            name: '',
            phone: '',
            subject: '',
            message: '',
          });
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        enqueueSnackbar('Failed to send message.', { variant: 'error' });
      });
  };

  return (
    <div className="contact">
      <h2>If you have any reports, please forward them to us.</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Subject:
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
