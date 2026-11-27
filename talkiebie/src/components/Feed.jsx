import React, { useState } from 'react';
//import './App.css'; // Assuming you have your styles here

const Feed = () => {
    // Simulating an empty posts array to show the empty state
    const [posts, setPosts] = useState([]);

    return (
        <div className="feed-container">
            <div className="feed-header">
                <h2>HOME</h2>
            </div>

            <div className="feed-content">
                {posts.length === 0 ? (
                    /* --- EMPTY STATE START --- */
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg
                                width="64"
                                height="64"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                        </div>
                        <h3>No posts found</h3>
                        <p>When creators you follow post new content, it will appear here.</p>
                    </div>
                    /* --- EMPTY STATE END --- */
                ) : (
                    /* Your existing Post List logic goes here */
                    posts.map((post) => (
                        <div key={post.id} className="post-card">
                            {/* Post content */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Feed;