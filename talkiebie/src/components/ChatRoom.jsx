import React, { useState, useEffect, useRef } from 'react';

const ChatRoom = ({ selectedUser, messages = [], onSendMessage }) => {
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        onSendMessage?.(inputValue.trim());
        setInputValue('');
    };

    // Empty state — matches OnlyFans
    if (!selectedUser) {
        return (
            <div className="chat-room-empty">
                <h4>Select any Conversation or send a New Message</h4>
                <button className="chat-room-new-msg-btn">NEW MESSAGE</button>
            </div>
        );
    }


};

export default ChatRoom;