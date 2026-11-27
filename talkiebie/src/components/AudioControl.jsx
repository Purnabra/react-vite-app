import React from 'react';

//import fixWebmDuration from "fix-webm-duration";


const AudioControl = ({ mode, status, audioFileName }) => {

    const volumeRef = React.useRef(null);
    const audioRef = React.useRef(null);
    const volumeBoxWidth = React.useRef(null);
    const audioBoxWidth = React.useRef(null);
    const isdraggingRef = React.useRef(false);
    const isAudioDraggingRef = React.useRef(false);
    const [playState, setPlayState] = React.useState('stopped');
    const audioPlayerControlRef = React.useRef(null);

    const svgIconRef = React.useRef(null);
    let audioContextRef = React.useRef(null);;

    let audioElementRef = React.useRef(null);;
    let sourceRef = React.useRef(null);;;
    let gainNodeRef = React.useRef(null);;
    let durationRef = React.useRef(null);
    const audioPositionRef = React.useRef("0%");
    const [timer, setTimer] = React.useState(0);

    const audioIndicatorRef = React.useRef(null);

    //console.log(status);
    // audioElementRef.current.currentTime = 0;

    //const totalDuration
    // let isdragging = false;
    // let isAudioDragging = false;
    //const [isdragging, setIsDragging] = React.useState(false);

    //const [isAudioDragging, setisAudioDragging] = React.useState(false);
    const [VolumePosition, setVolumePosition] = React.useState(50);
    const [audioPosition, setaudioPosition] = React.useState("0%");
    const [audioIndicatorPos, setAudioIndicatorPos] = React.useState("0%");
    const clickIndicator = () => {




    }




    const volumeOver = (e) => {
        e.preventDefault();
        isdraggingRef.current = true;
        isAudioDraggingRef.current = false;
        // setisAudioDragging(false);

        //console.log(isdragging);
    }
    const audioOver = (e) => {
        e.preventDefault();
        //audioRecordDragging=true;
        //if(state=='playing'){audioRecordDragging=false;}else{audioRecordDragging=true;}

        if (playState == 'playing') { isAudioDraggingRef.current = false; } else { isAudioDraggingRef.current = true; }
        isdraggingRef.current = false;

    }

    const controlMove = (e, tag) => {

        let left;
        if (isdraggingRef.current) {

            //  volumedrag = true;
            e.preventDefault();
            if (tag == 'mobile') {
                left = (e.touches[0].clientX - volumeBoxWidth.current.left >= volumeRef.current.clientWidth) ? volumeRef.current.clientWidth : (e.touches[0].clientX - volumeBoxWidth.current.left);
            }
            else {

                left = (e.clientX - volumeBoxWidth.current.left >= volumeRef.current.clientWidth) ? volumeRef.current.clientWidth : (e.clientX - volumeBoxWidth.current.left);

            }
            left = (left < 0) ? 0 : left;
            setVolumePosition(left);
            const percent = (left / volumeRef.current.clientWidth);


            //console.log(percent.toFixed(1));

            if (percent >= .5) {

                svgIconRef.current.children[2].style.display = "none";
                svgIconRef.current.children[1].style.display = "none";
                svgIconRef.current.children[0].style.display = "";


            }
            else if (percent < .5 && percent > 0) {
                svgIconRef.current.children[0].style.display = "none";
                svgIconRef.current.children[2].style.display = "none";
                svgIconRef.current.children[1].style.display = "";


            }
            else {
                svgIconRef.current.children[1].style.display = "none";
                svgIconRef.current.children[0].style.display = "none";
                svgIconRef.current.children[2].style.display = "";


            }

            /*  volumePercent = percent * 1;
              gainNode.gain.value = percent * 1;*/
            gainNodeRef.current.gain.value = percent * 1;
        }
        else if (isAudioDraggingRef.current) {

            e.preventDefault();
            if (!durationRef.current) { setaudioPosition(`0%`); return; }


            if (tag == 'mobile') {
                left = (e.touches[0].clientX - audioBoxWidth.current.left >= audioRef.current.clientWidth) ? audioRef.current.clientWidth : (e.touches[0].clientX - audioBoxWidth.current.left);
            }
            else {

                left = (e.clientX - audioBoxWidth.current.left >= audioRef.current.clientWidth) ? audioRef.current.clientWidth : (e.clientX - audioBoxWidth.current.left);

            }
            left = (left < 0) ? 0 : left;
            // audioTime = (left / audioBox.clientWidth) * totalDuration;
            audioPositionRef.current = (left / audioRef.current.clientWidth) * durationRef.current;
            //  let percent = audioTime / totalDuration * 100;
            let percent = left / audioRef.current.clientWidth * 100;
            // audioPositionRef.current = percent;
            // audioControl.style.left = `${percent}%`;
            // audioBox.children[0].style.width = `${percent}%`;



            setaudioPosition(`${percent}%`);

        }




    }


    const audioProgressClick = (e) => {
        e.preventDefault();


        console.log(e.clientX);
        console.log(audioBoxWidth.current.left);
        const left = e.clientX - audioBoxWidth.current.left
        audioPositionRef.current = (left / audioRef.current.clientWidth) * durationRef.current;
        let percent = left / audioRef.current.clientWidth * 100;
        setaudioPosition(`${percent}%`);
        audioElementRef.current.currentTime = audioPositionRef.current;


    }


    const controlEnd = (e) => {
        isdraggingRef.current = false;
        if (isAudioDraggingRef.current) {
            isAudioDraggingRef.current = false;
            console.log(audioPositionRef.current);
            //  console.log(parseInt(audioPosition.split("%")[0]));
            // console.log(audioTime);
            audioElementRef.current.currentTime = audioPositionRef.current;
            //  audioElementRef.current.currentTime = audioTime;

        }

    }

    const play = async () => {

        // Create everything only after user clicks Play


        // Resume AudioContext after user gesture
        if (audioContextRef.current.state === "suspended") {
            await audioContextRef.current.resume();
        }

        await audioElementRef.current.play();

        setPlayState("playing");

        audioPlayerControlRef.current.children[0].style.display = "none";
        audioPlayerControlRef.current.children[1].style.display = "";
    };
    const pause = () => {
        //  console.log(audio);
        setPlayState('paused');
        audioElementRef.current.pause();
        audioPlayerControlRef.current.children[1].style.display = "none";
        audioPlayerControlRef.current.children[0].style.display = "";
    }

    //await play();
    //pause();
    // play().then(() => pause()).catch(err => console.log(err));

    const handleClick = () => {


        // console.log(audioContextRef.current);

        if (playState == 'playing') {

            pause();

        }
        else {
            //  console.log(audio);
            play();

        }



    }

    const indicatorMove = (e) => {
        const left = e.clientX - audioBoxWidth.current.left;
        let percent = left / audioRef.current.clientWidth * 100;
        setAudioIndicatorPos(`${percent}%`)

        //  console.log(percent)
    }




    //console.log('outside');
    React.useEffect(() => {

        //  console.log('hello audio control');
        async function audioc() {

            if (status === 'processing') { return; }

            if (!audioContextRef.current) {

                audioContextRef.current = new AudioContext();

                audioElementRef.current = new Audio();

                audioElementRef.current.crossOrigin = "use-credentials";
                /*
                                const resp = await fetch(audioFileName, { credentials: "include" });
                                const audiof = await resp.blob();
                                console.log(audiof)
                
                                const bb = new Blob([audiof], {
                                    type: 'audio/webm;codecs=opus'
                                })
                                console.log(bb);
                                console.log(URL.createObjectURL(audiof));
                */
                audioElementRef.current.src = audioFileName;

                audioElementRef.current.preload = "auto";

                audioElementRef.current.ontimeupdate = () => {

                    // console.log(audioElementRef.current.currentTime);

                    //audio.currentTime=1;


                    let percent = audioElementRef.current.currentTime / durationRef.current * 100;


                    setaudioPosition(`${percent}%`);

                    setTimer(Math.floor(durationRef.current) - Math.floor(audioElementRef.current.currentTime));






                }

                audioElementRef.current.addEventListener('loadedmetadata', () => {
                    // totalDuration = audioElementRef.current.duration;
                    durationRef.current = audioElementRef.current.duration;
                    /*  console.log("readyState:", audioElementRef.current.readyState);
                      console.log("duration:", audioElementRef.current.duration);
                      console.log("networkState:", audioElementRef.current.networkState);
                      console.log("src:", audioElementRef.current.src);*/
                    setTimer(Math.floor(audioElementRef.current.duration));
                    /*  timer.setAttribute(
                          'data-elapse-timer',
                          Math.floor(totalDuration)
                      );
          
                      timer.textContent =
                          `00:${Math.floor(totalDuration).toString().padStart(2, '0')}`;*/
                });


                audioElementRef.current.onended = () => {
                    setPlayState('stopped');

                    audioPlayerControlRef.current.children[1].style.display = "none";
                    audioPlayerControlRef.current.children[0].style.display = "";

                    audioElementRef.current.currentTime = 0;
                    setTimer(Math.floor(durationRef.current));
                    audioContextRef.current.suspend();

                }

                sourceRef.current =
                    audioContextRef.current.createMediaElementSource(
                        audioElementRef.current
                    );

                gainNodeRef.current =
                    audioContextRef.current.createGain();
                gainNodeRef.current.connect(
                    audioContextRef.current.destination
                );
                sourceRef.current.connect(gainNodeRef.current);



                gainNodeRef.current.gain.value = 1;


                audioElementRef.current.currentTime = 0;



            }




        }



        audioc();




        volumeBoxWidth.current = volumeRef.current.getBoundingClientRect();
        audioBoxWidth.current = audioRef.current.getBoundingClientRect();


        document.addEventListener("mousemove", (e) => controlMove(e, ''));
        document.addEventListener("touchmove", (e) => controlMove(e, 'mobile'));
        document.addEventListener('mouseup', controlEnd);
        document.addEventListener('touchend', controlEnd)
    }, [status])
    //backgroundImage: (mode == 'sender') ? "linear-gradient(0deg, rgba(0, 175, 240, .12), rgba(0, 175, 240, .12))" : "linear-gradient(0deg, rgba(251, 251, 251, 0.12), rgba(251, 251, 251, 0.12))"
    //background-image: linear-gradient(0deg, rgba(251, 251, 251, 0.12), rgba(250, 249, 249, 0.12));

    return (
        <div className={(status === 'processing') ? "backdropAudioControlFilter" : "backdropAudioControlFilterRemove"}>
            <div className="audioControls-container" style={{ pointerEvents: (status === 'processing') ? 'none' : 'auto', cursor: (status === 'processing') ? 'not-allowed' : 'pointer', backgroundImage: (mode == 'sender') ? "linear-gradient(0deg, rgba(0, 175, 240, .12), rgba(0, 175, 240, .12))" : "linear-gradient(0deg, rgba(251, 251, 251, 0.12), rgba(251, 251, 251, 0.12))" }} >
                <div style={{}} onMouseMove={indicatorMove} onMouseLeave={(e) => {

                    setAudioIndicatorPos(`0%`);
                }} onClick={audioProgressClick} className='progressbarBox' >
                    <div id="audioContainer" ref={audioRef}  >
                        <div style={{ width: audioPosition, zIndex: 1 }} ></div>

                        <div ref={audioIndicatorRef} style={{ position: "absolute", height: "100%", width: audioIndicatorPos, background: "#66686bff", zIndex: 0 }}  ></div>
                        <div id="audioControl" onMouseDown={audioOver} onTouchStart={audioOver} style={{ left: audioPosition }}></div>
                    </div>
                </div>
                <div className="playerButton">

                    <div id="audioPlayerControl" ref={audioPlayerControlRef} onClick={handleClick}  >

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height="20" width="20" fill="#1482d1"  ><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z" /></svg>


                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height="21" width="21" style={{ display: "none" }} fill="#1482d1" ><path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z" /></svg>

                    </div>







                    <div id="svgiIcon" ref={svgIconRef}>


                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="25" width="25" fill="#1482d1" ><path d="M320 480l-53.3 0c-13.8 0-27.3-4.5-38.4-12.8L117.3 384 64 384C30.9 384 3.6 358.8 .3 326.5L0 320 0 192c0-35.3 28.7-64 64-64l53.3 0 110.9-83.2C239.4 36.5 252.8 32 266.7 32l53.3 0 0 448zM384 34.3C492.6 49.8 576 143.2 576 256S492.6 462.2 384 477.7l0-56.7c77.5-14.9 136-83.1 136-165S461.5 106 384 91l0-56.8zM147.2 185.6l-8.5 6.4-74.7 0 0 128 74.7 0 8.5 6.4 108.8 81.6 0-304-108.8 81.6zM384 132c55.2 14.2 96 64.3 96 124s-40.8 109.8-96 124l0-59.4c23.7-11.8 40-36.3 40-64.5s-16.3-52.7-40-64.5l0-59.5z" /></svg>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="25" width="25" style={{ display: "none" }} fill="#1482d1"  ><path d="M320 480l-53.3 0c-13.8 0-27.3-4.5-38.4-12.8L117.3 384 64 384C30.9 384 3.6 358.8 .3 326.5L0 320 0 192c0-35.3 28.7-64 64-64l53.3 0 110.9-83.2C239.4 36.5 252.8 32 266.7 32l53.3 0 0 448zM147.2 185.6l-8.5 6.4-74.7 0 0 128 74.7 0 8.5 6.4 108.8 81.6 0-304-108.8 81.6zM384 132c55.2 14.2 96 64.3 96 124s-40.8 109.8-96 124l0-59.4c23.7-11.8 40-36.3 40-64.5s-16.3-52.7-40-64.5l0-59.5z" /></svg>



                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="25" width="25" style={{ display: "none" }} fill="#1482d1"><path d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-249-249 0-187.3c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L179.8 114 41-24.9zM90.2 160L80 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8L320 389.8 90.2 160zm349.1-49.6c-8.4 10.3-6.8 25.4 3.5 33.8 32.5 26.4 53.2 66.7 53.2 111.8 0 33-11.1 63.4-29.8 87.7l34.2 34.2c27.2-33.1 43.6-75.6 43.6-121.9 0-60.1-27.7-113.8-70.9-149-10.3-8.4-25.4-6.8-33.8 3.5zM396.5 274l35.3 35.3c10.2-15.2 16.2-33.6 16.2-53.3 0-30.1-13.9-56.9-35.5-74.5-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8c10.9 8.8 17.7 22.2 17.7 37.3 0 6.4-1.2 12.4-3.5 18z" /></svg>
                    </div>




                    <div id="volumeContainer" ref={volumeRef}>
                        <div style={{ width: VolumePosition }}></div>
                        <div id="volumeControl" onMouseDown={volumeOver} onTouchStart={volumeOver} style={{ left: VolumePosition }}></div>

                    </div>
                    <div style={{ width: "5px" }}></div>

                    <div id="timer" style={{ fontWeight: "bold", letterSpacing: "2px", color: "white" }} data-elapse-timer="0">-{parseInt(timer / 60)}:{timer % 60}</div>


                </div>

            </div >
        </div>



    )
}

export default AudioControl