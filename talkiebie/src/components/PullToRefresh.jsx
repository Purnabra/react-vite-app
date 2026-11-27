
import React, { useRef, useState } from "react";
import "../assets/css/PullToRefresh.css";

export default function PullToRefresh({ children }) {
    const startY = useRef(0);
    const [pull, setPull] = useState(0);
    const [loading, setLoading] = useState(false);

    const threshold = 90;
    const maxPull = 120;

    // Enable only at 768px or below
    const isMobile = () => window.innerWidth <= 768;

    const handleTouchStart = (e) => {
        if (
            !isMobile() ||
            window.scrollY > 0 ||
            loading
        ) {
            startY.current = 0;
            return;
        }

        startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        if (!isMobile() || !startY.current || loading) {
            return;
        }

        // Only activate when the page is at the top
        if (window.scrollY > 0) {
            setPull(0);
            return;
        }

        const currentY = e.touches[0].clientY;
        const distance = currentY - startY.current;

        if (distance > 0) {
            setPull(Math.min(distance, maxPull));
        } else {
            setPull(0);
        }
    };

    const handleTouchEnd = () => {
        if (!isMobile() || loading) {
            startY.current = 0;
            return;
        }

        if (pull >= threshold) {
            setLoading(true);

            // Display the blue loading animation
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            setPull(0);
        }

        startY.current = 0;
    };

    return (
        <div
            className="pull-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {isMobile() && (pull > 0 || loading) && (
                <div
                    className="pull-indicator"
                    style={{
                        height: loading ? 55 : pull,
                        opacity: loading
                            ? 1
                            : Math.min(pull / threshold, 1),
                    }}
                >
                    <div
                        className={`blue-spinner ${loading ? "spinning" : ""
                            }`}
                        style={
                            loading
                                ? {}
                                : { transform: `rotate(${pull * 3}deg)` }
                        }
                    />
                </div>
            )}

            {children}
        </div>
    );
}
