import { useContext, useState } from 'react';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';


function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    })

    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: '/' } };


    // google sign in 
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }
    // google sign out a
    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }

    // handle change event
    const handleBlur = (event) => {

        let isFormValid = true;
        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);

        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user }
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }

    }
    // handle submit event
    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        event.preventDefault();
    }

    // handle response 
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
    }


    return (
        <div style={{ textAlign: 'center' }}>
            <h1 className="login-title">Login</h1>
            <form onSubmit={handleSubmit}>
                <br />
                {newUser && <input className="form-input " type="text" onBlur={handleBlur} placeholder="your name" name="name" required />}
                <br />
                <input className="form-input " type="text" onBlur={handleBlur} name="email" placeholder="your email address" id="" required />
                <br />
                <input className="form-input " type="password" onBlur={handleBlur} name="password" placeholder="your password" id="" required />
                <br />
                <input className="form-input-btn " type="submit" value={newUser ? 'Create Account' : 'Login'} />
            </form>
            <div className="toggle-btn">
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">Create a new account</label>
            </div>
            <div className="display-error">
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Login'} successfully! </p>}
            </div>
            {
                user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button className="google-btn"onClick={googleSignIn}> Sign in by google</button>
            }
        </div>
    );
}

export default Login;
