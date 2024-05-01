import React, {useState} from 'react';
import './login.css';
import {useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getFirestore, doc, setDoc} from "firebase/firestore";
import '@fortawesome/fontawesome-free/css/all.min.css';
import pageOne from "./pageOne";


// Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyAB75Ak27jhVn_i7oC9jrDf0TrO5Ln6Su8",
    authDomain: "chainguard-1654e.firebaseapp.com",
    projectId: "chainguard-1654e",
    storageBucket: "chainguard-1654e.appspot.com",
    messagingSenderId: "563544549458",
    appId: "1:563544549458:web:75a526eab13412c538d78b"
};



function App() {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const [name, setName] = useState('');
    const [IDnumber, setIDnumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true);
    const auth = getAuth();
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    const signup = async () => {
        // validation code here
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", email), {
                email: email,
                fullname: name,
                id_Number: IDnumber,
                password: password,
                phoneNo: phoneNumber,
                url: "", // profileda avatar için ama gereksiz biraz
                role: "admin", //burada desktopta gireni  direkt admin yapıyorum
                last_login: new Date().toLocaleString() + ""
            });

            alert("Signup successful");

        } catch (error) {
            console.error("Error signing up:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const login = async () => {
        // validation code here
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('User Logged In');
            navigate("/pageOne");
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };

    const logout = async () => {
        try {

            await auth.signOut();

            navigate("/login");
        } catch (error) {
            console.error("Error signing out:", error);
            alert("An error occurred. Please try again.");
        }
    };


    return (
        <div className={`container-login ${isSignUp ? '' : 'right-panel-active'}`} id="container">
            <div className="form-container sign-up-container">
                <form>
                    <h1>Create Account</h1>
                    {/* Form alanları */}
                    <button type="button" onClick={signup}>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form>
                    <h1>Sign In</h1>
                    {/* Form alanları */}
                    <button type="button" onClick={login}>Sign In</button>
                </form>
            </div>
            <div className="overlay-container" id="overlayCon">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome back!</h1>
                        <p>Please signin with your mail or another accounts</p>
                        <button onClick={toggleForm}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h2>Welcome to ChainGuard!</h2>
                        <p> Don't have an account?</p>
                        <button onClick={toggleForm}> Sign Up</button>
                    </div>
                </div>
                <button id="overlayBtn" onClick={toggleForm}></button>
            </div>
            {/* Çıkış butonu */}
            <button className="logout-button" onClick={logout}>Logout</button>
        </div>
    );
}

export default App;
