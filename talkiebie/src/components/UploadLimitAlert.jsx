import React from "react";
export default function UploadLimitAlert({ show, onClose }) {
    if (!show) return null;

    return (
        <div
            className="np-alert-overlay"
            onClick={onClose}
        >
            <div
                className="np-alert-box"
                onClick={e => e.stopPropagation()}
            >

                <div className="np-alert-icon">
                    !
                </div>

                <h3>Upload Limit Exceeded</h3>

                <p>
                    You can upload a maximum of 20 photos or videos
                    per post. Please remove some files before
                    uploading more.
                </p>

                <button onClick={onClose}>
                    OK, Got it
                </button>

            </div>
        </div>
    );
}
