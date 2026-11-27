import '../assets/css/CreatorsPanel.css';

import { useRef, useState, useEffect } from "react";


export default function CreatorsPanel({ creators, subscribedIds, onSubscribe }) {
    const suggestions = creators.filter((c) => !subscribedIds.includes(c.id));
    const overlayRef = useRef(null);
    const startX = useRef(0);
    const carouselLeft = useRef(0);
    const noCarousel = useRef(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const carousel = useRef(false);

    const [totalwidth, setTotalWidth] = useState(null);

    const left = useRef(0);
    const resultantRef = useRef(0);
    const rightScroll = (l, width) => {

        resultantRef.current = left.current + l;

        // console.log(totalwidth);
        //console.log(resultantRef.current)
        if ((resultantRef.current >= (noCarousel.current - 1) * width)) {

            resultantRef.current = (noCarousel.current - 1) * width;

        }
        console.log(noCarousel.current);
        console.log(totalwidth)

        const bx = totalwidth * (noCarousel.current - 1);

        overlayRef.current.style.transform = `translateX(-${bx - resultantRef.current}px)`;
    }


    const leftScroll = (l) => {
        //  console.log('hello world');
        // console.log(resultantRef.current);

        resultantRef.current = left.current - l;
        // console.log(resultantRef.current)

        if (resultantRef.current <= 0) {

            resultantRef.current = 0;

        }
        //  console.log(noCarousel.current);
        //  console.log(totalwidth)

        const bx = totalwidth * (noCarousel.current - 1);
        // console.log('left' + resultantRef.current);
        overlayRef.current.style.transform = `translateX(-${bx - resultantRef.current}px)`;
        // console.log(left.current - l);

    }
    const handledown = (e, tag) => {
        e.preventDefault();
        let leftX;
        let info = overlayRef.current.getBoundingClientRect();


        if (tag == 'mobile') {
            leftX = e.touches[0].clientX - info.left;
        }
        else {
            leftX = e.clientX - info.left;
        }

        startX.current = leftX;
        carousel.current = true


    }
    const handlemove = (e, tag) => {
        e.preventDefault();



        if (!carousel.current) { return; }

        //  console.log(carousel.current);
        let leftX;
        let info = overlayRef.current.getBoundingClientRect();

        let width = info.width;

        if (tag == 'mobile') {
            leftX = e.touches[0].clientX - info.left;
        }
        else {
            leftX = e.clientX - info.left;
        }

        let finalX = leftX;

        let resultant = finalX - startX.current;

        if (resultant > 0) { rightScroll(resultant, width); } else { leftScroll(Math.abs(resultant), width); }
        return;


    }
    const handleup = (e) => {
        e.preventDefault();
        left.current = resultantRef.current;
        carousel.current = false;

    }

    useEffect(() => {
        noCarousel.current = document.getElementsByClassName('carousel-container-1-inner').length;


        setTotalWidth(parseInt(overlayRef.current.parentElement.getAttribute('data-transform')));

        document.addEventListener('mouseup', handleup);
        document.addEventListener('mouseleave', handleup);
    }, [])
    return (
        <div className="creators-panel" style={{ gap: 0 }}>

            <div className="carousel-container-1" data-transform="380px">
                {/* Track — moves left/right */}
                <div className="carousel-container-1-overlay" ref={overlayRef} onMouseDown={(e) => handledown(e, 'desktop')} onMouseMove={(e) => handlemove(e, 'desktop')} onTouchMove={(e) => handlemove(e, 'mobile')} style={{ transform: "translateX(-1140px)" }} >
                    <div className="carousel-container-1-inner">


                        <div className="carousel-container-1-inner-image" >

                            <img src="https://i.pravatar.cc/150?img=5" style={{ borderRadius: "10px", width: "100%", height: "100%" }} />


                            <div className='carousel-circle '>
                                <img src={`https://i.pravatar.cc/150?img=9`} style={{ height: "100%", width: "100%" }} />
                            </div>

                            <div className='glass-overlay' style={{ borderRadius: "0px 0px 10px 10px" }}></div>


                        </div>


                        <div className="carousel-container-1-inner-image" >

                            <img src="https://i.pravatar.cc/150?img=5" style={{ borderRadius: "10px", width: "100%", height: "100%" }} />

                            <div className='carousel-circle '>
                                <img src={`https://i.pravatar.cc/150?img=9`} style={{ height: "100%", width: "100%" }} />
                            </div>
                            <div className='glass-overlay' style={{ borderRadius: "0px 0px 10px 10px" }}></div>


                        </div>


                        <div className="carousel-container-1-inner-image" >

                            <img src="https://i.pravatar.cc/150?img=5" style={{ borderRadius: "10px", width: "100%", height: "100%" }} />

                            <div className='carousel-circle '>
                                <img src={`https://i.pravatar.cc/150?img=9`} style={{ height: "100%", width: "100%" }} />
                            </div>
                            <div className='glass-overlay' style={{ borderRadius: "0px 0px 10px 10px" }}></div>

                        </div>






                    </div>


                    <div className="carousel-container-1-inner">


                        <div className="carousel-container-1-inner-image" >

                            <img src="https://i.pravatar.cc/150?img=9" style={{ borderRadius: "10px", width: "100%", height: "100%" }} />

                            <div className='carousel-circle '>
                                <img src={`https://i.pravatar.cc/150?img=9`} style={{ height: "100%", width: "100%" }} />
                            </div>



                            <div className='glass-overlay' style={{ borderRadius: "0px 0px 10px 10px" }}></div>


                        </div>


                        <div className="carousel-container-1-inner-image" >

                            <img src="https://i.pravatar.cc/150?img=9" style={{ borderRadius: "10px", width: "100%", height: "100%" }} />

                            <div className='carousel-circle '>
                                <img src={`https://i.pravatar.cc/150?img=9`} style={{ height: "100%", width: "100%" }} />
                            </div>



                            <div className='glass-overlay' style={{ borderRadius: "0px 0px 10px 10px" }}></div>


                        </div>


                        <div className="carousel-container-1-inner-image" >

                            <img src="https://i.pravatar.cc/150?img=9" style={{ borderRadius: "10px", width: "100%", height: "100%" }} />


                            <div className='carousel-circle '>
                                <img src={`https://i.pravatar.cc/150?img=9`} style={{ height: "100%", width: "100%" }} />
                            </div>

                            <div className='glass-overlay' style={{ borderRadius: "0px 0px 10px 10px" }}></div>

                        </div>






                    </div>

                    <div className="carousel-container-1-inner">


                        <div className="carousel-container-1-inner-image" >

                            <img src="https://i.pravatar.cc/150?img=9" style={{ borderRadius: "10px", width: "100%", height: "100%" }} />

                            <div className='carousel-circle '>
                                <img src={`https://i.pravatar.cc/150?img=9`} style={{ height: "100%", width: "100%" }} />
                            </div>



                            <div className='glass-overlay' style={{ borderRadius: "0px 0px 10px 10px" }}></div>


                        </div>


                        <div className="carousel-container-1-inner-image" >

                            <img src="https://i.pravatar.cc/150?img=9" style={{ borderRadius: "10px", width: "100%", height: "100%" }} />

                            <div className='carousel-circle '>
                                <img src={`https://i.pravatar.cc/150?img=9`} style={{ height: "100%", width: "100%" }} />
                            </div>



                            <div className='glass-overlay' style={{ borderRadius: "0px 0px 10px 10px" }}></div>


                        </div>


                        <div className="carousel-container-1-inner-image" >

                            <img src="https://i.pravatar.cc/150?img=9" style={{ borderRadius: "10px", width: "100%", height: "100%" }} />


                            <div className='carousel-circle '>
                                <img src={`https://i.pravatar.cc/150?img=9`} style={{ height: "100%", width: "100%" }} />
                            </div>

                            <div className='glass-overlay' style={{ borderRadius: "0px 0px 10px 10px" }}></div>

                        </div>






                    </div>

                    <div className="carousel-container-1-inner">


                        <div className="carousel-container-1-inner-image" >

                            <img src="https://i.pravatar.cc/150?img=9" style={{ borderRadius: "10px", width: "100%", height: "100%" }} />

                            <div className='carousel-circle '>
                                <img src={`https://i.pravatar.cc/150?img=9`} style={{ height: "100%", width: "100%" }} />
                            </div>



                            <div className='glass-overlay' style={{ borderRadius: "0px 0px 10px 10px" }}></div>


                        </div>


                        <div className="carousel-container-1-inner-image" >

                            <img src="https://i.pravatar.cc/150?img=9" style={{ borderRadius: "10px", width: "100%", height: "100%" }} />

                            <div className='carousel-circle '>
                                <img src={`https://i.pravatar.cc/150?img=9`} style={{ height: "100%", width: "100%" }} />
                            </div>



                            <div className='glass-overlay' style={{ borderRadius: "0px 0px 10px 10px" }}></div>


                        </div>


                        <div className="carousel-container-1-inner-image" >

                            <img src="https://i.pravatar.cc/150?img=9" style={{ borderRadius: "10px", width: "100%", height: "100%" }} />


                            <div className='carousel-circle '>
                                <img src={`https://i.pravatar.cc/150?img=9`} style={{ height: "100%", width: "100%" }} />
                            </div>

                            <div className='glass-overlay' style={{ borderRadius: "0px 0px 10px 10px" }}></div>

                        </div>






                    </div>
                </div>

                {/* Overlay — always on top, covering container */}
                <div style={{
                    position: "absolute",
                    inset: 0,                     // ✅ top/right/bottom/left = 0
                    /* border: "1px solid #282828",*/
                    pointerEvents: "none",        // so it doesn't block clicks
                    zIndex: 1
                }} />
            </div>

            <div style={{ color: "white", margin: "0 auto" }}> </div>

        </div>
    );
}



