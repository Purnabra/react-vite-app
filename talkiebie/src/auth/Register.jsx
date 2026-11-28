import React from 'react';

import { useNavigate } from "react-router-dom";

//import styles from './Register.module.css'; // adjust path

const Register = ({ isLogin, styles, setIsLogin, setPopup, setContent, el }) => {
    const navigate = useNavigate();
    // console.log(styles);
    const registerSubmit = (e) => {

        e.preventDefault();
        const formdata = new FormData(e.target);

        fetch(`${import.meta.env.VITE_PROD_API_URL}/api/register`, {
            method: "POST",
            body: formdata,
			credentials: "include"

        })
            .then((resp) => resp.json())
            .then((data) => {
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
                }, 1800);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div
            className={`${styles['form-box']} ${styles.active}`}
            id="register-form"
        >
            <div className={styles['logo-header']}>
                <h2>Create Account</h2>
                <p>Join us today</p>
            </div>


            <form onSubmit={registerSubmit} id="registerForm">
                <div className={styles['input-group']}>
                    <input type="text" placeholder="Full Name" name="username" id="username" />
                </div>
                <div className={styles['input-group']}>
                    <input type="email" placeholder="Email Address" name="email" id="email" />
                </div>
                <div className={styles['input-group']}>
                    <input type="password" placeholder="Password" name="password" id="password" minLength={6} />
                </div>
                <button type="submit" className={styles['btn-primary']}>
                    Sign Up
                </button>
            </form>

            <div className={styles['toggle-text']}>
                Already have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login', { replace: true }); }}>
                    Log in
                </a>
            </div>
        </div>
    );
};

export default Register;