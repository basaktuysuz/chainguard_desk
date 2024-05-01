import React, {useEffect, useState} from 'react';
import '../styles/profile.css'; // Importing the CSS file for styling
import {firebaseConfig} from './App';
import {initializeApp} from "firebase/app";
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
        email: '',
        fullname: '',
        id_Number: '',
        last_login: '',
        password: '',
        phoneNo: '',
        role: '',
        url: ''
    });


    useEffect(() => {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);  // Get the authenticated user
        const db = getFirestore(app);
        const firebaseUser = auth.currentUser;

        if (firebaseUser) {
            console.log("User is authenticated:", firebaseUser.uid);

            const profileRef = doc(db, "users", firebaseUser.email);

            getDoc(profileRef).then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    setProfileData(docSnapshot.data());
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        } else {
            console.log("User not authenticated!");
        }

    }, []);
    return (
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
                    <text>Full Name:
                    </text>

                    <input
                        type="text"
                        name="fullname"
                        value={profileData.fullname}
                        readOnly
                        className="profile-input"
                    />
                </div>
                <div className="form-group">
                <text>ID Number:
                    </text>

                    <input
                        type="text"
                        name="id_Number"
                        value={profileData.id_Number}
                        readOnly
                        className="profile-input"
                    />
                </div>
                <div className="form-group">
                    <text>Last Login:
                    </text>

                    <input
                        type="text"
                        name="last_login"
                        value={profileData.last_login}
                        readOnly
                        className="profile-input"
                    />
                </div>
                <div className="form-group">
                    <text>Password:
                    </text>

                    <input
                        type="password"
                        name="password"
                        value="********"  // Displaying asterisks for security
                        readOnly
                        className="profile-input"
                    />
                </div>
                <div className="form-group">
                    <text>Phone Number:
                    </text>

                    <input
                        type="tel"
                        name="phoneNo"
                        value={profileData.phoneNo}
                        readOnly
                        className="profile-input"
                    />
                </div>
                <div className="form-group">
                    <text>Role
                    </text>

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
    );
};

export default ProfilePage;