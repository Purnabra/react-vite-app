import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

//import getDeviceDetails from '../utils/deviceDetection.js';

const ActiveSession = () => {
    const navigate = useNavigate();
    const [devices, setDevices] = React.useState([]);
    //const [loading,setLoading]=useState()

    const [mobileDetect, setMobileDetect] = useState();
    const [loading, setLoading] = useState(true);

    const handleLogout = (id) => {
        //  console.log(id);



        fetch(`https://carried-overturn-joystick.ngrok-free.dev/api/user/logout/${id}`, {
            method: "GET",
            credentials: "include"
        })
            .then((resp) => resp.json())
            .then((data) => {


                if (data.status) {

                    setDevices((prevDevices) =>
                        prevDevices.filter((device) => device.id !== id)
                    );


                }

            });






    };

    // Simple SVG icons to match the aesthetic
    const renderIcon = (type) => {
        if (type === 'mobile') {
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
            );
        }
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
        );
    };



    useEffect(() => {

        /*  const md = new MobileDetect(window.navigator.userAgent);
          const text = (md.mobile() || ' unknown') + " and " + (md.tablet() || 'unknown') + " and " + (md.phone() || 'unknown') + " and " + (md.os() || 'unknown')
          setMobileDetect(text);
          /* console.log(); // e.g., "iPhone" or "Sony"
           console.log(md.phone());  // e.g., "iPhone"
           console.log(md.os());*/
        /*
        
                async function getDeviceInfo() {
                    const ua = navigator.userAgent;
        
                    let model = "Unknown phone";
                    let platform = "Unknown OS";
        
                    // Try modern Chromium browsers first
                    if (navigator.userAgentData) {
                        try {
                            const info =
                                await navigator.userAgentData.getHighEntropyValues([
                                    "model",
                                    "platform",
                                    "platformVersion"
                                ]);
        
                            model = info.model || model;
                            platform = info.platform || platform;
                        } catch (error) {
                            console.error("Client hints unavailable:", error);
                        }
                    }
        
                    console.log("Phone model:", model);
                    console.log("Platform:", platform);
                }
        
                getDeviceInfo();
        
        
        */

        //fetch()




        fetch(`https://carried-overturn-joystick.ngrok-free.dev/api/user/all-session`, {
            method: "GET",
            credentials: "include"
        })
            .then((resp) => resp.json())
            .then((data) => {
                //   console.log(data);
                setLoading(false)

                if (!data.status) return;
                // const deviceInfo = JSON.parse(data.data);

                //   console.log(data)


                //console.log(data.data);


                const allDevices = data.data.map((item) => {

                    const deviceInfo = JSON.parse(item.deviceinfo);
                    const deviceName = deviceInfo?.os['name'] + " " + deviceInfo?.os['version'] + " - " + deviceInfo?.browser['name'];


                    let deviceType = 'desktop';

                    if (deviceInfo.device['type']) {
                        if (deviceInfo.device['type'] === 'mobile') {
                            deviceType = 'mobile';
                        } else if (deviceInfo.device['type'] === 'tablet') {
                            deviceType = 'mobile';
                        }
                    }
                    if (item.currentSession) {
                        return { id: item.id, isCurrent: true, deviceName, icon: deviceType }

                    }

                    else {

                        return { id: item.id, isCurrent: false, deviceName, icon: deviceType }
                    }
                })
                //   console.log(allDevices);
                setDevices(allDevices);
                // console.log(data.data);
            })



    }, [])

    return (

        <>

            {!loading && (<div
                style={{
                    width: "100%",
                    minHeight: "100%",
                    height: "100%",
                    background: "#0f0f0f",
                    color: "#f5f5f5",
                    boxSizing: "border-box",

                }}
            >

                <div
                    style={{
                        padding: "18px 20px",
                        borderBottom: "1px solid #292929",
                        fontSize: "12px",
                        color: "#a7a7a7",
                        lineHeight: "1.5",
                        minHeight: "62px",
                        boxSizing: "border-box"
                    }}
                >
                    These are the devices that have logged into your account.
                    If you see a device you don't recognize, log it out and change your password immediately.
                    {mobileDetect}
                </div>


                <div style={{ padding: "20px 16px 10px" }}>
                    <div
                        style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            marginBottom: "6px"
                        }}
                    >
                        Active Devices
                    </div>

                    <div
                        style={{
                            fontSize: "12px",
                            color: "#888"
                        }}
                    >
                        {devices.length}{" "}
                        {devices.length === 1 ? "device" : "devices"}
                    </div>
                </div>


                <div style={{ padding: "8px 12px" }}>
                    {devices.length > 0 ? (
                        devices.map((device) => (
                            <div
                                key={device.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "14px 12px",
                                    marginBottom: "8px",
                                    borderRadius: "10px",
                                    background: "#171717",
                                    boxSizing: "border-box"
                                }}
                            >

                                <div
                                    style={{
                                        width: "44px",
                                        height: "44px",
                                        minWidth: "44px",
                                        borderRadius: "50%",
                                        background: "#292929",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#bdbdbd",
                                        overflow: "hidden"
                                    }}
                                >
                                    {renderIcon(device.icon)}
                                </div>


                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            color: "#f5f5f5",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",

                                            gap: "8px"
                                        }}
                                    >
                                        {device.deviceName}
                                        {device.isCurrent && (
                                            <span
                                                style={{
                                                    fontSize: "10px",
                                                    background: "rgba(0, 145, 234, .15)",
                                                    color: "#65a6ff",
                                                    padding: "2px 6px",
                                                    borderRadius: "4px",
                                                    fontWeight: 600,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.5px"
                                                }}
                                            >
                                                This Device
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "12px",
                                            color: "#888",
                                            marginTop: "5px",
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "4px"
                                        }}
                                    >
                                        <span>{device.location}</span>

                                        <span style={{ color: device.isCurrent ? "#65a6ff" : "#888" }}>
                                            {device.lastActive}
                                        </span>
                                    </div>
                                </div>


                                <button
                                    type="button"
                                    onClick={() => handleLogout(device.id)}
                                    style={{
                                        padding: "9px 13px",
                                        color: "#ff6565", // Red color for logout
                                        background: "rgba(234, 0, 0, .08)", // Red tinted background
                                        border: "1px solid #503030", // Dark red border
                                        borderRadius: "8px",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        flexShrink: 0
                                    }}
                                >
                                    Log out
                                </button>
                            </div>
                        ))
                    ) : (

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "55px 20px",
                                textAlign: "center",
                                color: "#888"
                            }}
                        >
                            <div style={{ marginBottom: "14px" }}>

                                <svg
                                    width="42"
                                    height="42"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                    <line x1="8" y1="21" x2="16" y2="21" />
                                    <line x1="12" y1="17" x2="12" y2="21" />
                                </svg>
                            </div>

                            <div
                                style={{
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    color: "#ddd",
                                    marginBottom: "7px"
                                }}
                            >
                                No active devices found
                            </div>

                            <div style={{ fontSize: "12px", lineHeight: "1.6" }}>
                                Devices you log into will appear here.
                            </div>
                        </div>
                    )}
                </div>


            </div>)}



        </>




    )
};

export default ActiveSession;

