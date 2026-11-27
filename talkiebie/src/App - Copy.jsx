import { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PostFeed from './components/PostFeed';
import CreatorsPanel from './components/CreatorsPanel';
import { creators } from './data/creators';
import { posts } from './data/posts';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subscribedIds, setSubscribedIds] = useState([2, 3]); // sample subscribed creators
  const [stickyHeaderWidth, setstickyHeaderWidth] = useState([2, 3]); // sample subscribed creators

  const feedRef = useRef(null);
  const toggleSubscribe = (id) => {
    setSubscribedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const resizeHandler = () => {

    // console.log('hello world');
    console.log(feedRef.current.clientWidth);
    setstickyHeaderWidth(`${(feedRef.current.clientWidth) - 1}px`)
  }

  useEffect(() => {

    // console.log(feedRef.current);


    window.addEventListener('resize', resizeHandler);
    resizeHandler();

  }, [])

  // Posts from subscribed creators show in feed
  const feedPosts = posts.filter((p) => subscribedIds.includes(p.creatorId));

  return (
    <div className="app">
      <Navbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="app-body">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          subscribedCreators={creators.filter((c) => subscribedIds.includes(c.id))}
        />
        <main className="app-main">


          {/* MIDDLE: Posts Feed */}
          < div className="feed-column" ref={feedRef} >


            <div className="stickyTop" style={{ width: stickyHeaderWidth }}>helo world</div>
            <div style={{ height: "70px" }}></div>

            <PostFeed
              posts={feedPosts}
              creators={creators}
              subscribedIds={subscribedIds}
              onSubscribe={toggleSubscribe}
            />
          </div>

          {/* RIGHT: Creators Panel */}
          {<aside className="creators-column">
            <CreatorsPanel
              creators={creators}
              subscribedIds={subscribedIds}
              onSubscribe={toggleSubscribe}
            />
          </aside>}
        </main>
      </div >
    </div >
  );
}