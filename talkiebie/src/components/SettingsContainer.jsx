import React from 'react';
import { useNavigate } from "react-router-dom";



const SettingsContainer = ({ isChatOpen, setCurrentPanel }) => {
    const navigate = useNavigate();

    const items = [

        {
            title: "Profile ",
            action: () => console.log("Profile"),
            urlMobile: '/setting/mobile/profile',
            urlDesktop: '/setting/profile',
            tag: "profile"
        },
        {
            title: "Account (login & security)",
            action: () => console.log("Account"),
            urlMobile: '/setting/mobile/account',
            urlDesktop: '/setting/account',
            tag: "account"
        },
        {
            title: "Privacy",
            action: () => console.log("Privacy"),
            urlMobile: '/setting/mobile/privacy',
            urlDesktop: '/setting/privacy',
            tag: "privacy"
        },
        {
            title: "Notifications",
            action: () => console.log("Notifications"),
            urlMobile: '/setting/mobile/notification',
            urlDesktop: '/setting/notification',
            tag: "notification"
        },
        {
            title: "Media",
            action: () => console.log("Media"),
            urlMobile: '/setting/mobile/media',
            urlDesktop: '/setting/media',
            tag: "media"
        }
    ]


    return (

        <div className="chat-list">
            {/* Header */}
            <div className="chat-list-header" style={{ padding: "1.1rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512" onClick={() => navigate('/chat', { replace: true })}><path fill="white" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                <h2 style={{
                    color: "white", fontWeight: "bold", fontSize: "18px"
                }}>SETTINGS</h2>

            </div>


            {items.map((item, index) => (

                <div className='settingstyle' style={{ cursor: "pointer" }} key={index} onClick={() => { setCurrentPanel(item.tag); (isChatOpen) ? navigate(item.urlMobile, { replace: true }) : navigate(item.urlDesktop, { replace: true }) }}>

                    <div className='setting-style-item' style={{ color: "white", fontWeight: "600" }} >

                        {item.title}

                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path fill="grey" d="M338.752 104.704a64 64 0 000 90.496l316.8 316.8-316.8 316.8a64 64 0 0090.496 90.496l362.048-362.048a64 64 0 000-90.496L429.248 104.704a64 64 0 00-90.496 0z" /></svg>
                    </div>

                </div>


            ))}





        </div>


    )


}



export default SettingsContainer;