import React, { useState } from 'react';
import './pageOne.css';
import { IonIcon } from '@ionic/react';
import {
    homeOutline,
    personOutline,
    cubeOutline,
    logOutOutline,
    menuOutline,
    closeOutline,
} from 'ionicons/icons';
import {useNavigate} from "react-router-dom";
import QrCodeGenerator from "./QrCodeGenerator";

function PageOne() {
    const [isActive, setIsActive] = useState(false);
    const [selectedTab, setSelectedTab] = useState('');
    const navigate = useNavigate();
    const handleToggle = () => {
        setIsActive(!isActive);
    };

    const handleNavigation = (tab) => {
        setSelectedTab(tab);
        if (tab === 'logout') {
           navigate()
        } else if (tab === 'profile') {
            navigate("/profile")
        }
    };

    const createBoxStyle = selectedTab === 'createBox' ? {
        position: 'fixed',

        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    } : { display: 'none' };


    return (
        <div>
            <div className="navigation">
                <ul>
                    <li className="list active">
                        <b></b>
                        <b></b>
                        <a href="profile.js">
                            <span className="icon" ><IonIcon
                                icon={homeOutline}/></span>
                            <span className="title">Home</span>
                        </a>
                    </li>
                    <li className="list" id="profile" onClick={() => handleNavigation('profile')}>
                        <b></b>
                        <b></b>
                        <a href="#">
                            <span className="icon"><IonIcon icon={personOutline}/></span>
                            <span className="title">Profile Settings</span>
                        </a>
                    </li>
                    <li className="list" id="createBox">
                        <b></b>
                        <b></b>
                        <a href="#">
                            <span className="icon" onClick={() => handleNavigation('createBox')}><IonIcon
                                icon={cubeOutline}/></span>
                            <span className="title">Create Box</span>
                        </a>
                    </li>
                    <li className="list" id="logout" onClick={() => handleNavigation('logout')}>
                        <b></b>
                        <b></b>
                        <a href="#">
                            <span className="icon"><IonIcon icon={logOutOutline}/></span>
                            <span className="title">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="toggle">
                <IonIcon className={isActive ? 'open' : ''} onClick={handleToggle}/>
                <IonIcon  className={!isActive ? 'close' : ''} onClick={handleToggle}/>
            </div>
            <div className="create-box-container" >
                <QrCodeGenerator/>
            </div>

        </div>
    );

    }
    export default PageOne;
