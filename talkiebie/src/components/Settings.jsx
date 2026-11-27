import React, { useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SettingsContainer from './SettingsContainer';
import SettingRightPanel from './SettingsRightPanel';
import { creators } from '../data/creators';

import "../assets/css/Chat.css";

import "../assets/css/Setting.css"

const Settings = () => {

    const [isChatOpen, setIsChatOpen] = useState(false);

    const [isSettingtOpen, setIsSettingtOpen] = useState(false);

    const [currentPanel, setCurrentPanel] = useState("profile");
    const {
        activeTab,
        setActiveTab,
        sidebarOpen,
        setSidebarOpen,
        subscribedIds,
        url,
        setUrl
    } = useContext(AppContext);


    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);




    return (
        <>
            <div className="app">
                <Navbar
                    onMenuClick={() => setSidebarOpen(prev => !prev)}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <div className="app-body">
                    <Sidebar
                        open={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        subscribedCreators={creators.filter((c) =>
                            subscribedIds.includes(c.id)
                        )}
                        sidebarOpen={sidebarOpen}
                        setIsOpen={setIsChatOpen}

                    />
                    <main className="chat-layout">
                        <div className="feed-column chat-list-pane" >
                            <SettingsContainer isChatOpen={isChatOpen} setCurrentPanel={setCurrentPanel} />
                        </div>

                        <div className="creators-column-chat-layout chat-room-pane" style={{ borderRight: "1px solid #282828", height: "100%" }} >
                            {<SettingRightPanel currentPanel={currentPanel} setCurrentPanel={setCurrentPanel} isChatOpen={isChatOpen} />}
                        </div>
                        {/*<div style={{ width: "40px", background: "#0f0f0f" }}></div> */}
                    </main>
                </div>
            </div>
        </>
    );
};

export default Settings;