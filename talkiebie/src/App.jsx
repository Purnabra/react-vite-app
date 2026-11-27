import { useState, useRef, useEffect } from 'react';

import { Routes, Route } from "react-router-dom";

import { posts } from './data/posts';
import AppContext from './context/AppContext';
import Home from './components/Home';
import Chat from './components/Chat';
import Auth from "./auth/Auth";
import ProtectedRoute from './components/ProtectedRoute';
import ChatUser from './components/ChatUser';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Account from './components/Account';
import Content from './components/Content';
import RightSideBody from './components/RightSideBody';
import SettingRightPanel from './components/SettingsRightPanel';
import SuccessFailure from './components/SuccessFailure';
import Logout from './components/Logout';
import TwoFactorAuthentication from './components/2fa';
import PullToRefresh from "./components/PullToRefresh";
import Feed from './components/Feed';

import AllConnection from './context/AllConnection';


import NewPost from './components/CreatePost';

import CreatePostUi from './components/CreatePostUi';
import Test from './components/Test';
import './App.css';
export default function App() {

  //console.log(crypto.randomUUID());
  const [url, setUrl] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subscribedIds, setSubscribedIds] = useState([2, 3]); // sample subscribed creators
  const [stickyHeaderWidth, setstickyHeaderWidth] = useState([2, 3]); // sample subscribed creators
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState();
  const feedRef = useRef(null);
  const toggleSubscribe = (id) => {
    setSubscribedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  // Posts from subscribed creators show in feed
  const feedPosts = posts.filter((p) => subscribedIds.includes(p.creatorId));
  const [data, setData] = useState([]);

  const connmap = useRef(new Map());
  const socket = useRef(null);
  const manualclose = useRef(false);
  const [html, setHtml] = useState([]);
  const [socketReady, setSocketReady] = useState(false);


  const [display, setDisplay] = useState(false);
  const el = useRef(null);
  const scrollEl = useRef(null);
  const context = {
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    subscribedIds,
    feedRef,
    toggleSubscribe,
    feedPosts,
    stickyHeaderWidth,
    setstickyHeaderWidth,
    url,
    setUrl,
    data,
    setData,
    setAlertPopup,
    setAlertMessage,
    setAlertColor,
    display,
    setDisplay
  }
  useEffect(() => {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('dragstart', e => e.preventDefault());
      //img.addEventListener('mousedown', e => e.preventDefault());
    });
  })
  return (
    <>



      <div style={{ position: "relative", width: "100%", background: "rgb(15, 15, 15)", minHeight: "100%" }}>
        {alertPopup && <SuccessFailure message={alertMessage} color={alertColor} />}
        <AppContext value={context}>
          <AllConnection.Provider value={{ connmap, socket, manualclose, html, setHtml, socketReady, setSocketReady, el, scrollEl }}>
            <Routes>
              <Route path="/test" element={<Test />}></Route>
              <Route path="/feed" element={<Feed />}></Route>
              <Route path="/login" element={<Auth />}></Route>
              <Route path="/register" element={<Auth />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/createpost" element={<CreatePostUi />}></Route>
                <Route path="/chat" element={<Chat />}></Route>
                <Route path="/chat/:id" element={<Chat />}></Route>
                <Route path="/setting/mobile/profile" element={<Profile />}></Route>
                <Route path="/setting/mobile/account" element={<Account />}></Route>
                <Route path="/setting/mobile/account/password" element={<SettingRightPanel />}></Route>
                <Route path="/setting/mobile/account/2fa" element={<SettingRightPanel />}></Route>
                <Route path="/setting/mobile/account/verification" element={<SettingRightPanel />}></Route>
                <Route path="/setting/mobile/account/active-session" element={<SettingRightPanel />}></Route>
                <Route path="/setting/mobile/privacy" element={<SettingRightPanel />}></Route>
                <Route path="/setting/mobile/privacy/last-seen" element={<SettingRightPanel />}></Route>
                <Route path="/setting/mobile/privacy/readreceipt" element={<SettingRightPanel />}></Route>

                <Route path="/setting/mobile/privacy/profileprivacy" element={<SettingRightPanel />}></Route>

                <Route path="/setting/mobile/privacy/blockuser" element={<SettingRightPanel />}></Route>


                <Route path="/setting/profile" element={<Settings />}></Route>
                <Route path="/setting/account" element={<Settings />}></Route>
                <Route path="/setting/account/password" element={<Settings />}></Route>
                <Route path="/setting/account/2fa" element={<Settings />}></Route>
                <Route path="/setting/account/verification" element={<Settings />}></Route>
                <Route path="/setting/account/active-session" element={<Settings />}></Route>
                <Route path="/setting/privacy" element={<Settings />}></Route>
                <Route path="/setting/privacy/last-seen" element={<Settings />}></Route>

                <Route path="/setting/privacy/readreceipt" element={<Settings />}></Route>

                <Route path="/setting/privacy/profileprivacy" element={<Settings />}></Route>

                <Route path="/setting/privacy/blockuser" element={<Settings />}></Route>

              </Route>
            </Routes>
          </AllConnection.Provider>
        </AppContext>

      </div >




    </>


  );
}