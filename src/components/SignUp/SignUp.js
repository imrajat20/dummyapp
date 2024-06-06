import { useState, useRef } from 'react';

import classes from './SignUpPage.module.css';
import { Navigate } from 'react-router-dom';


const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);


  const formHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    setIsLoading(true);
      
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlDCY3JTlp5pDcM5MHo29QouMsk-f9MOU',
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type' : 'application/json'
        }
      }
    ).then((res) => {
      setIsLoading(false);
      if(res.ok){
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = 'Auth failed!';
           if(data && data.error && data.error.message){
           errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        })
      }
    }).then((data) => {
      console.log(data);
      setRedirect(true);
    })
    .catch((err) => {
      alert(err.message);
    })
  };
  if (redirect) {
    return <Navigate to="/Login"></Navigate>;
  }

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form onSubmit={formHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordRef}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor='password'> Confirm Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordRef}
          />
        </div>
  

        <div className={classes.actions}>
         {!isLoading &&  <button>Create Account</button>}
         {isLoading && <p>Sending request...</p>}

        </div>
      </form>
    </section>
  );
};
export default SignUp;
