/*import React, { useRef, useState } from 'react'

const TwoFactorAuthentication = () => {
    const slideRef = useRef("0px");
    const dataOpt = useRef(false);
    const [lefts, setLefts] = useState("0px");
    const [widths, setWidths] = useState("0%");
    const [bg, setBg] = useState('rgb(56, 51, 51)');
    const [border, setBorder] = useState('rgb(134, 129, 129)');
    //const =


    const handleClick = (e) => {
        e.preventDefault();
        if (dataOpt.current) {
            setLefts("0px");
            setWidths("0%");
            setBg('rgb(56, 51, 51)');
            setBorder('rgb(134, 129, 129)');
            dataOpt.current = false;
        } else {
            setLefts("21px");
            setWidths("100%");
            setBg('rgb(15, 17, 97)');
            setBorder('rgb(15, 17, 97)');
            dataOpt.current = true;
        }
        //  console.log(slideRef.current);
    }
    //rgb(15, 17, 97) rgb(134, 129, 129)
    return (
        <div style={{ display: "flex", flexDirection: "row", padding: "15px", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: "600", fontSize: "19px", color: "#c7d4ef" }}>Authenticator App</div>
            <div style={{ position: "relative", borderRadius: "15px", width: "40px", height: "20px", background: "rgb(73, 66, 66)" }} onClick={handleClick}>

                <div style={{ position: "absolute", top: 0, left: lefts, borderRadius: "8px", height: "20px", width: "20px", borderRadius: "100%", clipPath: "circle()", background: bg, border: `2px solid ${border}`, zIndex: "1", transition: "all 0.5s ease" }} ></div>

                <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: widths, borderRadius: "15px", background: "rgba(11, 137, 175, 1)", zIndex: "0" }} ></div>

            </div>
        </div>
    )
}

export default TwoFactorAuthentication
*/


import React, { useState, useEffect, useRef, useContext } from 'react';
import '../assets/css/TwoFactorAuthentication.css';

import { FaShieldAlt, FaCheck } from "react-icons/fa";
import AppContext from '../context/AppContext';

