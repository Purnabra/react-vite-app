import React, { useRef, useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import AppContext from '../context/AppContext';
const Profile = () => {

    //const { setDisplay } = useContext(AppContext);
    const { setAlertPopup, setAlertMessage, setAlertColor, setDisplay } = useContext(AppContext);
    const navigate = useNavigate();
    /*  const elements = [];
  
      for (let index = 0; index < 100; index++) {
          elements.push(
  
  
          );
      }*/

    const [imageloaded, setImageLoaded] = useState(false);

    const [imageSrc, setImageSrc] = useState('/img/avatar.jpg');


    const profileformRef = useRef(null);
    const profileimageRef = useRef(null);
    const fakeimageRef = useRef(null);
    const usernameRef = useRef(null);

    //  const formRef=useRef(null);
    const handlFocus = (e) => {


        const input = e.target;
        const div = e.target.previousElementSibling;
        div.style.display = '';
        input.placeholder = "";
        input.style.border = '1px solid #4c569b';
    }

    const handlBlur = (e, label) => {
        const input = e.target;

        if (input.value.trim() === '') {

            const div = e.target.previousElementSibling;
            div.style.display = 'none';
            input.placeholder = `${label}`;
        }


        input.style.border = '1px solid rgb(91, 89, 89)';
    }


    const handlesave = () => {
        setDisplay(true);
        const form = new FormData(profileformRef.current);

        // console.log(form);

        fetch('https://carried-overturn-joystick.ngrok-free.dev/api/user/profile/save', {
            method: "POST",
            body: form,
            credentials: 'include'
        }).then(res => res.json()).then(data => {
            setDisplay(false);

            if (profileimageRef.current) {
                profileimageRef.current.value = "";
            }
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


            //console.log(data)
        });
    }


    const handleloadimage = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {

            fakeimageRef.current.src = e.target.result

        }
        const file = e.target.files[0];
        reader.readAsDataURL(file);
    }
    useEffect(() => {
        const store = JSON.parse(localStorage.getItem('loggedUser'));
        // console.log();
        usernameRef.current.value = store['username'];

        fetch('https://carried-overturn-joystick.ngrok-free.dev/api/user/profile', {
            method: "GET",
            credentials: 'include'
        }).then(res => res.json()).then(data => {

            //  console.log(data);

            // profileimageRef.current.value = "";
            if (data.status == false) {
                return;



            }



            if (data.data[0]['image'] != '') {
                setImageSrc("https://carried-overturn-joystick.ngrok-free.dev" + data.data[0]['image']);


            }

            setImageLoaded(true);

            profileformRef.current.displayname.value = data.data[0]['display_name'];
            if (data.data[0]['display_name'] !== '') {
                // profileformRef.current.displayname.click();
                const div = profileformRef.current.displayname.previousElementSibling;
                div.style.display = '';
            }
            profileformRef.current.bio.value = data.data[0]['bio'];
            if (data.data[0]['bio'] !== '') {
                const div = profileformRef.current.bio.previousElementSibling;
                div.style.display = '';
            }
            profileformRef.current.location.value = data.data[0]['location'];
            if (data.data[0]['location'] !== '') {
                const div = profileformRef.current.location.previousElementSibling;
                div.style.display = '';
            }

        });


    }, [])

    return (
        <div className="conversation-setting" style={{ position: "relative", background: "rgb(15, 15, 15)" }}>


            <div className="convenav" style={{ height: "61px", position: "static", width: "100%", zIndex: "1" }}>

                {/* Left Section: Back button & User Info */}
                <div className="conveuser" style={{ justifyContent: "space-between", width: "100%" }}  >


                    <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "90%" }}>


                        <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512" onClick={() => navigate('/setting/profile', { replace: true })}><path fill="white" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                        <button className="back-btn" aria-label="Back" style={{ fontWeight: "bold", fontSize: "18px" }}>
                            EDIT PROFILE
                        </button>

                    </div>





                    <button style={{ padding: "10px 15px 10px 15px", color: "white", background: "#306ab3", borderRadius: "10px ", fontSize: "15px" }} onClick={handlesave}>Save</button>

                </div>
            </div>
            {/* <div style={{ height: "61px" }}></div>*/}
            <div style={{ background: "#0f0f0f", scrollbarWidth: "none" }} className='setting-right-theme'>
                <div style={{ width: "100%", height: "160px", borderBottom: "1px solid rgb(91, 89, 89)", position: "relative" }}>

                    {/*<img src="/img/avatar.jpg" style={{ width: "100%", height: "100%" }} />*/}

                    <div style={{ position: "absolute", height: "150px", width: "150px", bottom: "-50px", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", clipPath: "circle()" }}>


                        {imageloaded && (<img src={imageSrc} style={{ width: "100%", height: "100%" }} alt="avatar image" onClick={() => profileimageRef.current.click()} ref={fakeimageRef} />)}

                    </div>

                </div>

                <div style={{ height: "80px", width: "100%" }}>



                </div>

                <form id="profileform" name="profileform" ref={profileformRef}>

                    <input type="file" name="profileimage" id="profileimage" ref={profileimageRef} style={{ display: "none" }} onChange={handleloadimage} />
                    <div style={{ display: "flex", alignItems: "center", width: "95%", flexDirection: "column", gap: "40px", justifyContent: "center", margin: "10px auto", }} id="profileItem">



                        <div style={{ width: "100%", position: "relative" }}>

                            <div style={{ position: "absolute", top: "-11px", background: "#0f0f0f", left: "10px", padding: "0px 3px 0px 3px", fontSize: "13px", color: "gray", }} align="center" >Username</div>

                            <input type="text" name='username' id="username" placeholder='Username' style={{ width: "100%", height: "100%", background: "#0f0f0f", border: "1px solid rgb(91, 89, 89)", outline: "none", color: "white", fontWeight: "500", fontSize: "15px", padding: "15px", borderRadius: "8px", cursor: "not-allowed" }} ref={usernameRef} onFocus={handlFocus} onBlur={(e) => handlBlur(e, 'Username')} readOnly />
                        </div>



                        <div style={{ width: "100%", margin: "0 auto", position: "relative" }}>

                            <div style={{ position: "absolute", top: "-11px", background: "#0f0f0f", left: "10px", padding: "0px 3px 0px 3px", fontSize: "13px", color: "gray", display: "none" }} align="center">Display name</div>

                            <input type="text" name='displayname' id="displayname" placeholder='Display name' style={{ width: "100%", height: "100%", background: "#0f0f0f", border: "1px solid rgb(91, 89, 89)", outline: "none", color: "white", fontWeight: "500", fontSize: "15px", padding: "15px", borderRadius: "8px", }} onFocus={handlFocus} onBlur={(e) => handlBlur(e, 'Display name')} />
                        </div>





                        <div style={{ width: "100%", position: "relative" }}>

                            <div style={{ position: "absolute", top: "-11px", background: "#0f0f0f", left: "10px", padding: "0px 3px 0px 3px", fontSize: "13px", color: "gray", display: "none" }} align="center">Bio</div>

                            <textarea rows={5} placeholder='Bio' id="bio" name="bio" style={{ width: "100%", height: "100%", background: "#0f0f0f", border: "1px solid rgb(91, 89, 89)", color: "white", fontWeight: "500", fontSize: "15px", borderRadius: "8px", resize: "none", overflow: "hidden", padding: "12px", margin: 0 }} onFocus={handlFocus} onBlur={(e) => handlBlur(e, 'Bio')}></textarea>


                            {/*<input type="text" name='username' id="username" style={{ width: "100%", height: "100%", background: "#0f0f0f", border: "1px solid rgb(91, 89, 89)", outline: "none", color: "white", fontWeight: "600", fontSize: "15px", padding: "15px", borderRadius: "8px", }} /> */}
                        </div>



                        <div style={{ width: "100%", position: "relative" }}>

                            {<div style={{ position: "absolute", top: "-11px", background: "#0f0f0f", left: "10px", padding: "0px 3px 0px 3px", fontSize: "13px", color: "gray", display: "none" }} align="center">Location</div>}

                            <input type="text" name='location' id="location" placeholder='Location' style={{ width: "100%", height: "100%", background: "#0f0f0f", border: "1px solid rgb(91, 89, 89)", outline: "none", color: "white", fontWeight: "500", fontSize: "16px", padding: "15px", borderRadius: "8px", }} onFocus={handlFocus} onBlur={(e) => handlBlur(e, 'Location')} />


                            {/*<input type="text" name='username' id="username" style={{ width: "100%", height: "100%", background: "#0f0f0f", border: "1px solid rgb(91, 89, 89)", outline: "none", color: "white", fontWeight: "600", fontSize: "15px", padding: "15px", borderRadius: "8px", }} /> */}
                        </div>


                    </div>


                </form>






            </div >


        </div >

    )
}

export default Profile