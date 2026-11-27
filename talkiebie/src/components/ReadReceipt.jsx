import React, { useEffect, useState, useRef, useContext } from 'react';
import AppContext from '../context/AppContext';
const ReadReceipt = () => {
    const [readReceipts, setReadReceipts] = useState("enabled");
    const { setAlertPopup, setAlertMessage, setAlertColor } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const radioRef = useRef(null);
    const { setDisplay } = useContext(AppContext);
    const options = [
        {
            value: "enabled",
            label: "Enabled",
            description: "Let others know when you have read their messages."
        },
        {
            value: "disabled",
            label: "Disabled",
            description: "Others won't see read receipts when you read their messages."
        }
    ];


    const handlevisibility = (e, val) => {
        radioRef.current = e.target
        // console.log('hello world');
        setReadReceipts(val)

        //setReadReceipts(option.value)

        // fetch()

    }

    const handleSubmit = () => {

        setDisplay(true);

        console.log(radioRef.current);

        //  console.log(visibility);

        const read_input = (readReceipts == 'enabled') ? 'A' : 'I';

        fetch('https://carried-overturn-joystick.ngrok-free.dev/api/user/save-read-receipt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ read_input: read_input }), credentials: "include" })
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


        fetch('https://carried-overturn-joystick.ngrok-free.dev/api/user/read-receipt', { method: 'GET', credentials: "include" })
            .then(res => res.json())
            .then(data => {


                if (data.status) {
                    //    console.log(data.data)

                    if (data.data.length > 0) {

                        if (data.data[0]['read_receipt'] == 'A') { setReadReceipts("enabled"); } else { setReadReceipts("disabled") }

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
                    boxSizing: "border-box"
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
                        minHeight: "62px"
                    }}
                >
                    Choose whether to share read receipts with other users.
                </div>

                <div style={{ padding: "12px", borderBottom: "1px solid #292929", }}>
                    {options.map((option) => {
                        const selected = readReceipts === option.value;

                        return (
                            <label
                                key={option.value}
                                htmlFor={`read-receipts-${option.value}`}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "14px",
                                    padding: "18px 16px",
                                    marginBottom: "8px",
                                    borderRadius: "10px",
                                    border: 'none',
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
                                    id={`read-receipts-${option.value}`}
                                    name="readReceipts"
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

                                    ref={radioRef}
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
                    })}
                </div>
                <div align={'right'} style={{ padding: "12px" }}><button style={{ padding: "10px 15px 10px 15px", color: "white", background: "#306ab3", borderRadius: "10px ", fontSize: "15px" }} type='button' onClick={handleSubmit} >Save</button></div>
            </div>)}


        </>

    );
};

export default ReadReceipt;