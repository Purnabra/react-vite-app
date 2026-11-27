import React from 'react'
import { useParams } from "react-router-dom";
import AllConnection from '../context/AllConnection';
const ConvFooter = ({ html, setHtml, footer, setFooter, setAudio, loginId, chatId }) => {
    // console.log(scrollEl.current)

    // console.log(footer);
    const [iconChange, setIconChange] = React.useState(false);
    const el = React.useRef(null);

    const connarr = React.useRef([]);
    const { connmap, socket, manualclose, socketReady, scrollEl } = React.useContext(AllConnection);
    const flag = React.useRef(false);
    //  const params = useParams();
    //  const chatId = parseInt(atob(params.id));
    // let logged_user = localStorage.getItem('loggedUser');

    const refChatbox = React.useRef(null);

    // logged_user = JSON.parse(logged_user);
    // const loginId = parseInt(logged_user["sub"]);
    const storeMessage = (html) => {
        localStorage.setItem(`chat_${loginId}_${chatId}`, JSON.stringify(html));
    }


    const handleScroll = (e) => {
        // console.log(scrollEl.current.clientHeight)
        // console.log(el);
        (el.current.value.trim() === '') ? setIconChange(false) : setIconChange(true)

        refChatbox.current.style.height = "45px";
        refChatbox.current.style.height = `${el.current.scrollHeight}px`;
    }

    const sendMessage = (e) => {

        e.preventDefault();
        const message = el.current.value.trim();
        const inputObj = { chatId, loginId, type: "message", message };
        const time = Date.now();
        if (message !== '') {


            //  console.log(iconChange);
            socket.current.send(JSON.stringify(inputObj));
            //  const new_html = [...html, { type: "sender", message, time }];



            setHtml(prev => {
                const new_html = [...prev, { type: "sender", message, time }];
                storeMessage(new_html);

                //  console.log(scrollEl.current.scrollHeight);

                return new_html;
            });

        }
        el.current.value = '';
        el.current.focus();
        setIconChange(false);

        handleScroll(el.current);

        //  console.log(document.getElementById('scrollEl').scrollHeight);
        /*   setTimeout(() => {
               scrollEl.current.scrollTop = scrollEl.current.scrollHeight;
           }, 0);*/
    }

    /*const connectwebsocket = () => {


        manualclose.current = false;
        const connect = `chat_${loginId}_${chatId}`;
        let webSocket;
        if (!connmap.current.has(connect)) {

            // console.log('hello chat');
            webSocket = new WebSocket('ws://carried-overturn-joystick.ngrok-free.dev');




            webSocket.onopen = () => {
                console.log("WebSocket connected");
                if (!connmap.current.has(connect)) {
                    connmap.current.set(connect, webSocket);
                }
                webSocket.send(JSON.stringify({ chatId, loginId, type: "register", message: "handshake" }))
            };
        }





        socket.current = (!connmap.current.has(connect)) ? webSocket : connmap.current.get(connect);

        //  if (socket.current === null) return;

        socket.current.onmessage = (event) => {


            // console.log(typeof event.data);
            // console.log(event.data);
            //  console.log(event.data)
            console.log(event.data);
            const message = JSON.parse(event.data);
            if (message.type === 'message') {
                setHtml(prev => {
                    const new_html = [...prev, { type: "receiver", message: message.message, time: message.time }];
                    storeMessage(new_html);
                    return new_html;
                });
            }
            else if (message.type === 'offlinemessage') {
                setHtml(prev => {
                    const new_html = [...prev, ...message.data];
                    storeMessage(new_html);
                    return new_html;
                });
            }
            else if (message.type === 'audio') {


                setHtml(prev => {
                    const new_html = [...prev, { type: message.mode, mode: "audio", message: message.token, time: message.time }];
                    storeMessage(new_html);
                    return new_html;
                });

            }
        }
        socket.current.onclose = () => {
            // console.log('client disconnected');

            // console.log(connmap.current.get(connect));
            // console.log(socket.current);
            if (connmap.current.get(connect) === socket.current) {

                console.log(`${connect} : client disconnected`)
                connmap.current.delete(connect);
            }
            console.log(manualclose.current);
            if (!manualclose.current) {

                setTimeout(() => {

                    console.log('reconnecting socket');
                    connectwebsocket();

                }, 3000)


            }


            if (manualclose.current) {
                connmap.current.forEach((ws, key) => {
                    if (ws.readyState === WebSocket.OPEN ||
                        ws.readyState === WebSocket.CONNECTING) {
                        ws.close();
                    }
                })
                connmap.current.clear();


            }
            socket.current = null
        }

        socket.current.onerror = (error) => {
            console.log(error);
            if (connmap.current.get(connect) === socket.current) {
                connmap.current.delete(connect);
            }

            manualclose.current = true;
            socket.current = null
            // reject(error);
        };

    }*/
    React.useEffect(() => {
        if (localStorage.getItem(`chat_${loginId}_${chatId}`)) {
            setHtml(prev => ([...prev, ...JSON.parse(localStorage.getItem(`chat_${loginId}_${chatId}`))]));
        }
        return () => {
            setHtml([]);
        };

    }, [chatId])

    React.useEffect(() => {
        //  console.log('hello socket')


        if (socketReady && socket.current.readyState === 1) {
            socket.current.send(JSON.stringify({ chatId, loginId, type: "register", message: "handshake" }))
            //  console.log(socket.current);
        }

        //console.log(socket.current);
        //socket.current.send(JSON.stringify({ chatId, loginId, type: "register", message: "handshake" }))


        /*
                const handleBeforeUnload = () => {
        
                    if (socket.current === null) return;
                    if (
                        socket.current.readyState === WebSocket.OPEN ||
                        socket.current.readyState === WebSocket.CONNECTING
                    ) {
                        manualclose.current = true;
                        console.log('dist1');
                        socket.current.close();
                    }
                };
        */
        // window.addEventListener("beforeunload", handleBeforeUnload);







    }, [socketReady, chatId]);


    //  console.log(iconChange);

    return (


        <div style={{ display: footer }} ref={refChatbox} className="footerConv">



            <textarea
                placeholder="Message"
                id="msg"
                ref={el}
                className='convmessageInput'
                onChange={handleScroll}


            ></textarea>

            <div
                style={{
                    width: "10%",
                    height: "100%",
                    background: "rgba(85, 85, 85, 1)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "left",
                    borderRadius: "0 0 0 0",
                    cursor: "pointer",
                    flexShrink: 0,
                    padding: "5px"
                }}
            >
                <img
                    src="/img/icons8-attach-100.png"
                    alt="Attach"
                    style={{
                        width: "28px",
                        height: "28px",
                        objectFit: "contain",
                        opacity: "0.8",
                        cursor: "not-allowed",
                        filter: "brightness(0) invert(1)"
                    }}
                />
            </div>


            <div
                style={{
                    width: "10%",
                    height: "100%",
                    background: "rgba(85, 85, 85, 1)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "left",

                    cursor: "pointer",
                    flexShrink: 0,
                    padding: "5px"
                }}
            >
                {(iconChange) ? <img src="/img/send.png" alt="" style={{
                    width: "35px",

                    objectFit: "contain",
                }} onClick={sendMessage} /> : <img src="/img/voice.png" alt="" style={{
                    width: "35px",

                    objectFit: "contain",
                }} onClick={() => { setFooter('none'); setAudio(true); }} />}



            </div>

            {/*<input type='text' name="message" id="message" placeholder='Enter the message' style={{ borderRadius: "8px", border: "none", outline: "none", padding: "5px" }} /> */}
        </div>










    )
}

export default ConvFooter