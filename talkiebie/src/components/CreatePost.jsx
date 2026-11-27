
import React, { useState, useRef, useEffect, useContext } from "react";
import {
    FaArrowLeft,
    FaArrowRight,
    FaChevronLeft,
    FaChevronRight,
    FaAngleLeft,
    FaAngleRight,
    FaCaretLeft,
    FaCaretRight
} from "react-icons/fa";
//import "./assets/css/NewPost.css";
import UploadLimitAlert from "./UploadLimitAlert";
import "../assets/css/NewPost.css"
import AppContext from '../context/AppContext';
import Loader from './Loader';
import { useRevalidator } from "react-router-dom";
export default function NewPost() {
    const { setAlertPopup, setAlertMessage, setAlertColor, display, setDisplay } = useContext(AppContext);
    const [caption, setCaption] = useState("");
    const [audience, setAudience] = useState("Public");
    const [media, setMedia] = useState([]);
    const [posts, setPosts] = useState([]);
    const [showLimitAlert, setShowLimitAlert] = useState(false);
    const [length, setLength] = useState(0);
    const fileRef = useRef(null);
    const imageUploadLimit = useRef(20);

    const [sliderTranslate, setSliderTranslate] = useState(0);

    const sliderRef = useRef(null);
    // Clean up uploaded media URLs
    useEffect(() => {

        return () => {
            media.forEach(item => URL.revokeObjectURL(item.url));
        };
    }, [media]);

    // Upload media
    const handleUpload = (e) => {
        const files = Array.from(e.target.files || []);


        const validFiles = files.filter(file =>
            file.type.startsWith("image/") ||
            file.type.startsWith("video/")
        );
        if (media.length + 1 > imageUploadLimit.current) {
            setShowLimitAlert(true);

            return;
        }
        // console.log(media);

        const newMedia = validFiles.map(file => ({
            file,
            url: URL.createObjectURL(file),
            type: file.type,
            name: file.name
        }));

        setMedia(prev => [...prev, ...newMedia]);

        // console.log(media);
        //  e.target.value = "";
    };

    // Remove media
    const removeMedia = (index) => {
        setMedia(prev => {
            URL.revokeObjectURL(prev[index].url);
            return prev.filter((_, i) => i !== index);
        });
    };

    // Publish post
    const handlePublish = () => {

        if (media.length > imageUploadLimit.current) {
            setShowLimitAlert(true);

            return;
        }
        if (!caption.trim() && media.length === 0) return;
        setDisplay(true);
        const newPost = {
            id: Date.now(),
            caption,
            audience,
            media: [...media],
            date: new Date().toLocaleString()
        };
        const formdata = new FormData();
        media.forEach((item) => {

            formdata.append('media', item.file)


        })
        formdata.append('caption', caption);
        formdata.append('audience', audience);

        // console.log(formdata);
        // const formdata = new FormData();

        fetch('https://carried-overturn-joystick.ngrok-free.dev/api/user/createpost', { method: 'POST', body: formdata, credentials: 'include' }).then(res => res.json()).then(data => {

            setDisplay(false);
            if (data.status) {
                setAlertColor('rgb(94, 223, 94)');
            }
            else {
                setAlertColor('#ee1717');
            }
            setAlertPopup(true);
            setAlertMessage(data.message);
            setTimeout(() => {
                setAlertPopup(false);
                setAlertMessage('');
            }, 2000);
            setCaption("");
            setAudience("Public");
            setMedia([]);
        }).catch(err => console.log(err))

        // setPosts(prev => [newPost, ...prev]);

    };


    const handleCaption = (e) => {

        const text = e.value;
        setCaption(e.value);


        setLength(text.length);

    }


    const handleSlideControl = (tag) => {

        if (tag == 'left') {

            setSliderTranslate(prev => {

                if (prev === 0) return prev;
                return prev + 1;

            });


        }
        else {
            setSliderTranslate(prev => {

                if (Math.abs(prev) === media.length - 1) return prev;
                return prev - 1

            });


        }


    }
    return (

        <>
            {display && (<Loader />)}

            <div className="newpost-page">

                {/* HEADER */}
                {/*<header className="np-header">
                <div className="np-header-left">
                    <h2>OnlyFans</h2>
                </div>

                <div className="np-header-right">
                    <button className="np-header-btn">
                        + New Post
                    </button>

                    <div className="np-avatar">U</div>
                </div>
            </header>*/}

                {/* MAIN CONTENT */}
                <main className="np-main">

                    {/* PAGE TITLE */}
                    {/*  <div className="np-heading">
                    <div>
                        <h1>Create New Post</h1>
                        <p>
                            Share something with your fans
                        </p>
                    </div>

                    <span className="np-draft-badge">
                        Draft
                    </span>
                </div>*/}

                    {/* TWO COLUMN LAYOUT */}
                    <div className="np-layout">

                        {/* LEFT SIDE FORM */}
                        <section className="np-form-card">

                            {/* PROFILE */}
                            <div className="np-user">
                                <div className="np-avatar">U</div>

                                <div>
                                    <h4 style={{ color: "var(--text-color)" }}>Your Username</h4>
                                    <span>Posting to your profile</span>
                                </div>
                            </div>

                            <div className="np-divider" />

                            {/* CAPTION */}
                            <label className="np-label">
                                Caption
                            </label>

                            <textarea
                                className="np-caption"
                                placeholder="What's on your mind? Write something for your fans..."
                                value={caption}
                                onChange={(e) => handleCaption(e.currentTarget)}
                                maxLength={2200}
                            />
                            <div align={'right'} style={{ paddingTop: "4px", color: "var(--text-color)", fontSize: "13px" }}>{length}/2200</div>
                            {/* UPLOAD SECTION */}
                            <div className="np-upload-heading">
                                <h4>Add photos or videos</h4>
                                {/*<span>Multiple files supported</span> */}
                            </div>

                            <div
                                className="np-upload-box"
                                onClick={() => fileRef.current.click()}
                                onDragOver={e => e.preventDefault()}
                                onDrop={e => {
                                    e.preventDefault();
                                    handleUpload({
                                        target: {
                                            files: e.dataTransfer.files,
                                            value: ""
                                        }
                                    });
                                }}
                            >
                                <div className="np-upload-icon">
                                    <svg
                                        width="42"
                                        height="42"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    >
                                        <rect x="3" y="3" width="18" height="18" rx="3" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <path d="m21 15-5-5L5 21" />
                                    </svg>
                                </div>

                                <div style={{ padding: "8px 8px 4px 8px", color: "var(--text-color)", fontSize: "14px" }}>Drag & drop your media</div>

                                <div style={{ padding: "4px 8px 8px 8px", color: "var(--text-color)", fontSize: "14px" }}>
                                    or browse files from your device
                                </div>

                                <button style={{ marginTop: "10px" }}
                                    type="button"
                                    className="np-upload-btn"
                                    onClick={e => {
                                        e.stopPropagation();
                                        fileRef.current.click();
                                    }}
                                >
                                    Choose Files
                                </button>

                                {/*<div className="np-file-info">
                                JPG, PNG, MP4 and more
                            </div>*/}

                                <input
                                    type="file"
                                    ref={fileRef}
                                    accept="image/*,video/*"
                                    multiple
                                    hidden
                                    onChange={handleUpload}

                                    style={{ padding: "8px" }}
                                />
                            </div>
                            {/*   #6b0404ff   #047e4fff*/}
                            <div align={'right'} style={{ paddingTop: "4px", color: "var(--text-color)", fontSize: "13px" }}><span style={{ fontWeight: "900", color: (media.length > imageUploadLimit.current) ? "#ac2f2fff" : (media.length === 0) ? "" : "#047e4fff" }}>{media.length}/{imageUploadLimit.current}</span></div>


                            {/* MEDIA PREVIEW */}
                            {media.length > 0 && (
                                <div className="np-media-grid">

                                    {media.map((item, index) => (
                                        <div
                                            className="np-media-item"
                                            key={item.url}
                                        >
                                            {item.type.startsWith("image/") ? (
                                                <img
                                                    src={item.url}
                                                    alt={item.name}
                                                />
                                            ) : (
                                                <video
                                                    src={item.url}
                                                    controls
                                                />
                                            )}

                                            <button
                                                className="np-remove-media"
                                                onClick={() => removeMedia(index)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}

                                </div>
                            )}

                            {/* AUDIENCE */}
                            <div className="np-audience">
                                <label>Audience</label>

                                <select

                                    onChange={e => setAudience(e.target.value)}
                                >
                                    <option value={'Public'}>Public</option>
                                    <option value={'Private'}>Private</option>
                                    <option value={'Only Followers'}>Only Followers</option>
                                </select>
                            </div>

                            {/* POST OPTIONS */}

                            <div className="np-options">

                            </div>
                            {/*<div className="np-options">
                            <button type="button">📍 Location</button>
                            <button type="button">😊 Feeling</button>
                            <button type="button">📅 Schedule</button>
                        </div>*/}

                            {/* PUBLISH BUTTON */}
                            <button
                                className="np-publish-btn"
                                disabled={!caption.trim() && media.length === 0}
                                onClick={handlePublish}
                            >
                                Publish Post
                            </button>

                            <p className="np-footer-note">
                                Your post will be shared with your selected audience.
                            </p>

                        </section>

                        {/* RIGHT SIDE LIVE PREVIEW */}
                        <section className="np-preview-section">

                            <div className="np-preview-heading">
                                <h3 style={{ color: "var(--text-color)" }}>Post Preview</h3>
                                <span>Preview</span>
                            </div>

                            <div className="np-preview-card">

                                <div className="np-user" style={{ paddingBottom: "5px" }}>
                                    <div className="np-avatar">U</div>

                                    <div>
                                        <h4 style={{ color: "var(--text-color)" }}>Your Username</h4>
                                        <div style={{ color: "var(--text-color)", fontSize: "12px" }} >Just now</div>
                                    </div>
                                </div>

                                <div className="np-preview-caption" style={{ color: "var(--text-color)" }}>
                                    {caption ||
                                        "Your caption will appear here..."}
                                </div>

                                {/* PREVIEW MEDIA */}
                                {media.length > 0 ? (
                                    <div className="np-preview-media" style={{ display: "flex", position: "relative", overflow: "hidden" }}>
                                        <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: "1" }} ref={sliderRef}>

                                            <FaChevronLeft style={{ color: "#c80bfcff" }} onClick={(e) => handleSlideControl(`left`)} />
                                            <FaChevronRight style={{ color: "#c80bfcff" }} onClick={(e) => handleSlideControl(`right`)} />

                                        </div>
                                        <div style={{ display: "flex", transform: `translateX(${sliderTranslate * 100}%)`, transition: "transform 0.5s linear", height: "200px" }}>
                                            {media.map(item => (
                                                item.type.startsWith("image/") ? (
                                                    <div style={{ flex: "0 0 100%" }}><img
                                                        key={item.url}
                                                        src={item.url}
                                                        alt="Post preview"

                                                    /></div>
                                                ) : (
                                                    <div style={{ flex: "0 0 100%" }}>
                                                        <video
                                                            key={item.url}
                                                            src={item.url}
                                                            controls
                                                        />
                                                    </div>
                                                )
                                            ))}
                                        </div>

                                    </div>
                                ) : (
                                    <div className="np-preview-placeholder">
                                        <span>▧</span>
                                        <p>Media preview</p>
                                    </div>
                                )}

                                <div className="np-preview-audience">
                                    👥 {audience}
                                </div>

                            </div>

                            {/* PUBLISHED POSTS */}
                            {posts.length > 0 && (
                                <div className="np-published">
                                    <h3>Published Posts</h3>

                                    {posts.map(post => (
                                        <div
                                            className="np-published-card"
                                            key={post.id}
                                        >
                                            <strong>Your Username</strong>
                                            <p>{post.caption}</p>

                                            {post.media.map(item => (
                                                item.type.startsWith("image/") ? (
                                                    <img
                                                        key={item.url}
                                                        src={item.url}
                                                        alt="Published"
                                                    />
                                                ) : (
                                                    <video
                                                        key={item.url}
                                                        src={item.url}
                                                        controls
                                                    />
                                                )
                                            ))}

                                            <span>{post.audience}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </section>

                    </div>
                </main>


                {/* UPLOAD LIMIT ALERT COMPONENT */}
                <UploadLimitAlert
                    show={showLimitAlert}
                    onClose={() => setShowLimitAlert(false)}
                />

            </div></>

    );
}






