import React from 'react'
import AudioControl from "./AudioControl";
import AllConnection from '../context/AllConnection';
const ConvMessage = ({ html }) => {
    const { scrollEl } = React.useContext(AllConnection);
    const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' });
    //  console.log(html);
    // console.log(scrollEl.current)

    React.useEffect(() => {
        setTimeout(() => {
            scrollEl.current.scrollTop = scrollEl.current.scrollHeight;
        }, 0);



    }, [html])

    return (
        <div className="convemessages" style={{ background: "#0f0f0f", scrollbarWidth: "none" }} id="scrollEl" ref={scrollEl} >
            <div className="dateofm middle">
                <p>2022/11/03</p>
            </div>
            {/*  <div className="middle">
                <p><img src="./img/missed-video-call_118917.png" alt="" /> Appel vocal manqué à 12:24 PM</p>
            </div>*/}


            {html.map((item, index) => {
                if (item.type === 'sender') {


                    //    if (item.mode == 'audio') { console.log(item.status); }
                    // console.log();

                    return <div key={index} className="senderContainer arrowm">
                        <div className="sender mepop">

                            {(item.mode == 'audio') ? <AudioControl mode={"sender"} status={item.status} audioFileName={`https://carried-overturn-joystick.ngrok-free.dev/uploads/${item.message}-final.webm`} /> : <div className="thereply">
                                <p>{item.message}</p>
                                <div className="time">
                                    <p>{formatter.format(new Date(item.time))}</p>
                                </div>

                                <div className="react rightr">
                                    <img src="/img/icons8-happy-96.png" alt="" />
                                </div>




                            </div>}

                        </div>

                    </div>
                }
                else if (item.type === 'receiver') {

                    return <div key={index} className="receiverContainer arrowm">
                        <div className="reciver mepop">


                            {(item.mode == 'audio') ? <AudioControl mode={"receiver"} status={item.status} audioFileName={`https://carried-overturn-joystick.ngrok-free.dev/uploads/${item.message}-final.webm`} /> : <div className="thereply">
                                <p>{item.message}</p>
                                <div className="time">
                                    <p>{formatter.format(new Date(item.time))}</p>
                                </div>
                                {/*<div className="emoji">
                                    <img src="/img/1000522-new-thinking-emoji-free-icon-hq.png" alt="" />
                                </div>*/}

                                <div className="react leftr">
                                    <img src="/img/icons8-happy-96.png" alt="" />
                                </div>
                            </div>}
                        </div>
                    </div>

                }


            })}

        </div>
    )
}

export default ConvMessage