
import React, { useState, useEffect, useContext } from 'react';
import '../assets/css/EmailVerification.css';
import AppContext from '../context/AppContext';
const EmailVerification = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [checkVerify, setCheckVerify] = useState(false);
    const [email, setEmail] = useState(null);
    const { setAlertPopup, setAlertMessage, setAlertColor } = useContext(AppContext);
    const handleVerify = (e) => {
        e.preventDefault();

        if (!verificationCode.trim()) {
            alert('Please enter your verification code');
            return;
        }


        fetch('https://carried-overturn-joystick.ngrok-free.dev/api/user/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: verificationCode.trim() }), credentials: "include" })
            .then(res => res.json())
            .then(data => {

                //    setDisplay(false);
                if (data.status) {
                    setAlertColor('rgb(94, 223, 94)');

                    setCheckVerify(true);


                }
                else {
                    setAlertColor('#ee1717');
                }
                setAlertPopup(true);
                setAlertMessage(data.message);
                setTimeout(() => {
                    setAlertPopup(false);
                    setAlertMessage('');
                }, 2000);



            })
            .catch(err => console.log(err))

    };


    const sendVerification = () => {
        fetch('https://carried-overturn-joystick.ngrok-free.dev/api/user/sendcode', { method: 'POST', credentials: "include" })
            .then(res => res.json())
            .then(data => {
                //console.log(data);


                if (data.status) {
                    setAlertColor('rgb(94, 223, 94)');
                }
                else {
                    setAlertColor('#ee1717');
                }
                setAlertPopup(true);
                setAlertMessage(data.message);
                setTimeout(() => {
                    setAlertPopup(false);
                    setAlertMessage('');
                }, 2000);

            });


    }


    useEffect(() => {
        fetch('https://carried-overturn-joystick.ngrok-free.dev/api/user/checkverify', { method: 'POST', credentials: "include" })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setLoading(false);
                if (data.status) {
                    if (data.data[0]['emailverify'] == 'A') {
                        setCheckVerify(true);
                        setEmail(data.data[0]['email']);
                    } else {

                        sendVerification();

                    }

                }

            });


    }, [])



    const handleResend = () => {
        console.log('Resending verification code...');

        sendVerification();




        // Connect your resend API here
    };


    if (!loading && checkVerify) {


        return (
            <>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 22px",
                    background: "#151515",
                    borderBottom: "1px solid #292929",
                    width: "100%",
                    boxSizing: "border-box"
                }}>

                    {/* Email information */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px"
                    }}>

                        {/* Email icon */}
                        <div style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            background: "#202d45",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#3985ff",
                            fontSize: "19px"
                        }}>
                            ✉
                        </div>

                        {/* Email address */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px"
                        }}>
                            <span style={{
                                color: "#888",
                                fontSize: "10px",
                                fontWeight: "600",
                                letterSpacing: "1px"
                            }}>
                                EMAIL ADDRESS
                            </span>

                            <span style={{
                                color: "#c7d4ef",
                                fontSize: "14px",
                                fontWeight: "500"
                            }}>
                                {email}
                            </span>
                        </div>

                    </div>

                    {/* Verified status */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        background: "#173b2a",
                        color: "#55d98a",
                        padding: "8px 13px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600"
                    }}>
                        <span style={{
                            fontSize: "14px"
                        }}>
                            ✓
                        </span>

                        Verified
                    </div>

                </div>
            </>
        );


    }
    //if(){

    return (
        <>

            {!loading && !checkVerify && (<div className="email-verification" style={{ color: "#c7d4ef" }}>

                {/* Description */}
                <div className="email-verification-description" style={{ color: "#c7d4ef", padding: "20.4px" }}>
                    Enter the verification code sent to your registered
                    email address. Please verify your email to secure
                    your account.
                </div>

                {/* Verification Section */}
                <div className="email-verification-section" style={{ color: "#c7d4ef" }} >

                    <h3 style={{ color: "#c7d4ef" }} >Email Verification</h3>

                    <p className="email-verification-subtitle" style={{ color: "#c7d4ef" }}>
                        Verify your email address
                    </p>

                    <div className="email-verification-card">

                        <form onSubmit={handleVerify}>

                            <label htmlFor="verificationCode" style={{ color: "#c7d4ef" }}>
                                Verification Code
                            </label>




                            <input
                                id="verificationCode"
                                type="text"
                                placeholder="Enter 6-digit verification code"
                                value={verificationCode}
                                onChange={(e) =>
                                    setVerificationCode(e.target.value)
                                }
                                maxLength={6}
                                required
                                pattern={"[0-9]{6}"}
                                title={'Enter The 6 Digit Number which Has Been Sent To Your Email'}
                            />

                            <button
                                type="submit"
                                className="verify-email-btn" style={{ color: "#c7d4ef" }}
                            >
                                Verify Email
                            </button>

                        </form>

                        <div className="resend-code">
                            Didn't receive the code?{' '}
                            <span onClick={handleResend}>
                                Resend Code
                            </span>
                        </div>

                    </div>

                </div>

            </div>)}
        </>

    );



    //}


};

export default EmailVerification;
