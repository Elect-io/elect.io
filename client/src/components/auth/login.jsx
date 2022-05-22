import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';

const Login = (props) => {
    return (<div className="auth">
            <h1 className="auth-header">Welcome to elect.io</h1>
            <form className="auth-form" autoComplete={false} >
                <p className="auth-form-title">Sign In</p>
                <div className="auth-form-content">
                    <input className="auth-form-input" type="email" placeholder="Email" />
                    <input className="auth-form-input" type="password" placeholder="Password" />
                </div>
                <Link to="/profile/forgot-password" className="auth-form-forgot">Forgot your password?</Link>
                <button className="button-large">Sign In</button>
            </form>
            <div className="auth-google">
                <div className="auth-google-or">OR</div>
                <GoogleIcon className="auth-google-icon" />
            </div>
            <p className="auth-redirect">
                New To elect.io? <Link to="/profile/sign-up" className="auth-redirect-link">Create Account</Link>
            </p>
    </div>
    )
}

export default Login