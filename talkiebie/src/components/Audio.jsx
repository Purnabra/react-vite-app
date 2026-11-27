import React from 'react'
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import AllConnection from '../context/AllConnection';

const Audio = (props) => {
    const { socket, el } = React.useContext(AllConnection);


    const streamRef = React.useRef(null);   // 👈 ADDED
    const videoRef = React.useRef(null);
    const isRecording = React.useRef(false);
    const audioChunk = React.useRef([]);
    const isReconnecting = React.useRef(false);
    const audioToken = React.useRef(null);
    const isSend = React.useRef(false);
    const params = useParams();
    const chatId = parseInt(atob(params.id));
    let logged_user = localStorage.getItem('loggedUser');

    const permissionstate = React.useRef(false);

    logged_user = JSON.parse(logged_user);
    const loginId = parseInt(logged_user["sub"]);

    const [pause, setPause] = React.useState(true);


    React.useEffect(() => {

        console.log(uuid())
        audioToken.current = uuid();
        async function startRecording() {

            try {
                //   console.log(audioToken.current);
                // console.log(navigator.mediaDevices);
                //console.log(loginId);
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

                //  console.log(stream);
                streamRef.current = stream; // 👈 ADDED

                el.current = new MediaRecorder(stream, { mimeType: "audio/webm; codecs=opus" });


                // console.log(el.current);

                el.current.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        audioChunk.current.push(e.data);
                        // console.log(e.data);
                        socket.current.send(e.data);
                        // console.log(isReconnecting.current)
                        /* if (socket.current && !isReconnecting.current) {
                             // isReconnecting.current = true;
                             console.log(audioToken.current);
                            
                         }
                         else {
                             isReconnecting.current = true;
                             if (socket.current) {
                                 audioChunk.current.push(e.data);
                             
 
                                 socket.current.send(JSON.stringify({ loginId, chatId, type: "audio-resume", message: "you are resuming the audio", token: audioToken.current,binarydata: }));
                                 isReconnecting.current=false;
 
                             } else {
 
                                 audioChunk.current.push(e.data);
                             }
 
 
                             //console.log()
 
                         }*/

                        // start++;
                    }
                };

                el.current.onstart = () => {
                    audioChunk.current = [];
                    //  console.log(fixWebmDuration)
                    if (isRecording.current) return;

                    isRecording.current = true;
                    console.log('recorder started')


                    socket.current.send(JSON.stringify({ loginId, chatId, type: "audio-start", message: "you are recording the audio", token: audioToken.current }));



                }

                el.current.onstop = () => {

                    isRecording.current = false;

                    if (streamRef.current) {
                        streamRef.current.getTracks().forEach(track => track.stop());
                        streamRef.current = null;
                    }


                    /*   fixWebmDuration.default(
                           new Blob(audioChunk.current, { type: 'audio/webm' })).then((fixBlob) => {
                               console.log(fixBlob);
                               console.log(URL.createObjectURL(fixBlob));
                               audioChunk.current = [];
                           })
   
                       /*  const blobobj = new Blob(audioChunk.current, { type: 'audio/webm; codecs=opus' })
     
                         console.log(blobobj);*/


                    //   isSend.current=true;

                    if (isSend.current) {
                        socket.current.send(JSON.stringify({ chatId: chatId, type: "audio-end", message: "you ended the audio" }))


                    } else {

                        socket.current.send(JSON.stringify({ type: "audio-terminate", message: "you terminated the audio" }))

                    }


                    console.log('recorder stopped');
                };

                if (permissionstate.current) {
                    el.current.start(250);

                    //console.log(el.current);
                }

            } catch (err) {

                console.log(err);


            }



        }



        navigator.permissions
            .query({ name: "microphone" })
            .then((permissionStatus) => {
                //  console.log(`geolocation permission state is ${permissionStatus.state}`);

                //   console.log(permissionStatus)
                permissionStatus.onchange = () => {

                    console.log(permissionStatus.state)
                    if (permissionStatus.state == 'granted') {
                        permissionstate.current = true;
                    }
                    else {
                        permissionstate.current = false;
                        if (permissionStatus.state == 'denied') {


                            props.setFooter("flex"); props.setAudio(false)

                        }

                    }
                }
                if (permissionStatus.state == 'granted') {
                    permissionstate.current = true;
                }
                else {
                    permissionstate.current = false;

                    if (permissionStatus.state == 'denied') {


                        props.setFooter("flex"); props.setAudio(false)

                    }
                }


                startRecording();
            });
        return () => {


            if (el.current) { el.current.stop(); }
            props.setFooter("flex"); props.setAudio(false)

        }
    }, [])




    return (
        <>

            <div style={{
                width: "100%", height: "100px", marginBottom: "5px", zIndex: "100", background: "black", borderRadius: "10px 10px 0px 0px", position: " absolute", bottom: 0

            }} >
                <div style={{ height: "40px", width: "100%", color: "white" }}><audio ref={videoRef} autoPlay controls style={{ display: 'none' }}></audio>


                    <div className="wave recording" id="wave" >
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>


                </div>

                <div style={{ width: "100%", height: "60px", padding: "5px", display: "flex", alignItems: "center", gap: "5px" }}>


                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50px",
                        height: "50px",
                        backgroundColor: "rgba(225, 107, 121, 0.2)",
                        borderRadius: "50%",
                        color: "#f00a06ff",
                        cursor: "pointer",
                        userSelect: "none",
                        WebkitUserSelect: "none"

                    }} onClick={() => {
                        // 👈 stop recorder + release mic
                        if (el.current && el.current.state !== 'inactive') {
                            el.current.stop();

                            isSend.current = false;

                        }
                        /* if (streamRef.current) {
                             streamRef.current.getTracks().forEach(track => track.stop());
                           
                         }*/
                        props.setFooter("flex"); props.setAudio(false)
                    }}>


                        <svg viewBox="0 0 24 24" height="28" width="28" fill="currentColor">
                            <title>ic-delete</title>
                            <path
                                fill="currentColor"
                                d="M7 21c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V6a.97.97 0 0 1-.71-.29A.97.97 0 0 1 4 5c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29h4c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29h4c.28 0 .52.1.71.29.2.19.29.43.29.71h4c.28 0 .52.1.71.29.2.19.29.43.29.71 0 .28-.1.52-.29.71A.94.94 0 0 1 19 6v13c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H7ZM17 6H7v13h10V6Zm-7 11c.28 0 .52-.1.71-.29.2-.19.29-.43.29-.71V9c0-.28-.1-.52-.29-.71A.97.97 0 0 0 10 8c-.28 0-.52.1-.71.29A.94.94 0 0 0 9 9v7c0 .28.1.52.29.71.19.2.43.29.71.29Zm4 0c.28 0 .52-.1.71-.29.2-.19.29-.43.29-.71V9c0-.28-.1-.52-.29-.71A.97.97 0 0 0 14 8c-.28 0-.52.1-.71.29A.94.94 0 0 0 13 9v7c0 .28.1.52.29.71.19.2.43.29.71.29Z"
                            />
                        </svg>
                    </div>
                    <div style={{
                        width: "80%", height: "100%", padding: "15px", background: "rgba(225, 107, 121, 0.2)", borderRadius: "10px", fontWeight: "bold", color: "white", display: "flex", alignItems: "center",
                        justifyContent: "center", gap: "3px", cursor: "pointer", userSelect: "none", WebkitUserSelect: "none"
                    }} align="center" onClick={() => {
                        setPause(prev => {
                            if (prev) {
                                if (el.current) { el.current.stop(); }




                            } return !prev
                        });
                    }}>


                        {(pause) ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="25"
                            height="25" fill="white"><path d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z" /></svg> : <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                                width="30"
                                height="30"
                                fill="#ffffff"
                            >
                            <path d="M320 64C267 64 224 107 224 160L224 288C224 341 267 384 320 384C373 384 416 341 416 288L416 160C416 107 373 64 320 64zM176 248C176 234.7 165.3 224 152 224C138.7 224 128 234.7 128 248L128 288C128 385.9 201.3 466.7 296 478.5L296 528L248 528C234.7 528 224 538.7 224 552C224 565.3 234.7 576 248 576L392 576C405.3 576 416 565.3 416 552C416 538.7 405.3 528 392 528L344 528L344 478.5C438.7 466.7 512 385.9 512 288L512 248C512 234.7 501.3 224 488 224C474.7 224 464 234.7 464 248L464 288C464 367.5 399.5 432 320 432C240.5 432 176 367.5 176 288L176 248z" />
                        </svg>}





                        <div style={{ letterSpacing: "1px", fontSize: "18px" }}>{(pause) ? "Pause" : "Resume"}</div>


                    </div>

                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            backgroundColor: "#089814ff",
                            border: "2px solid #089814ff",
                            cursor: "pointer",
                            userSelect: "none",
                            WebkitUserSelect: "none"
                        }}


                        onClick={() => {


                            if (el.current && el.current.state !== 'inactive') {
                                isSend.current = true;
                                el.current.stop();

                                //  socket.current.send(JSON.stringify({ chatId: chatId, type: "audio-end", message: "you ended the audio" }))
                            }
                            if (streamRef.current) {
                                streamRef.current.getTracks().forEach(track => track.stop());
                                streamRef.current = null;
                            }
                            props.setFooter("flex"); props.setAudio(false)

                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            height="24"
                            width="24"
                            preserveAspectRatio="xMidYMid meet"
                            fill="#4caf50"
                        >
                            <title>ic-send-filled</title>
                            <path
                                fill="currentColor"
                                d="M4.4 19.43a.99.99 0 0 1-.95-.1.93.93 0 0 1-.45-.83V14l8-2-8-2V5.5c0-.37.15-.65.45-.84a1 1 0 0 1 .95-.09l15.4 6.5c.42.19.63.5.63.93 0 .43-.21.74-.63.93l-15.4 6.5Z"
                            />
                        </svg>
                    </div>




                </div>


                {/*<button onClick={() => el.current.start()}>Start Recording</button>
                <button onClick={() => el.current.stop()}>Stop Recording</button>
                <audio controls ref={videoRef}></audio>*/}
            </div>

        </>
    )
}

export default Audio