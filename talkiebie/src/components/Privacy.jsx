import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
const Privacy = ({ isChatOpen, setCurrentPanel }) => {

    // console.log(isChatOpen);

    const navigate = useNavigate();
    const items = [
        {
            title: "Last Seen & Online Status",
            action: () => console.log("Profile"),
            urlMobile: '/setting/mobile/privacy/last-seen',
            urlDesktop: '/setting/privacy/last-seen',
            tag: "account/password"
        },
        {
            title: "Read Receipts",
            action: () => console.log("Account"),
            urlMobile: '/setting/mobile/privacy/readreceipt',
            urlDesktop: '/setting/privacy/readreceipt',
            tag: "account/2fa"
        },
        {
            title: "Profile Photo & About Privacy",
            action: () => console.log("Privacy"),
            urlMobile: '/setting/mobile/privacy/profileprivacy',
            urlDesktop: '/setting/privacy/profileprivacy',
            tag: "account/verification"
        },
        {
            title: "Blocked Users",
            action: () => console.log("Notifications"),
            urlMobile: '/setting/mobile/privacy/blockuser',
            urlDesktop: '/setting/privacy/blockuser',
            tag: "account/all-sessions"
        },

    ]

    console.log(isChatOpen);
    const handlesave = () => {
        //console.log('hello')

    }

    return (
        <div className="conversation-setting" style={{ position: "relative", background: "rgb(15, 15, 15)", justifyContent: "flex-start" }}>

            <div className="convenav" style={{ height: "62px", position: "static", width: "100%", zIndex: "1" }}>

                {/* Left Section: Back button & User Info */}
                <div className="conveuser" style={{ justifyContent: "space-between", width: "100%" }}  >


                    <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "90%" }}>


                        {/* <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512" onClick={() => navigate('/setting/profile', { replace: true })}><path fill="white" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>*/}
                        <button className="back-btn" aria-label="Back" style={{ fontWeight: "600", fontSize: "16px" }}>
                            Profile
                        </button>

                    </div>





                    {/* <button style={{ padding: "10px 15px 10px 15px", color: "white", background: "#306ab3", borderRadius: "10px ", fontSize: "15px" }} onClick={handlesave}>Save</button>*/}

                </div>
            </div>

            {/* <div style={{ height: "61px" }}></div>*/}
            <div style={{ background: "#0f0f0f", scrollbarWidth: "none", fontSize: "1rem" }} className='setting-right-theme'>

                {items.map((item, index) => (

                    <div className='settingstyle' style={{ cursor: "pointer" }} key={index} >

                        <div className='setting-style-item' style={{ color: "white", fontWeight: "600" }} onClick={() => { (!isChatOpen && isChatOpen != undefined) ? navigate(item.urlDesktop, { replace: true }) : navigate(item.urlMobile, { replace: true }) }} >

                            {item.title}

                            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path fill="grey" d="M338.752 104.704a64 64 0 000 90.496l316.8 316.8-316.8 316.8a64 64 0 0090.496 90.496l362.048-362.048a64 64 0 000-90.496L429.248 104.704a64 64 0 00-90.496 0z" /></svg>
                        </div>

                    </div>

                ))}
            </div >


        </div >

    )
}



export default Privacy

