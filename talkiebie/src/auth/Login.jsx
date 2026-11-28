import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Login = ({ isLogin, styles, setIsLogin, setPopup, setContent, el }) => {


    const navigate = useNavigate();

    const loginSubmit = (e) => {

        e.preventDefault();
        const formdata = new FormData(e.target);






        fetch(`${import.meta.env.VITE_PROD_API_URL}/api/login`, {
            method: "POST",
            body: formdata,
            credentials: "include"
        })
            .then((resp) => resp.json())
            .then((data) => {

                if (data.status) { localStorage.setItem("loggedUser", JSON.stringify(data.data)); }
                // Trigger popup + progress bar animation
                setPopup(true);

                document.getElementById('messageContent').style.color = (data.status) ? "green" : "red";
                setContent(data.message);

                if (el.current) {

                    //  console.log(el.current)
                    el.current.classList.add(styles['progressBarAnimation']);
                }

                setTimeout(() => {
                    setPopup(false);
                    setContent("");
                    if (el.current) {
                        el.current.classList.remove(styles['progressBarAnimation']);
                    }
                    if (data.status) navigate('/', { replace: true });

                }, 1800);
            })
            .catch((err) => console.log(err));




    };




    return (
        <>
            {(<div className={`${styles['form-box']} ${styles.active}`} id="login-form">
                <div className={styles['logo-header']}>
                    <h2>Welcome Back</h2>
                    <p>Login to your account</p>
                </div>
                <form onSubmit={loginSubmit} id="loginForm">
                    <div className={styles['input-group']}>
                        <input type="text" placeholder="Username or Email" name="email" id="email" />
                    </div>
                    <div className={styles['input-group']}>
                        <input type="password" placeholder="Password" name="password" id="password" />
                    </div>
                    <button type="submit" className={styles['btn-primary']}>Log In</button>
                </form>
                <div className={styles['toggle-text']}>
                    Don't have an account?{' '}
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register', { replace: true }); }}>Sign up</a>
                </div>
            </div>)}

        </>

    )
}

export default Login