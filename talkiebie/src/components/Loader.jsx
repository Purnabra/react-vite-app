import React, { useRef, useEffect } from 'react';
import loader from "../assets/loader.json";
const Loader = () => {
    const lottieRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        animationRef.current = lottie.loadAnimation({
            container: lottieRef.current,

            renderer: 'svg',

            loop: true,

            autoplay: true,

            animationData: loader
        });
        return () => {
            animationRef?.current.destroy();
        }
    }, []);


    function playAnimation() {
        animationRef.current.play();
    }
    function pauseAnimation() {
        animationRef.current.pause();
    }
    function stopAnimation() {
        animationRef.current.stop();
    }

    return (
        <>
            {(<div className='loader-container' style={{ position: "absolute", zIndex: "5", width: "100%", height: "100%" }}>
                <div className='loader-container-inner' style={{ height: "100%", width: "100%", display: "flex", flexShrink: "0", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <div ref={lottieRef} style={{ backdropFilter: "blur(1px)", flex: "1 1 100%" }}></div>
                </div>
            </div>)}
        </>
    )
}
export default Loader;