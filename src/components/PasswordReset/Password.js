import React, { useState } from "react";
import classes from './Password.module.css';
import { Navigate } from "react-router-dom";

const Password = () => {

    const [mail, setMail] = useState('');
    const [message, setMessage] = useState('')
    const [mailSent, setMailSent] = useState(false);

    const formHandler = (event) => {
        event.preventDefault();

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBlDCY3JTlp5pDcM5MHo29QouMsk-f9MOU',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: mail
            })
        }).then((res)=>{
            if(res.ok){
                return res.json();
            }else{
                return res.json().then((data)=>{
                    throw new Error(data.error.message);
                })
            }
        }).then((data)=>{
            console.log(data);
            setMessage('Please check your registered email!');
            setMailSent(true);
        }).catch((err)=>{
            console.log(err);
        })
    };
    if(mailSent){
        return <Navigate to='/Login'/>
    }

    return (
        <form onSubmit={formHandler} className={classes.form}>
            <label className={classes.label} htmlFor="mail">Registered Email</label>
            <input className={classes.input} id="mail" type="email" onChange={(e) => setMail(e.target.value)} required/>

            <button className={classes.button}>Send Link</button>

            {message && <p>{message}</p>}
        </form>
    );
};

export default Password;