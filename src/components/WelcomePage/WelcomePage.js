import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from './WelcomePage.module.css';

const WelcomePage = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  
  const buttonHandler = () => {
    if (!token) {
      setError('No user is currently logged in.');
      return;
    }

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBlDCY3JTlp5pDcM5MHo29QouMsk-f9MOU', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: token
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = 'Verification failed!';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    }).then(() => {
      setMessage('Verification email sent! Please check your inbox.');
    }).catch((err) => {
      setError(err.message);
    });
  };

  return (
    <div className={classes.container}>
      <p>Welcome to ExpenseTracker... !</p>
      <button onClick={buttonHandler}>Verify Email</button>
      {message && <p >{message}</p>}
      {error && <p >{error}</p>}
      <p>Your profile is incomplete. <Link to='/Profile'>Complete Now</Link></p>
    </div>
  );
};

export default WelcomePage;
