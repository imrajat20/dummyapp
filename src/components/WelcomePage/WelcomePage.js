import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import classes from './WelcomePage.module.css';

const WelcomePage = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoggedOut, setIsLoggedOut] = useState(false); // New state for handling logout

  const token = localStorage.getItem('token');

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setIsLoggedOut(true); // Set logout state to true
  };
  
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
 
  if(isLoggedOut){
    return <Navigate to="/Login"/>
  };
  
  return (
    <div className={classes.container}>
      <button className={classes.newbutton} onClick={logoutHandler}>Logout</button>
      <p>Welcome to ExpenseTracker... !</p>
      <button onClick={buttonHandler}>Verify Email</button>
      {message && <p >{message}</p>}
      {error && <p >{error}</p>}
      <h2><Link to='/ExpenseForm'> Daily Expenses</Link></h2>
      <p>Your profile is incomplete. <Link to='/Profile'>Complete Now</Link></p>
    </div>
  );
};

export default WelcomePage;
