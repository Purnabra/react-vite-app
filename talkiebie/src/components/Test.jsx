import React from 'react';
//import fixWebmDuration from "fix-webm-duration";
const Test = () => {

    const streamRef = React.useRef(null);
    const el = React.useRef(null);
    const audioChunk = React.useRef([]);
    const audioRef = React.useRef([]);
    const startTime = React.useRef(0);
    const [audioStyle, setAudioStyle] = React.useState("none");
    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream; // 👈 ADDED
            el.current = new MediaRecorder(stream, { mimeType: "audio/webm; codecs=opus" });
            el.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    // console.log(e.data);
                    audioChunk.current.push(e.data);
                }
            }
            el.current.onstart = () => {
                startTime.current = Date.now();
                console.log('recorder started')
            }
            el.current.onstop = () => {
                var duration = Date.now() - startTime.current;
                console.log(duration);
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                    streamRef.current = null;
                }

                const buggyblob = new Blob(audioChunk.current, { type: 'audio/webm' });

                fixWebmDuration(buggyblob, duration).then(fixedBlob => {

                    console.log(fixedBlob);
                    const audioUrl = URL.createObjectURL(fixedBlob);

                    audioRef.current.src = audioUrl;
                    setAudioStyle("block");

                });
                audioChunk.current = [];
                console.log('recorder stopped');
            };

        } catch (err) {
            console.log(err);
        }
    }



    React.useEffect(() => {

        startRecording();




    }, [])

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", height: "500px", width: "100%", backgroundColor: "white" }}>
                <audio ref={audioRef} style={{ display: audioStyle }} controls></audio>
                <button style={{ padding: "10px", border: "1px solid black" }} onClick={() => el.current.start(250)}>Play</button>
                <button style={{ padding: "10px", border: "1px solid black" }} onClick={() => el.current.stop()}>Stop</button>
            </div >


        </>
    )


}


export default Test;