import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import PostFeed from './PostFeed';
import CreatorsPanel from './CreatorsPanel';
import { creators } from '../data/creators';


const Home = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    // const 

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

                            <PostFeed

                                creators={creators}
                                subscribedIds={subscribedIds}
                                onSubscribe={toggleSubscribe}

                            />
                        </div>


                        {/* RIGHT: Creators Panel */}
                        {<aside className="creators-column" style={{ borderRight: "1px solid #282828", background: "#0f0f0f", height: "100%", width: "422px" }}>
                            <CreatorsPanel
                                creators={creators}

                                subscribedIds={subscribedIds}

                                onSubscribe={toggleSubscribe}
                            />
                        </aside>}

                        {/*<div style={{ width: "40px", background: "#0f0f0f" }}></div>*/}
                    </main>
                </div >
            </div >


        </>
    )
}

export default Home