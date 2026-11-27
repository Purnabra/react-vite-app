import '../assets/css/NavBar.css';

import { useNavigate } from 'react-router-dom';


export default function Navbar({ onMenuClick, activeTab, setActiveTab }) {
    const tabs = ['Home', 'Messages', 'Notifications', 'Settings'];

    const navigate = useNavigate();

    /* const handleClick = () => {
 
 
         const sidebar = document.getElementById('sidebaraside');
         if (!sidebar) return;
         //console.log(isopen.current)
         if (isrunning.current) return;
         // sidebar.classList.toggle('open');
         // console.log(isopen.current)
 
         if (isopen.current) { sidebar.style.transform = `translateX(0)`; isopen.current = false } else { sidebar.style.transform = `translateX(-100%)`; isopen.current = true; }
 
     };*/

    return (
        <nav className="navbar">
            <button
                className="navbar-menu-btn"
                aria-label="Menu"
                id="sidebarBtn"
                onClick={onMenuClick}
            >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <div className="navbar-logo">
                <div className="navbar-logo-mark">O</div>
                <span className="navbar-logo-text">OnlyFans</span>
            </div>

            <div className="navbar-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`navbar-tab ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="navbar-actions">
                <button className="navbar-new-post" onClick={() => { navigate('/createpost', { replace: true }) }}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Post
                </button>
                <div className="navbar-avatar" />
            </div>
        </nav>
    );
}