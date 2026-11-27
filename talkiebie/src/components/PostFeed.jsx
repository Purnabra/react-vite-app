import React from 'react'
import PostCard from './PostCard';
import '../assets/css/PostFeed.css';

export default function PostFeed({ creators, subscribedIds, onSubscribe }) {

    const [loading, setLoading] = React.useState(true);

    const [posts, setPosts] = React.useState([]);
    const getCreator = (id) => creators.find((c) => c.id === id);



    /* if (posts.length === 0) {
         return (
             <div className="feed-empty">
                 <div className="feed-empty-icon">📭</div>
                 <h3>No posts yet</h3>
                 <p>Subscribe to creators on the right to see their posts here.</p>
             </div>
         );
     }*/

    React.useEffect(() => {
        fetch('https://carried-overturn-joystick.ngrok-free.dev/api/user/allposts', { credentials: 'include' }).then(res => res.json()).then(data => {
            // console.log(data);
            // console.log(JSON.parse(da
            // ta.imagestore));
            setPosts(prev => {
                setLoading(false);
                return data;

            });

        }).catch(err => console.log(err));



    }, [])
    return (
        <>      {!loading && <div className="feed"  >

            {(posts.length !== 0) ?
                posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        creator={{ avatar: post.avatar, name: post.name, username: post.username, imagestore: post.imagestore }}
                        isSubscribed={subscribedIds.includes(post.creatorId)}
                        onSubscribe={() => onSubscribe(post.creatorId)}
                    />
                ))
                : <div className="feed-empty">
                    <div className="feed-empty-icon">📭</div>
                    <h3>No posts yet</h3>
                    <p>Subscribe to creators on the right to see their posts here.</p>
                </div>}

        </div>}

        </>

    );
}