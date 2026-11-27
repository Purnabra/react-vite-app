import React from 'react';
import {
    FaStar,
    FaBell,
    FaRegStar, // Using a regular star for the outline look in the image
    FaImages,
    FaShoppingBag,
    FaSearch,
    FaEllipsisV,
    FaChevronLeft,
    FaCheckCircle, // For the verified badge
    FaPencilAlt    // For the edit pencil
} from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import AllConnection from '../context/AllConnection';

const ConvHeader = ({ setLeftOptionsDisplay,
    username = "hannah ✨ message me cutie 😊"
}) => {
    const navigate = useNavigate();
    const { socket, manualclose } = React.useContext(AllConnection);
    const removeConnection = () => {
        /* socket.current.send(JSON.stringify({ type: "audio-terminate", message: "you terminated the audio" }));*/
        /* manualclose.current = true;
         if (socket.current && (
             socket.current.readyState === WebSocket.OPEN ||
             socket.current.readyState === WebSocket.CONNECTING
         )) {
 
             console.log('dist');
             socket.current.close();
         }
 */
        navigate('/chat', { replace: true })

    }
    return (
        <div className="convenav">


            {/* Left Section: Back button & User Info */}
            <div className="conveuser">
                <button className="back-btn" aria-label="Back" onClick={removeConnection}>
                    <FaChevronLeft />
                </button>

                <div className="user-details">
                    {/* USERNAME ROW */}
                    <div className="user-name-row">
                        <h4>{username}</h4>
                        <FaCheckCircle className="verified-badge" />
                        <FaPencilAlt className="edit-icon" />
                    </div>

                    {/* SUB MENU ROW */}
                    <div className="user-sub-menu">
                        <span className="availability">
                            <span className="green-dot"></span> Available now
                        </span>



                        <span className="separator">|</span>
                        <button title="Notifications"><FaBell /></button>


                        <span className="separator">|</span>
                        <button className="text-icon"><FaSearch /> Find</button>
                    </div>
                </div>
            </div>

            {/* Right Section: More Options */}
            <div className="header-tools" style={{ userSelect: "none", cursor: "pointer" }} onClick={() => setLeftOptionsDisplay(prev => { if (prev == 'none') { return ""; } else { return "none"; } })} >
                <button className="more-options-btn" aria-label="More options" style={{ userSelect: "none" }}>
                    <FaEllipsisV />
                </button>
            </div>
        </div >
    );
};

export default ConvHeader;