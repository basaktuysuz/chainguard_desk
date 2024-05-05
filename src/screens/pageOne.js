import React, {useState, useEffect} from 'react';
import '../styles/pageOne.css';
import {IonIcon} from '@ionic/react';
import {
    homeOutline,
    personOutline,
    cubeOutline,
    logOutOutline, menuOutline,
} from 'ionicons/icons';
import {useNavigate} from "react-router-dom";
import QrCodeGenerator from "./QrCodeGenerator";
import "firebase/auth";

function PageOne() {
    const [isActive, setIsActive] = useState(false);
    const [selectedTab, setSelectedTab] = useState('');
    const [profileData, setProfileData] = useState({
        email: '',
        fullname: '',
        id_Number: '',
        last_login: '',
        role: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Simulated profile data
        const dummyProfileData = {
            email: '',
            fullname: '',
            id_Number: '',
            last_login: '',
            role: ''
        };
        setProfileData(dummyProfileData); // Set initial profile data
    }, []);

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    const handleNavigation = (tab) => {
        setSelectedTab(tab);
        if (tab === 'logout') {
            navigate("/App");
        } else if (tab === 'profile') {
            setSelectedTab('profile');
        } else if (tab === 'home') {
            setSelectedTab('home');
        }

        // Add 'active' class to the clicked tab
        const listItems = document.querySelectorAll('.list');
        listItems.forEach(item => item.classList.remove('active'));
        const clickedItem = document.querySelector(`#${tab}`);
        if (clickedItem) {
            clickedItem.classList.add('active');
        }
    };
    const logout = async () => {
        try {
            navigate("/login");

        } catch (error) {
            console.error("Error signing out:", error);
            alert("An error occurred. Please try again.");
        }
    };
    return (
        <div>
            <div className={`navigation ${isActive ? 'active' : ''}`}>
                <ul>
                    <li className={`list ${selectedTab === 'home' ? 'active' : ''}`} id="home"
                        onClick={() => handleNavigation('home')}>
                        <b></b>
                        <b></b>
                        <a href="#">
                            <span className="icon"><IonIcon icon={homeOutline}/></span>
                            <span className="title">Home</span>
                        </a>
                    </li>
                    <li className={`list ${selectedTab === 'profile' ? 'active' : ''}`} id="profile"
                        onClick={() => handleNavigation('profile')}>
                        <b></b>
                        <b></b>
                        <a href="#">
                            <span className="icon"><IonIcon icon={personOutline}/></span>
                            <span className="title">Profile Settings</span>
                        </a>
                    </li>
                    <li className={`list ${selectedTab === 'createBox' ? 'active' : ''}`} id="createBox"
                        onClick={() => handleNavigation('createBox')}>
                        <b></b>
                        <b></b>
                        <a href="#">
                            <span className="icon"><IonIcon icon={cubeOutline}/></span>
                            <span className="title">Create Box</span>
                        </a>
                    </li>
                    <li className={`list ${selectedTab === 'logout' ? 'active' : ''}`} id="logout" onClick={logout}>
                        <b></b>
                        <b></b>
                        <a href="#">
                            <span className="icon"><IonIcon icon={logOutOutline}/></span>
                            <span className="title">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <ion-icon name="menu-" className="open"></ion-icon>
                <ion-icon name="close-outline" className="close"></ion-icon>
                <div className="toggle" onClick={handleToggle}>
                    <IonIcon icon={menuOutline}/></div>
            </div>

            {selectedTab === 'home' && (
                <div className="welcome-message">
                    <h1>Welcome to ChainGuard</h1>

                    <img src="/logo.png" alt="ChainGuard Logo"/>
                </div>
            )}

            {selectedTab === 'profile' && (
                <div className="profile-container">
                    <h1>Personal Information</h1>
                    <form className="profile-form">
                        <div className="form-group">
                            Email: <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            readOnly
                            className="profile-input"
                        />
                        </div>
                        <div className="form-group">
                            <text>Full Name:</text>
                            <input
                                type="text"
                                name="fullname"
                                value={profileData.fullname}
                                readOnly
                                className="profile-input"
                            />
                        </div>
                        <div className="form-group">
                            <text>ID Number:</text>
                            <input
                                type="text"
                                name="id_Number"
                                value={profileData.id_Number}
                                readOnly
                                className="profile-input"
                            />
                        </div>
                        <div className="form-group">
                            <text>Last Login:</text>
                            <input
                                type="text"
                                name="last_login"
                                value={profileData.last_login}
                                readOnly
                                className="profile-input"
                            />
                        </div>
                        <div className="form-group">
                            <text>Role:</text>
                            <input
                                type="text"
                                name="role"
                                value={profileData.role}
                                readOnly
                                className="profile-input"
                            />
                        </div>
                    </form>
                </div>
            )}

            {selectedTab === 'createBox' && (
                <div className="create-box-container">
                    <QrCodeGenerator/>
                </div>
            )}
        </div>
    );
}

export default PageOne;
