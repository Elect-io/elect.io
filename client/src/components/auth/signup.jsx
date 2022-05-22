import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Signup = (props) => {
    return (<div className="auth">
        <h1 className="auth-header">Welcome to elect.io</h1>
        <form className="auth-form" autoComplete={false} >
            <p className="auth-form-title">Sign Up</p>
            <div className="auth-form-content">
                <input className="auth-form-input" type="string" placeholder="Name" />

                <input className="auth-form-input" type="email" placeholder="Email" />
            </div>
            <input className="auth-form-input-hidden" id="profile" type="file" placeholder="Password" />

            <label htmlFor="profile" className="auth-form-input-profile">
                <p>Choose a profile picture</p>
                <AddCircleOutlineIcon className="auth-form-input-profile-icon"/>
            </label>
            <div className="auth-form-content">
                <input className="auth-form-input" type="password" placeholder="Password" />
                <input className="auth-form-input" type="password" placeholder="Re-Enter Password" />
            </div>

            <p className="auth-form-forgot"></p>
            <button className="button-large">Sign Up</button>
        </form>
        <div className="auth-google">
            <div className="auth-google-or">OR</div>
            <GoogleIcon className="auth-google-icon" />
        </div>
        <p className="auth-redirect">
            Already have an account? <Link to="/profile/login" className="auth-redirect-link">Sign In</Link>
        </p>
    </div>
    )
}

export default Signup