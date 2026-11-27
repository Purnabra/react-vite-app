import React, { useRef } from 'react';
import styles from '../assets/css/Popup.module.css';

const Popup = ({ popup, content, progressBarRef }) => {
    return (
        <div className={`${styles.popup} ${popup ? styles.show : ''}`}>
            <div className={styles.popupContent}>
                <div className={styles.iconWrap}>
                    <svg viewBox="0 0 52 52" className={styles.checkmark}>
                        <circle cx="26" cy="26" r="25" fill="none" className={styles.checkmarkCircle} />
                        <path fill="none" className={styles.checkmarkCheck} d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                </div>
                <p className={styles.message} style={{ fontWeight: "bold" }} id="messageContent">{content}</p>
                <div className={styles.progressBar} ref={progressBarRef}></div>
            </div>
        </div>
    );
};

export default Popup;