const TwoFactorAuthentication = () => {

    const { setAlertPopup, setAlertMessage, setAlertColor } = useContext(AppContext);
    const [enabled, setEnabled] = useState(false);
    const [code, setCode] = useState('');
    const [verified, setVerified] = useState(false);
    const [qrcode, setQrcode] = useState(null);
    const [time, setTime] = useState(30);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const timehtml = useRef(null);
    const handleClick = () => {
        setEnabled(prev => !prev);
        setCode('');


        if (!enabled) {
            console.log('enable');

            fetch(`https://carried-overturn-joystick.ngrok-free.dev/api/user/generate2fa`, {
                method: "GET",
                credentials: "include"
            })
                .then((resp) => resp.json())
                .then((data) => {

                    if (data.verified) {
                        setVerified(true);
                        setEnabled(false);
                    }
                    if (data.status) setQrcode(data.data);
                    // console.log(data.data);
                })

        }
    };

    const handleVerify = (e) => {
        e.preventDefault();
        //#154915
        // console.log(code);
        fetch(`https://carried-overturn-joystick.ngrok-free.dev/api/user/verify2fa`, {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: code })
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.status) {
                    setAlertColor('rgb(94, 223, 94)');
                    setVerified(true);
                    setEnabled(false);
                    setDisabled(true);
                } else {
                    setAlertPopup(true);
                    setAlertMessage(data.message);
                    setAlertColor('#ee1717');
                    setVerified(false);
                    setEnabled(true);
                    setDisabled(false);
                }
                setTimeout(() => {
                    setAlertPopup(false);
                    setAlertMessage('');
                }, 2000);

            })
    };



    useEffect(() => {
        /* setAlertPopup(true);
         setAlertMessage('hello world');*/
        fetch(`https://carried-overturn-joystick.ngrok-free.dev/api/user/checkverify`, {
            method: "GET",
            credentials: "include"
        })
            .then((resp) => resp.json())
            .then((data) => {

                if (data.verified) {
                    setVerified(true);
                    setEnabled(false);
                    setDisabled(true);
                }
                setLoading(true);
            })
    }, [])

    useEffect(() => {


        setTimeout(() => {
            setTime(prev => prev > 0 ? prev - 1 : 0)
        }, 1000);



    }, [time])




    return (
        <div className="two-factor-card">
            <div className="two-factor-heading">
                <div className="two-factor-icon">
                    <span>🛡️

                    </span>
                </div>

                <div className="two-factor-title">
                    <h3>Two-factor authentication</h3>
                    <p>
                        Add an extra layer of security to your account.
                    </p>
                </div>
            </div>




            <div className="two-factor-divider"></div>
            {loading &&

                (<div>
                    <div className="two-factor-option">
                        <div className="authenticator-icon">
                            {(verified) ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height={30} width={30}>

                                <path

                                    d="M320.1 64C324.7 64 329.3 65 333.4 66.9L521.8 146.8C543.8 156.1 560.2 177.8 560.1 204C559.6 303.2 518.8 484.7 346.4 567.2C329.7 575.2 310.3 575.2 293.7 567.2C121.3 484.7 80.6 303.3 80.1 204C80 177.8 96.4 156.1 118.4 146.8L306.7 66.9C310.8 65 315.4 64 320.1 64z"
                                />

                                <path
                                    fill="#10af2dff"
                                    d="M411 228.6C400.3 220.8 385.3 223.2 377.5 233.9L291.9 351.6L265.4 324.2C256.2 314.7 241 314.4 231.5 323.6C222 332.8 221.7 348 230.9 357.5L277.3 405.5C282.2 410.6 289.1 413.3 296.2 412.8C303.3 412.3 309.8 408.7 314 403L416.3 262.1C424.1 251.4 421.7 236.4 411 228.6z"
                                />
                            </svg>) : (`📱`)}

                        </div>

                        <div className="authenticator-info">
                            <h4>Authenticator App</h4>
                            <p>
                                {(verified) ? <span style={{ color: "rgb(50, 228, 50)" }}>Two-factor authentication enabled successfully</span> : <span>Generate verification codes using your authenticator app.</span>}
                            </p>
                        </div>

                        <button
                            type="button"
                            className={`toggle-switch ${(enabled || disabled) ? 'active' : ''}`}
                            onClick={handleClick}
                            role="switch"
                            aria-checked={enabled}
                            aria-label="Set up authenticator app"
                            disabled={disabled}
                        >
                            <span className="toggle-knob"></span>
                        </button>
                    </div>
                    {!disabled && (<div className="two-factor-status">
                        <span
                            className={`status-dot ${enabled ? 'enabled' : ''}`}
                        ></span>

                        {enabled ? 'Setup in progress' : 'Disabled'}
                    </div>)}

                    {enabled && (
                        <div className="two-factor-setup">
                            <div className="setup-heading">
                                <h4>Set up your authenticator</h4>
                                <p>
                                    Follow the steps below to set up
                                    two-factor authentication.
                                </p>
                            </div>

                            <div className="setup-step">
                                <span className="step-number">1</span>

                                <div>
                                    <h5>Install an authenticator app</h5>
                                    <p>
                                        Install Google Authenticator,
                                        Microsoft Authenticator, or another
                                        compatible authenticator app on your phone.
                                    </p>
                                </div>
                            </div>

                            <div className="setup-step">
                                <span className="step-number">2</span>

                                <div>
                                    <h5>Scan the QR code</h5>
                                    <p>
                                        Open your authenticator app, select
                                        the option to add an account, and scan
                                        the QR code below.
                                    </p>
                                </div>
                            </div>

                            <div align={'center'} style={{ padding: "10px" }}>
                                <img src={qrcode} />

                            </div>

                            <p className="qr-placeholder-note">
                                <i>scan the QR code using your authenticator app</i>
                            </p>

                            <div className="setup-step">
                                <span className="step-number">3</span>

                                <div>
                                    <h5>Verify your account</h5>
                                    <p>
                                        Enter the six-digit verification code
                                        displayed in your authenticator app.
                                    </p>
                                </div>
                            </div>
                            <div>

                                <form onSubmit={handleVerify}>
                                    <label
                                        className="verification-label"
                                        htmlFor="two-factor-code"
                                    >
                                        Verification code
                                    </label>

                                    <input
                                        id="two-factor-code"
                                        className="verification-input"
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        placeholder="000000"
                                        maxLength={6}
                                        value={code}
                                        onChange={(e) =>
                                            setCode(
                                                e.target.value
                                                    .replace(/\D/g, '')
                                                    .slice(0, 6)
                                            )
                                        }
                                        required
                                    />

                                    { /*<div align={'right'} style={{ padding: "10px 0px 10px 0px", color: "#16669cff" }} >{

                                (parseInt(time / 10) > 0) ? `00:${time}` : `00:0${time}`



                            }</div>*/}

                                    <button
                                        className="verify-button"
                                        type="submit"
                                        disabled={code.length !== 6}
                                    >
                                        Verify and enable
                                    </button>
                                </form>

                            </div>


                            <p className="setup-note">
                                Your account's two-factor authentication will
                                not be activated until the verification process
                                is connected to your backend.
                            </p>
                        </div>
                    )}

                </div>)
            }



        </div>

    );
};

export default TwoFactorAuthentication;