import React from 'react'

import { useNavigate } from "react-router-dom"

const Logout = () => {


    const navigate = useNavigate();

    React.useEffect(() => {





        fetch('https://carried-overturn-joystick.ngrok-free.dev/api/user/logout', {

            credentials: "include",


        }).then((resp) => resp.json()).then((data) => {

            console.log(data);
            navigate('/login', { replace: true })


        }).catch((err) => console.log(err))



    }, [])

    return (






        <>




        </>
    )
}

export default Logout