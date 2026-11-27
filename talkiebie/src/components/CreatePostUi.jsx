import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import PostFeed from './PostFeed';
import CreatorsPanel from './CreatorsPanel';
import { creators } from '../data/creators';
import NewPost from './CreatePost';

const CreatePostUi = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const { activeTab, setActiveTab, sidebarOpen, setSidebarOpen, subscribedIds, feedRef, toggleSubscribe, feedPosts, stickyHeaderWidth, setstickyHeaderWidth } = useContext(AppContext);


    return (
        <>
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

                        sidebarOpen={sidebarOpen}

                        setIsOpen={setIsChatOpen}
                    />

                    <main className="app-main" >
                        {/* MIDDLE: Posts Feed */}
                        < div className="feed-column" ref={feedRef} >


                            <div className="stickyTop" style={{ width: stickyHeaderWidth, background: " #0f0f0f", borderBottom: "1px solid #282828", fontSize: "18px", fontWeight: "600", color: "#c7d4ef" }}>HOME</div>

                            < NewPost />
                        </div>





                    </main>
                </div >
            </div >


        </>
    )
}

export default CreatePostUi;