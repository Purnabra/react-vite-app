import React from 'react'

const SuccessFailure = ({ message, color }) => {
    return (
        // #11141d  #ee1717
        <>

            <div style={{ position: "absolute", top: "10px", right: "39px", width: "450px", height: "50px", zIndex: 100, background: "#11141d", border: "2px solid #11141d", borderRadius: "6px", scrollbarWidth: "none" }} align={'center'}>




                <div style={{ height: "40px", width: "100%", wordBreak: "break-word", overflow: "auto", scrollbarWidth: "none", minHeight: "40px", color: color, fontWeight: "600", fontSize: "13px" }}>
                    {message}</div>


            </div>

            <div style={{ position: "absolute", top: "54px", right: "39px", width: "400px", height: "6px", zIndex: 100, background: "rgb(196, 81, 146)", border: "none", borderRadius: "6px 0px 6px 6px", animation: "barAnimation 2s linear  " }}></div>


        </>

    )
}

export default SuccessFailure