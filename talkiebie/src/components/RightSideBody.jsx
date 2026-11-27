import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";


const RightSideBody = ({ element, tag, url }) => {

    const navigate = useNavigate();


    const location = useLocation();

    const pathArr = location.pathname.split('/');
    const handlesave = () => {
        console.log('hello')

    }

    return (
        <div className="conversation-setting" style={{ position: "relative", background: "rgb(15, 15, 15)", justifyContent: "flex-start" }}>

            <div className="convenav" style={{ height: "61px", position: "static", width: "100%", zIndex: "1", minHeight: "61px" }}>

                {/* Left Section: Back button & User Info */}
                <div className="conveuser" style={{ justifyContent: "space-between", width: "100%" }}  >


                    <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "90%" }}>
                        {
                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 512 512" onClick={() => navigate(url, { replace: true })}><path fill="#c7d4ef" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                        }
                        <button className="back-btn" aria-label="Back" style={{ fontWeight: "600", fontSize: "18px", color: "#c7d4ef" }}>
                            {tag}
                        </button>

                    </div>





                    {/* <button style={{ padding: "10px 15px 10px 15px", color: "white", background: "#306ab3", borderRadius: "10px ", fontSize: "15px" }} onClick={handlesave}>Save</button> */}

                </div>
            </div>
            {/* <div style={{ height: "61px" }}></div>*/}









            <div style={{ background: "#0f0f0f", scrollbarWidth: "none", padding: 0 }} className='setting-right-theme'>

                {element}
            </div >


        </div >

    )
}



export default RightSideBody;