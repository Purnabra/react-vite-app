import React from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import AppContext from "../context/AppContext";
//import UrlContext from '../context/UrlContext';
const ProtectedRoute = () => {

    const { url, setUrl, setData } = React.useContext(AppContext);
    //  const hasFetched = React.useRef(false);
    // const location = useLocation();
    const [loading, setLoading] = React.useState(true);
    const [authenticated, setAuthenticated] = React.useState(false);
    const location = useLocation();

    setTimeout(() => {
        setUrl(location.pathname);
    }, 0);

    React.useEffect(() => {

        if (!url) return;
        //  console.log(url);
        fetch(`${import.meta.env.VITE_PROD_API_URL}/authenticate`, {
            method: "GET",
            credentials: "include"
        })
            .then((resp) => resp.json())
            .then((data) => {





                setAuthenticated(data.status);
                setLoading(false);







            }).catch(err => {
                setAuthenticated(false);
                setLoading(false);
                //  setData([]);
            })
    }, [url])

    //  console.log(url);
    if (loading) {
        return <div>Checking authentication...</div>;
    }
    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }
    // console.log('hello world')
    //console.log(payloaduser);



    return (

        <Outlet />

    )

}
export default ProtectedRoute