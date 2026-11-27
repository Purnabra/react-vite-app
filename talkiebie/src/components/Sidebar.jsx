import '../assets/css/SideBar.css';
import { replace, useLocation, useNavigate } from "react-router-dom";

import { FaSignOutAlt } from "react-icons/fa";
import { useRef, useEffect } from "react";
const menuItems = [
    { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', urlAction: '/', scale: "24", bg: "none", size: "20", paddingleft: "12px" },

    { id: 'messages', label: 'Messages', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', urlAction: '/chat', scale: "24", bg: "none", size: "20", paddingleft: "12px" },

    { id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', urlAction: '/notification', scale: "24", bg: "none", size: "20", paddingleft: "12px" },

    { id: 'bookmarks', label: 'Bookmarks', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z', urlAction: '/bookmarks', scale: "24", bg: "none", size: "20", paddingleft: "12px" },

    { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', urlAction: '/setting/profile', scale: "24", bg: "none", size: "20", paddingleft: "12px" },

    { id: 'logout', label: 'Logout', icon: 'M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0zM502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z', urlAction: '/logout', scale: "24", bg: "#c7d4ef", size: "16", paddingleft: "16px" },
];
export default function Sidebar({
    open,
    onClose,
    activeTab,
    setActiveTab,
    subscribedCreators,
    sidebarOpen,
    setIsOpen
}) {
    const location = useLocation();


    const navigate = useNavigate();

    const asideRef = useRef(null);

    const isToggle = useRef(false);


    useEffect(() => {

        const el = asideRef.current;

        const resize = () => {
            if (window.innerWidth >= 1100) { isToggle.current = false; el.style.transform = `translateX(0)` } else { isToggle.current = true; el.style.transform = `translateX(-100%)` }



            if (window.innerWidth > 1100) { setIsOpen(false); } else { setIsOpen(true); }
        }
        window.addEventListener('resize', () => {
            resize();
        })


        resize();
    }, []);
    // console.log(sidebarOpen);
    useEffect(() => {
        const el = asideRef.current;
        if (!el) return;
        if (isToggle.current) {
            el.style.transform = sidebarOpen ? 'translateX(0)' : 'translateX(-100%)';

        }
        return () => {
            // console.log('unmounting sidebar')
        }

    }, [sidebarOpen])



    return (
        <>
            {open && <div className="sidebar-overlay" onClick={onClose} />}
            <aside

                className="sidebar"
                //  className={`sidebar ${open ? 'open' : ''}`}
                ref={asideRef}
            >
                <div className="sidebar-menu">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); navigate(item.urlAction, { replace: true }) }}
                            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`} style={{ paddingLeft: item.paddingleft }}
                        >
                            <svg width={item.size} height={item.size} fill={item.bg} stroke="currentColor" viewBox={`0 0 ${item.scale} ${item.scale}`}>

                                {item.id === 'logout' ? (
                                    <g transform="scale(0.046875)">
                                        <path
                                            d={item.icon}
                                            strokeWidth="4"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        />
                                    </g>
                                ) : (
                                    <path
                                        d={item.icon}
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                    />
                                )}

                            </svg>
                            {item.label}
                        </button>
                    ))}
                </div>

                {subscribedCreators.length > 0 && (
                    <div className="sidebar-section">
                        <h3 className="sidebar-section-title"></h3>
                        <div className="sidebar-subs">
                            {/*subscribedCreators.map((c) => (
                                <div key={c.id} className="sidebar-sub">
                                    <img src={c.avatar} alt={c.name} className="sidebar-sub-avatar-img" />
                                    <span className="sidebar-sub-name">{c.name}</span>
                                    {c.online && <div className="sidebar-sub-dot" />}
                                </div>
                            ))*/}
                        </div>
                    </div>
                )}
            </aside>
        </>
    );
}