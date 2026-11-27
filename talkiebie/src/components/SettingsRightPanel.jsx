import React, { useState, useContext } from 'react';

import { useLocation } from 'react-router-dom';

import Profile from './Profile';
import Account from './Account';
import RightSideBody from './RightSideBody';
import ChangePassword from './ChangePassword';
import TwoFactorAuthentication from './2fa';
import Privacy from './Privacy';
import LastSeen from './LastSeen';
import ReadReceipt from './ReadReceipt';
import ProfilePrivacy from './ProfilePrivacy';
import BlockedUser from './BlockedUser';
import ActiveSession from './ActiveSession';
import AppContext from '../context/AppContext';


import EmailVerification from './EmailVerification';

import Loader from './Loader';
import {
    FaChevronLeft
    // For the edit pencil
} from 'react-icons/fa';
const SettingRightPanel = ({ currentPanel, setCurrentPanel, isChatOpen }) => {
    const location = useLocation();

    const pathArr = location.pathname.split('/');

    const { url, setUrl, display, setDisplay } = useContext(AppContext);

    setTimeout(() => {
        setUrl(location.pathname);
    }, 0);

    return (
        <>
            {display && (<Loader />)}

            {(pathArr[pathArr.length - 1] === 'profile' || (pathArr[pathArr.length - 2] === 'profile' && pathArr[pathArr.length - 1] === '')) && <Profile />}
            {(pathArr[pathArr.length - 1] === 'account' || (pathArr[pathArr.length - 2] === 'account' && pathArr[pathArr.length - 1] === '')) && <Account isChatOpen={isChatOpen} setCurrentPanel={setCurrentPanel} />}

            {(pathArr[pathArr.length - 1] === 'password' || (pathArr[pathArr.length - 2] === 'password' && pathArr[pathArr.length - 1] === '')) && <RightSideBody element={<ChangePassword />} tag={'Change Password'} url={(isChatOpen == undefined) ? '/setting/mobile/account' : '/setting/account'} />}

            {(pathArr[pathArr.length - 1] === '2fa' || (pathArr[pathArr.length - 2] === '2fa' && pathArr[pathArr.length - 1] === '')) && <RightSideBody element={<TwoFactorAuthentication />} tag={'Two Step Authentication'} url={(isChatOpen == undefined) ? '/setting/mobile/account' : '/setting/account'} />}


            {(pathArr[pathArr.length - 1] === 'verification' || (pathArr[pathArr.length - 2] === 'verification' && pathArr[pathArr.length - 1] === '')) && <RightSideBody element={<EmailVerification />} tag={'Email Phone Verification'} url={(isChatOpen == undefined) ? '/setting/mobile/account' : '/setting/account'} />}

            {(pathArr[pathArr.length - 1] === 'active-session' || (pathArr[pathArr.length - 2] === 'active-session' && pathArr[pathArr.length - 1] === '')) && <RightSideBody element={<ActiveSession />} tag={'Active Session'} url={(isChatOpen == undefined) ? '/setting/mobile/account' : '/setting/account'} />}

            {(pathArr[pathArr.length - 1] === 'privacy' || (pathArr[pathArr.length - 2] === 'privacy' && pathArr[pathArr.length - 1] === '')) && <RightSideBody element={<Privacy isChatOpen={isChatOpen} setCurrentPanel={setCurrentPanel} />} tag={'PRIVACY'} url={'/setting/privacy'} />}




            {(pathArr[pathArr.length - 1] === 'last-seen' || (pathArr[pathArr.length - 2] === 'last-seen' && pathArr[pathArr.length - 1] === '')) && <RightSideBody element={<LastSeen />} tag={'Last Seen & Online Status'} url={(isChatOpen == undefined) ? '/setting/mobile/privacy' : '/setting/privacy'} />}


            {(pathArr[pathArr.length - 1] === 'readreceipt' || (pathArr[pathArr.length - 2] === 'readreceipt' && pathArr[pathArr.length - 1] === '')) && <RightSideBody element={<ReadReceipt />} tag={'Read Receipt'} url={(isChatOpen == undefined) ? '/setting/mobile/privacy' : '/setting/privacy'} />}

            {(pathArr[pathArr.length - 1] === 'profileprivacy' || (pathArr[pathArr.length - 2] === 'profileprivacy' && pathArr[pathArr.length - 1] === '')) && <RightSideBody element={<ProfilePrivacy />} tag={'Profile Photo & About'} url={(isChatOpen == undefined) ? '/setting/mobile/privacy' : '/setting/privacy'} />}


            {(pathArr[pathArr.length - 1] === 'blockuser' || (pathArr[pathArr.length - 2] === 'blockuser' && pathArr[pathArr.length - 1] === '')) && <RightSideBody element={<BlockedUser />} tag={'Blocked Users'} url={(isChatOpen == undefined) ? '/setting/mobile/privacy' : '/setting/privacy'} />}

        </>




    )
}

export default SettingRightPanel