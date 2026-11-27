import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import styles from "../assets/css/authStyle.module.css";
import Login from "./Login";
import Register from "./Register";
import Popup from '../components/Popup';
const Auth = () => {
    //console.log(styles);
    const location = useLocation();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [popup, setPopup] = useState(false);
    const [content, setContent] = useState("");
    const el = React.useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {


        if (location.pathname === '/login') {

            fetch("https://carried-overturn-joystick.ngrok-free.dev/api/user/authenticate", {
                method: "GET",
                credentials: "include"
            }).then(resp1 => resp1.json()).then((data1) => {

                if (data1.status) { navigate('/', { replace: true }); return };

                setLoading(false);


            }).catch(err => console.log(err))


        }
        else {
            setLoading(false);

        }






    }, [])

    /*useEffect(() => {


        if (location.pathname === '/login') { setIsLogin(true); }
        if (location.pathname === '/register') { setIsLogin(false); }

        setLoading(true);
    }, [location.pathname]);
*/
    /*if (location.pathname === '/login') { setIsLogin(true); }
    if (location.pathname === '/register') { setIsLogin(false); }*/

    return (

        <>
            <div style={{ height: "60px" }}></div>

            {!loading && (<div align="center" className={styles['auth-container']}  >
                <Popup
                    popup={popup}
                    content={content}
                    progressBarRef={el}
                />
                {location.pathname === '/register' && (<Register isLogin={isLogin} styles={styles} setIsLogin={setIsLogin} setPopup={setPopup} setContent={setContent} el={el} />)}
                {location.pathname === '/login' && (<Login isLogin={isLogin} styles={styles} setIsLogin={setIsLogin} setPopup={setPopup} setContent={setContent} el={el} />)}
            </div>

            )}

        </>

    );
};

export default Auth;
