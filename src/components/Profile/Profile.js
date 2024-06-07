import React, { useState } from "react";
import classes from './Profile.module.css';

const Profile = () => {

    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const token = localStorage.getItem('token');

    const submitHandler =(event) => {
        event.preventDefault();
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBlDCY3JTlp5pDcM5MHo29QouMsk-f9MOU',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: token,
                displayName: name,
                photoUrl: link,
                returnSecureToken: true
            })
        }).then((res) => {
            if(res.ok){
               return res.json();
            }else {
                throw Error(' Auth failed')
            }
        }).then((data) => {
           console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })


    };

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <h2 className={classes.h2}>Contact Details</h2>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" onChange={(e) => setName(e.target.value)} required />

            <label htmlFor="link">Photo URL Link</label>
            <input type="text" id="link" onChange={(e) => setLink(e.target.value)}/>

            <button type="submit">Update</button>
        </form>
    );
};

export default Profile;