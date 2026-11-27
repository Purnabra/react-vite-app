import React, { useEffect, useState, useRef, useContext } from 'react';
import AppContext from '../context/AppContext';
const ProfilePrivacy = () => {
    const [profilePhoto, setProfilePhoto] = useState("everyone");
    const [aboutPrivacy, setAboutPrivacy] = useState("everyone");
    const { setAlertPopup, setAlertMessage, setAlertColor } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const profileradioRef = useRef(null);
    const aboutradioRef = useRef(null);
    const { setDisplay } = useContext(AppContext);
    const options = [
        {
            value: "everyone",
            label: "Everyone",
            description: "Anyone can see your profile information."
        },

        {
            value: "nobody",
            label: "Nobody",
            description: "No one can see your profile information."
        }
    ];

    const renderOptions = (value, setValue, prefix, ref) => {

        const handlevisibility = (e, val) => {
            ref.current = e.target
            // console.log('hello world');
            setValue(val)

            //setReadReceipts(option.value)

            // fetch()

        }



        return (
            <div style={{ padding: "12px", borderBottom: "1px solid #292929" }}>
                {
                    options.map((option) => {
                        const selected = value === option.value;

                        return (
                            <label
                                key={option.value}
                                htmlFor={`${prefix}-${option.value}`}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "14px",
                                    padding: "18px 16px",
                                    marginBottom: "8px",
                                    borderRadius: "10px",
                                    border: "none",
                                    background: selected
                                        ? "rgba(0, 145, 234, .06)"
                                        : "#171717",
                                    cursor: "pointer",
                                    transition: "background 0.2s ease, border-color 0.2s ease",
                                    boxSizing: "border-box"
                                }}
                            >
                                <input
                                    type="radio"
                                    id={`${prefix}-${option.value}`}
                                    name={prefix}
                                    value={option.value}
                                    checked={selected}
                                    onChange={(e) => handlevisibility(e, option.value)}
                                    style={{
                                        appearance: "none",
                                        WebkitAppearance: "none",
                                        width: "18px",
                                        height: "18px",
                                        minWidth: "18px",
                                        margin: "2px 0 0",
                                        borderRadius: "50%",
                                        border: selected
                                            ? "2px solid #4c80ff"
                                            : "2px solid #777",
                                        background: selected
                                            ? "radial-gradient(circle, #4c80ff 0 4px, transparent 4.5px)"
                                            : "transparent",
                                        cursor: "pointer",
                                        boxSizing: "border-box"


                                    }}

                                    ref={ref}
                                />

                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            fontSize: "15px",
                                            fontWeight: 600,
                                            marginBottom: "6px",
                                            color: "#f5f5f5"
                                        }}
                                    >
                                        {option.label}
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "13px",
                                            lineHeight: "1.5",
                                            color: "#999"
                                        }}
                                    >
                                        {option.description}
                                    </div>
                                </div>

                                {selected && (
                                    <span
                                        style={{
                                            color: "#4c80ff",
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            paddingTop: "2px"
                                        }}
                                    >
                                        Selected
                                    </span>
                                )}
                            </label>
                        );
                    })
                }
            </div >
        )
    }



    const handleSubmit = () => {

        setDisplay(true);


        //  console.log(profileradioRef.current);
        //console.log(aboutradioRef.current);
        //  console.log(visibility);

        const profile_input = (profilePhoto == 'everyone') ? 'Everyone' : 'None';
        const about_input = (aboutPrivacy == 'everyone') ? 'Everyone' : 'None';
        //console.log(profile_input);
        // console.log(about_input);
        fetch('https://carried-overturn-joystick.ngrok-free.dev/api/user/save-profile-privacy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ profile_input, about_input }), credentials: "include" })
            .then(res => res.json())
            .then(data => {

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
            .catch(err => console.log(err))

    }


    useEffect(() => {


        fetch('https://carried-overturn-joystick.ngrok-free.dev/api/user/profile-privacy', { method: 'GET', credentials: "include" })
            .then(res => res.json())
            .then(data => {


                if (data.status) {
                    console.log(data.data)

                    if (data.data.length > 0) {

                        if (data.data[0]['who_sees_profile_info'] == 'Everyone') { setProfilePhoto("everyone"); } else { setProfilePhoto("nobody") }


                        if (data.data[0]['who_sees_about_info'] == 'Everyone') { setAboutPrivacy("everyone"); } else { setAboutPrivacy("nobody") }

                    }


                }




                setLoading(false);


            })
            .catch(err => console.log(err))







    }, [])

    return (


        <>
            {!loading && (<div
                style={{
                    width: "100%",
                    minHeight: "100%",
                    background: "#0f0f0f",
                    color: "#f5f5f5",

                    height: "100%"
                }}
            >
                <div
                    style={{
                        padding: "18px 20px",
                        borderBottom: "1px solid #292929",
                        fontSize: "12px",
                        color: "#a7a7a7",
                        lineHeight: "1.5",
                        height: "62px",
                        minHeight: "62px",
                        boxSizing: "border-box"
                    }}
                >
                    Choose who can see your profile photo and About information.
                </div>

                <div style={{ padding: "16px 12px 4px" }}>
                    <div style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        padding: "0 4px 10px"
                    }}>
                        Profile Photo
                    </div>
                </div>



                {renderOptions(profilePhoto, setProfilePhoto, "profile-photo", profileradioRef)}

                <div style={{ padding: "16px 12px 4px" }}>
                    <div style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        padding: "0 4px 10px"
                    }}>
                        About
                    </div>
                </div>

                {renderOptions(aboutPrivacy, setAboutPrivacy, "about-privacy", aboutradioRef)}

                <div align="right" style={{ padding: "12px" }}>
                    <button
                        style={{
                            padding: "10px 15px",
                            color: "white",
                            background: "#306ab3",
                            borderRadius: "10px",
                            fontSize: "15px",
                            border: "none",
                            cursor: "pointer"
                        }}
                        type="button"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>)}</>

    );
};

export default ProfilePrivacy;     