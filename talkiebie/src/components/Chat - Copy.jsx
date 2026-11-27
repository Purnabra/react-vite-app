import React, { useContext, useState, useEffect, useRef } from 'react';
import AppContext from '../context/AppContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import AllConnection from '../context/AllConnection';


import { useParams } from "react-router-dom";

import Content from './Content';
import { creators } from '../data/creators';

import "../assets/css/Chat.css";

const Chat = () => {
    const [users, setUsers] = useState([]);
    const params = useParams();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isChatLoading, setIsChatLoading] = useState(true);
    let logged_user = localStorage.getItem('loggedUser');
    logged_user = JSON.parse(logged_user);


    let chatId = null
    if (params.id) {
        chatId = parseInt(atob(params.id));
    }

    const loginId = parseInt(logged_user["sub"]);
    // console.log(isChatOpen);

    const { connmap, manualclose, socket, setHtml, setSocketReady, el } = useContext(AllConnection);
    //  console.log(data);



    const [selectedUser, setSelectedUser] = useState(null);


    const storeMessage = (html) => {
        localStorage.setItem(`chat_${loginId}_${chatId}`, JSON.stringify(html));
    }

    const handleCloseConnection = () => {
        /* connmap.current.forEach((ws, key) => {
          
         })*/


        if (el.current) { el.current.stop(); }
        if (socket.current.readyState === WebSocket.OPEN ||
            socket.current.readyState === WebSocket.CONNECTING) {
            socket.current.close();
        }

        manualclose.current = true;
        // connmap.current.clear();

    }




    const connectwebsocket = () => {

        let webSocket;


        if (window.isSecureContext) {
            webSocket = new WebSocket('wss://carried-overturn-joystick.ngrok-free.dev');
        } else {
            webSocket = new WebSocket('ws://carried-overturn-joystick.ngrok-free.dev');
        }


        webSocket.onopen = () => {
            console.log("WebSocket connected");

            setSocketReady(true);

        };
        //  }

        socket.current = webSocket;


        socket.current.onmessage = (event) => {

            const message = JSON.parse(event.data);
            if (message.type === 'message') {

                chatId = message.chatId;
                setHtml(prev => {
                    const new_html = [...prev, { type: "receiver", message: message.message, time: message.time }];
                    storeMessage(new_html);
                    return new_html;
                });
            }
            else if (message.type === 'offlinemessage') {
                chatId = message.chatId;
                setHtml(prev => {
                    const new_html = [...prev, ...message.data];
                    storeMessage(new_html);
                    return new_html;
                });

            }
            else if (message.type === 'audio') {
                chatId = message.chatId;

                setHtml(prev => {
                    const new_html = [...prev, { type: message.mode, mode: "audio", message: message.token, time: message.time }];
                    storeMessage(new_html);
                    return new_html;
                });

            }
        }
        socket.current.onclose = () => {
            console.log('client disconnected');


            // console.log(connmap.current.get(connect));
            // console.log(socket.current);
            /*  if (connmap.current.get(connect) === socket.current) {
  
                  console.log(`${connect} : client disconnected`)
                  connmap.current.delete(connect);
              }*/

            console.log(manualclose.current);
            if (!manualclose.current) {

                setTimeout(() => {

                    console.log('reconnecting socket');
                    connectwebsocket();

                }, 3000)


            }


            /*if (manualclose.current) {
                connmap.current.forEach((ws, key) => {
                    if (ws.readyState === WebSocket.OPEN ||
                        ws.readyState === WebSocket.CONNECTING) {
                        ws.close();
                    }
                })
                //  connmap.current.clear();


            }*/
            socket.current = null
        }

        socket.current.onerror = (error) => {
            console.log(error);
            /*  if (connmap.current.get(connect) === socket.current) {
                  connmap.current.delete(connect);
              }
  */
            manualclose.current = true;
            socket.current = null
            // reject(error);
        };



    }


    React.useEffect(() => {
        console.log(params.id)
        console.log(isChatOpen)
        //  console.log(isChatOpen)

        setIsChatLoading(false);
        connectwebsocket();
        // console.log('hello chat');
        fetch(`https://carried-overturn-joystick.ngrok-free.dev/api/user/chat`, {
            method: "GET",
            credentials: "include"
        }).then((resp1) => resp1.json()).then((data) => {
            setUsers(data.data);
            //console.log(data.data);
        }).catch(err => {
            setUsers([]);
        })

        window.addEventListener("pagehide", handleCloseConnection);

        return () => {
            console.log("cleaning WebSocket");
            console.log(connmap.current)
            handleCloseConnection();
            window.removeEventListener("pagehide", handleCloseConnection);


            // console.log(connmap.current)
        }



    }, [])
    return (
        <>


            {!isChatLoading && (!isChatOpen) && (<MountContent users={users} isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} selectedUser={selectedUser} loginId={loginId} chatId={chatId} />)}

            {!isChatLoading && params.id !== undefined && isChatOpen && (<Content loginId={loginId} chatId={chatId} />)}

            {!isChatLoading && params.id === undefined && isChatOpen && (<MountContent users={users} isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} selectedUser={selectedUser} loginId={loginId} chatId={chatId} />)}



        </>
    );
};



const MountContent = ({ users, isChatOpen, setIsChatOpen, selectedUser, loginId, chatId }) => {

    const {
        activeTab,
        setActiveTab,
        sidebarOpen,
        setSidebarOpen,
        subscribedIds
    } = useContext(AppContext);
    return (<>



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
                        <ChatList
                            selectedUserId={selectedUser?.id}


                            isChatOpen={isChatOpen}
                            users={users}
                        />
                    </div>

                    <div className="creators-column-chat-layout chat-room-pane" style={{ borderRight: "1px solid #282828", background: "#0f0f0f", height: "100%" }} >


                        {<Content loginId={loginId} chatId={chatId} />}
                    </div>
                    <div style={{ width: "40px", background: "#0f0f0f" }}></div>
                </main>


            </div>
        </div>



    </>)




}
export default Chat;