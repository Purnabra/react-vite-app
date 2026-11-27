import { useState, useEffect, useRef } from 'react';
import '../assets/css/PostCard.css';
import {
    FaChevronLeft,
    FaChevronRight,

} from "react-icons/fa";

export default function PostCard({ post, creator, isSubscribed, onSubscribe }) {
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments || []);
    const imageall = useRef(null);
    const [loading, setLoading] = useState(true);
    const addComment = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        setComments([...comments, { id: Date.now(), user: 'You', text: comment }]);
        setComment('');
    };
    useEffect(() => {

        imageall.current = JSON.parse(creator.imagestore);
        console.log(imageall.current);
        setLoading(false);

    }, [])

    const [sliderTranslate, setSliderTranslate] = useState(0);

    const sliderRef = useRef(null);


    const handleSlideControl = (tag) => {

        if (tag == 'left') {

            setSliderTranslate(prev => {

                if (prev === 0) return prev;
                return prev + 1;

            });


        }
        else {
            setSliderTranslate(prev => {

                if (Math.abs(prev) === imageall.current.length - 1) return prev;
                return prev - 1

            });


        }


    }
    return (
        <>
            {!loading && <article className="post-card" >


                {/* Header */}
                <header className="post-header">
                    <div className="post-avatar-wrap">
                        <div className="post-avatar-ring">
                            <img src={`https://carried-overturn-joystick.ngrok-free.dev${creator.avatar}`} alt={creator.name} className="post-avatar" />
                        </div>
                        <div>
                            <div className="post-name-row">
                                <span className="post-name">{creator.name}</span>
                                {creator.verified && (
                                    <svg width="14" height="14" fill="#60a5fa" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                )}
                            </div>
                            <span className="post-time">@{creator.username} · {post.timeAgo}</span>
                        </div>
                    </div>

                    {!isSubscribed ? (
                        <button className="post-sub-btn" onClick={onSubscribe}>
                            Subscribe
                        </button>
                    ) : (
                        <button className="post-more-btn" aria-label="More">
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="5" cy="12" r="2" />
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="19" cy="12" r="2" />
                            </svg>
                        </button>
                    )}
                </header>

                {/* Content */}
                {post.text && <p className="post-text">{post.text}</p>}

                {/* Image / locked preview */}
                <div className="post-media">

                    <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: "1" }} ref={sliderRef}>

                        <FaChevronLeft style={{ color: "#fff", fontWeight: "bold" }} onClick={(e) => handleSlideControl(`left`)} />
                        <FaChevronRight style={{ color: "#fff", fontWeight: "bold" }} onClick={(e) => handleSlideControl(`right`)} />

                    </div>


                    <div style={{ display: "flex", transform: `translateX(${sliderTranslate * 100}%)`, transition: "transform 0.5s linear", }}>
                        {imageall.current.map((item, index) => (
                            item.mimetype.startsWith("image/") ? (
                                <div style={{ flex: "0 0 100%", position: "relative", /*maxHeight: "400px", height: "400px"*/ }} key={index}>

                                    <div style={{ width: "100%", height: "100%", position: "absolute" }}>

                                        <img src={`https://carried-overturn-joystick.ngrok-free.dev/uploads/${item['filename']}.${item['originalname'].split('.')[1]}`} style={{ width: "100%", height: "100%", filter: "blur(50px) opacity(90%)" }} />


                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%" }}>


                                        <img
                                            src={`https://carried-overturn-joystick.ngrok-free.dev/uploads/${item['filename']}.${item['originalname'].split('.')[1]}`}
                                            alt="Post preview"
                                            className={`post-image ${!isSubscribed ? 'locked1' : ''}`}

                                        />

                                    </div>
                                </div>
                            ) : (
                                <div style={{ flex: "0 0 100%" }} key={index}>
                                    <video
                                        key={index}
                                        src={`https://carried-overturn-joystick.ngrok-free.dev/uploads/${item['filename']}.${item['originalname'].split('.')[1]}`}
                                        controls
                                    />
                                </div>
                            )
                        ))}
                    </div>

                    {/*<img
                        src={`https://carried-overturn-joystick.ngrok-free.dev/uploads/${imageall.current[0]['filename']}.${imageall.current[0]['originalname'].split('.')[1]}`}
                        alt="Post"
                        className={`post-image ${!isSubscribed ? 'locked' : ''}`}
                    /> */}
                    {/*!isSubscribed && (
                        <div className="post-lock">
                            <div className="post-lock-inner">
                                <div className="post-lock-icon">🔒</div>
                                <p className="post-lock-text">Subscribe to see this post</p>
                                <button className="post-lock-btn" onClick={onSubscribe}>
                                    Subscribe for ${creator.price}/mo
                                </button>
                            </div>
                        </div>
                    )*/}
                </div>

                {/* Actions */}
                <div className="post-actions">
                    <button
                        className={`post-action ${liked ? 'liked' : ''}`}
                        onClick={() => setLiked(!liked)}
                    >
                        <svg width="22" height="22" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                        </svg>
                        <span>{post.likes + (liked ? 1 : 0)}</span>
                    </button>

                    <button className="post-action" onClick={() => setShowComments(!showComments)}>
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                        </svg>
                        <span>{comments.length}</span>
                    </button>

                    <button className="post-action">
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                        </svg>
                    </button>
                </div>

                {/* Comments */}
                {showComments && isSubscribed && (
                    <div className="post-comments">
                        {comments.map((c) => (
                            <div key={c.id} className="post-comment">
                                <strong>{c.user}</strong>
                                <span>{c.text}</span>
                            </div>
                        ))}
                        <form className="post-comment-form" onSubmit={addComment}>
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button type="submit" disabled={!comment.trim()}>
                                Post
                            </button>
                        </form>
                    </div>
                )}
            </article>}
        </>


    );
}