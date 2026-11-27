import React, { useContext, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import Navbar from './Navbar';

import Sidebar from './Sidebar';
import ChatRoom from './ChatRoom';
import AppContext from '../context/AppContext';
import { creators } from '../data/creators';

import "../assets/css/Chat.css";
const ChatUser = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const {
        activeTab,
        setActiveTab,
        sidebarOpen,
        setSidebarOpen,
        subscribedIds,
    } = useContext(AppContext);




    return (
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
                    <div className="creators-column-chat-user-layout chat-room-pane">
                        <ChatRoom
                            selectedUser={''}
                            messages={''}
                            onSendMessage={''}
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ChatUser