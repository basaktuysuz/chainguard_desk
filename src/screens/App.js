import React, {useState} from 'react';
import '../styles/login.css';
import {useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getFirestore, doc, setDoc} from "firebase/firestore";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Credentials } from "realm-web";

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
// Creating a Realm App Instance
   const app3 = new app("application-0-hzldcca");

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
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
            'http://localhost:5000/register', {
                method: "post",
                body: JSON.stringify({ name, email }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setEmail("");
            setName("");

        }
    }
    const signup = async (email, password) => {
        // validation code here

        // Function to sign up user into our App Service app using their email & password

            try {
                await app.emailPasswordAuth.registerUser(email, password);
                // Since we are automatically confirming our users, we are going to log in
                // the user using the same credentials once the signup is complete.
                return app3.emailPasswordLogin(email, password);
            } catch (error) {
                throw error;

        };


      /*  try {
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

       */
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




    return (
        <div className={`container-login ${isSignUp ? '' : 'right-panel-active'}`} id="container">
            <div className="form-container sign-up-container">
                <form>
                    <h1>Create Account</h1>
                    <div className="infield">
                        <input type="text" placeholder="FullName" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="infield">
                        <input type="email" placeholder="E-Mail" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="infield">
                        <input type="password" placeholder="Password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="infield">
                        <input type="tel" placeholder="ID number" value={IDnumber}
                               onChange={(e) => setIDnumber(e.target.value)}/>
                    </div>
                    <div className="infield">
                        <input type="tel" placeholder="Phone Number" value={phoneNumber}
                               onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>
                    <button type="button" onClick={handleOnSubmit}>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form>
                    <h1>Sign In</h1>
                    <div className="social-container">
                        <a href="https://www.facebook.com" target="_blank">
                            <i className="fab fa-facebook-f" style={{color: '#3b5998'}}></i>
                        </a>
                        <a href="https://appleid.apple.com/sign-in" target="_blank">
                            <i className="fab fa-apple" style={{color: 'black'}}></i>
                        </a>
                        <a href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmyaccount.google.com%3Futm_source%3Daccount-marketing-page%26utm_medium%3Dgo-to-account-button&ifkv=ATuJsjwB4FtJqKi7JYQGrVE95rawSV39pcKJR8itNOvDoXVkeJKuSOmuskHLZh3gKUwkuKZRzUvb3Q&service=accountsettings&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S218691251%3A1709918989733647&theme=mn"
                           target="_blank">
                            <i className="fab fa-google" style={{color: '#DB4437'}}></i>
                        </a>
                    </div>
                    <span>or use your account</span>
                    <div className="infield">
                        <input type="email" placeholder="E-Mail"/>
                    </div>
                    <div className="infield">
                        <input type="password" placeholder="Password"/>
                    </div>
                    <a href="#" className="forgot">Forgot your password?</a>
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
        </div>
    );
}

export default App;
