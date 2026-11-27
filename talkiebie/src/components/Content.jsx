import React from 'react'
import ConvMessage from "./ConvMessage";
import ConvHeader from "./ConvHeader";
import ConvFooter from "./ConvFooter";

import { useParams } from "react-router-dom";
import AllConnection from '../context/AllConnection';
import Audio from "./Audio";
const Content = ({ loginId, chatId }) => {
    const params = useParams();
    const [connect, setConnect] = React.useState(null);






    /*
        React.useEffect(() => {
            if (!chatId) {
                return;
            }
            setConnect(`chat_${loginId}_${chatId}`);
        }, [chatId, loginId])
    */

    const { html, setHtml, socket, scrollEl } = React.useContext(AllConnection);

    const socketReady = React.useRef(null);
    const [audio, setAudio] = React.useState(false);
    const [footer, setFooter] = React.useState("flex");
    const [ws, setWs] = React.useState(null);




    const [leftOptionsDisplay, setLeftOptionsDisplay] = React.useState("none");





    // console.log(params);

    if (!params.id) {



        return (



            <div className="chat-room-empty" style={{ color: "#f0f1f6" }}>
                <h4>Select any Conversation or send a New Message</h4>
                <button className="chat-room-new-msg-btn">NEW MESSAGE</button>
            </div>



        )
    }



    return (
        <div className="conversation" style={{ position: "relative",/* background: "black" */ }}>
            <div style={{ position: "absolute", top: "61px", right: "10px", zIndex: '9999', background: "#3a3636", width: "249px", borderRadius: '6px', color: "white", fontSize: "0.8rem", border: "1px solid #505050", display: leftOptionsDisplay }} >


                <div style={{ width: "100%", height: "50px", borderBottom: "1px solid #505050", padding: "10px", }}>

                    @username



                </div>


                <div style={{ width: "100%", padding: "15px", }}>

                    Copy Link To Profile



                </div>


                <div style={{ width: "100%", padding: "15px", borderBottom: "1px solid #505050" }}>

                    Rename User



                </div>


                <div style={{ width: "100%", padding: "15px", }}>

                    Block



                </div>

                <div style={{ width: "100%", padding: "15px", }}>

                    Report



                </div>

            </div>

            <ConvHeader setLeftOptionsDisplay={setLeftOptionsDisplay} />
            {<ConvMessage html={html} />}
            <ConvFooter html={html} setHtml={setHtml} footer={footer} setFooter={setFooter} setAudio={setAudio} loginId={loginId} chatId={chatId} />
            {/*audio && <Audio setFooter={setFooter} setAudio={setAudio} setHtml={setHtml} loginId={loginId} chatId={chatId} />*/}
        </div>
    )
}
export default Content