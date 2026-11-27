import React, { useState, useEffect } from 'react';
import { TbBackground } from 'react-icons/tb';

import { useNavigate } from 'react-router-dom';

const ChatList = ({ selectedUserId, isChatOpen, users }) => {
    const [activeFilter, setActiveFilter] = useState('All');


    const navigate = useNavigate();

    const filters = [
        { key: 'All', label: 'All' },
        { key: 'Priority', label: 'Priority', count: 10 },
        { key: 'Pinned', label: 'Pinned', count: 1 },
        { key: 'Unread', label: 'Unread', count: 134 },
    ];
    // console.log('hello chat');
    // console.log(users);


    useEffect(() => {


    }, [])






    return (
        <div className="chat-list">
            {/* Header */}
            <div className="chat-list-header">
                <button className="chat-list-header-btn" aria-label="Back">
                    ←
                </button>
                <h2>MESSAGES</h2>
                <div className="chat-list-header-actions">
                    <button className="chat-list-header-btn" aria-label="Search">
                        🔍
                    </button>
                    <button className="chat-list-header-btn" aria-label="New message">
                        ＋
                    </button>
                </div>
            </div>

            {/* Sub header */}
            <div className="chat-list-subheader">
                <span>NEWEST FIRST</span>
                <button className="chat-list-header-btn" aria-label="Filter">
                    ⇅
                </button>
            </div>

            {/* Filter pills */}
            <div className="chat-list-filters" style={{ height: "60px" }} >


                {filters.map((f) => (
                    <button
                        key={f.key}
                        className={`chat-filter-pill ${activeFilter === f.key ? 'active' : ''
                            }`}
                        onClick={() => setActiveFilter(f.key)} style={{ position: "relative" }}
                    >
                        {f.count != null && (<div style={{ position: "absolute", right: 0, top: "-11px", background: "#0c7ee2", zIndex: "1", height: "15px", width: "24px", fontSize: "10px", borderRadius: "5px", display: "flex", alignItems: "flex-end", justifyContent: "center", fontWeight: "bold" }} align="center">
                            {f.count}
                        </div>)}

                        <span>{f.label}</span>
                        {/*f.count != null && (
                            <span className="chat-filter-count">{f.count}</span>
                        )*/}
                    </button>
                ))}
                <button className="chat-filter-pencil" aria-label="Edit">
                    ✎
                </button>
            </div>

            {/* Conversation list */}
            <div className="chat-list-items">
                {users.map((user) => (
                    <button
                        key={user.id}
                        className={`chat-list-row ${selectedUserId === user.id ? 'active' : ''
                            }`}
                        onClick={() => {
                            //  console.log(isChatOpen);
                            if (isChatOpen) {
                                navigate(`/chat/${btoa(user.id)}`, { replace: true });
                            }
                            else {
                                navigate(`/chat/${btoa(user.id)}`, { replace: true });
                                // onSelectUser(user);
                            }
                        }}
                    >
                        <div className="chat-list-row-avatar-wrap">
                            <img
                                src={(user.image) ? "https://carried-overturn-joystick.ngrok-free.dev" + user.image : '/img/avatar.jpg'}
                                alt={user.username}
                                className="chat-list-row-avatar"
                            />
                            {user.online && <span className="chat-list-row-online" />}
                        </div>

                        <div className="chat-list-row-body">
                            <div className="chat-list-row-top">
                                <span className="chat-list-row-name">
                                    {user.name}
                                    {user.verified && (
                                        <span className="chat-list-row-verified">
                                            {' '}✓
                                        </span>
                                    )}
                                    <span className="chat-list-row-username">
                                        {' '}@{user.username}
                                    </span>
                                </span>
                                <span className="chat-list-row-time">10:21 pm</span>
                            </div>
                            <div className="chat-list-row-bottom">
                                <span className="chat-list-row-preview">
                                    <span className="chat-list-row-media-icon">▣</span>{' '}
                                    {user.bio}
                                </span>
                                <span className="chat-list-row-unread" />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatList;