import React, { useState, useRef, useContext } from 'react'

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AppContext from '../context/AppContext';

const ChangePassword = () => {

    const { setAlertPopup, setAlertMessage, setAlertColor, setDisplay } = useContext(AppContext);
    const [currentpass, setCurrentpass] = useState(<FaEye style={{ fontSize: "28px" }} />);
    const [newpass, setNewpass] = useState(<FaEye style={{ fontSize: "28px" }} />);
    const [confirmpass, setConfirmpass] = useState(<FaEye style={{ fontSize: "28px" }} />);
    const currentpassIn = useRef('password')
    const newpassIn = useRef('password')
    const confirmpassIn = useRef('password')
    const currentform = useRef();
    const handleChange = (el, tag) => {


        if (tag === 'currentpass') {



            setCurrentpass(el.getAttribute('data-icon') === 'false' ? <FaEyeSlash style={{ fontSize: "28px" }} /> : <FaEye style={{ fontSize: "28px" }} />);

            (el.getAttribute('data-icon') === 'false') ? currentpassIn.current = 'text' : currentpassIn.current = 'password';



        }
        else if (tag === 'newpass') {

            (el.getAttribute('data-icon') === 'false') ? newpassIn.current = 'text' : newpassIn.current = 'password';
            setNewpass(el.getAttribute('data-icon') === 'false' ? <FaEyeSlash style={{ fontSize: "28px" }} /> : <FaEye style={{ fontSize: "28px" }} />);
        }
        else {

            (el.getAttribute('data-icon') === 'false') ? confirmpassIn.current = 'text' : confirmpassIn.current = 'password';
            setConfirmpass(el.getAttribute('data-icon') === 'false' ? <FaEyeSlash style={{ fontSize: "28px" }} /> : <FaEye style={{ fontSize: "28px" }} />);
        }



        if (el.getAttribute('data-icon') === 'false') {

            el.setAttribute('data-icon', true);
        } else {
            el.setAttribute('data-icon', false);
        }




    }




    const handleSubmit = (e) => {
        e.preventDefault();

        setDisplay(true);
        const formData = new FormData(currentform.current);
        fetch(`https://carried-overturn-joystick.ngrok-free.dev/api/user/change-password`, {
            method: "POST",
            credentials: "include",
            /* headers: { 'Content-Type': 'application/json' },*/
            body: formData
        })
            .then((resp) => resp.json())
            .then((data) => {
                setDisplay(false);
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

            })





    }

    return (
        <>
            <form ref={currentform} onSubmit={handleSubmit}>

                <div style={{ width: "95%", margin: "20px auto" }} >

                    <div style={{ position: "relative" }}>



                        <input type={currentpassIn.current} name='currentpass' id="currentpass" placeholder='Current Password' style={{ width: "95%", height: "53px", background: "#0f0f0f", border: "1px solid rgb(91, 89, 89)", outline: "none", color: "white", fontWeight: "500", fontSize: "16px", padding: "15px", borderRadius: "8px 0px 0px 8px", borderRight: "none" }} autoComplete="off" />

                        <div style={{ position: "absolute", top: "0px", right: "0px", zIndex: "1", width: "47px", height: "53px", border: "1px solid rgb(91, 89, 89)", borderRadius: "0px 8px 8px 0px", borderLeft: "none", background: "rgb(15, 15, 15)" }}></div>


                        <div style={{ position: "absolute", top: "12px", right: "10px", zIndex: "1", }} data-icon={false} onClick={(e) => handleChange(e.currentTarget, 'currentpass')} > {currentpass}</div>

                    </div>





                </div>


                <div style={{ width: "100%", borderBottom: "1px solid #282828" }}></div>



                <div style={{ width: "95%", margin: "20px auto", display: "flex", flexDirection: "column", gap: "30px" }} >



                    <div style={{ position: "relative" }}>

                        <input type={newpassIn.current} name='newpass' id="newpass" placeholder='New Password' style={{ width: "95%", height: "53px", background: "#0f0f0f", border: "1px solid rgb(91, 89, 89)", outline: "none", color: "white", fontWeight: "500", fontSize: "16px", padding: "15px", borderRadius: "8px 0px 0px 8px", borderRight: "none" }} />

                        <div style={{ position: "absolute", top: "0px", right: "0px", zIndex: "1", width: "47px", height: "53px", border: "1px solid rgb(91, 89, 89)", borderRadius: "0px 8px 8px 0px", borderLeft: "none", background: "rgb(15, 15, 15)" }}></div>


                        <div style={{ position: "absolute", top: "12px", right: "10px", zIndex: "1", }} data-icon={false} onClick={(e) => handleChange(e.currentTarget, 'newpass')}>{newpass} </div>

                    </div>


                    <div style={{ position: "relative", width: "100%" }}>




                        <input type={confirmpassIn.current} name='confirmpass' id="confirmpass" placeholder='Confirm New Password' style={{ width: "95%", height: "53px", background: "#0f0f0f", border: "1px solid rgb(91, 89, 89)", outline: "none", color: "white", fontWeight: "500", fontSize: "16px", padding: "15px", borderRadius: "8px 0px 0px 8px", borderRight: "none" }} />

                        <div style={{ position: "absolute", top: "0px", right: "0px", zIndex: "1", width: "47px", height: "53px", border: "1px solid rgb(91, 89, 89)", borderRadius: "0px 8px 8px 0px", borderLeft: "none", background: "rgb(15, 15, 15)" }}></div>


                        <div style={{ position: "absolute", top: "12px", right: "10px", zIndex: "1", }} data-icon={false} onClick={(e) => handleChange(e.currentTarget, 'confirmpass')} > {confirmpass}</div>

                    </div>




                </div>

                <div style={{ width: "100%", borderBottom: "1px solid #282828" }}></div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "right", width: "100%", padding: "12px" }}>

                    <button style={{ padding: "10px 15px 10px 15px", color: "white", background: "#306ab3", borderRadius: "10px ", fontSize: "15px" }} type='submit' >Save</button>



                </div>


            </form>



        </>





    )
}

export default ChangePassword