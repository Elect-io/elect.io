import React from 'react';
import { Link } from 'react-router-dom';
import BackArrow from '../../icons/u_arrow-circle-right';
const ForgotPassword = (props) => {
    return (<div className="auth auth-2">
        <Link to="/profile/login" className="auth-back"><BackArrow className="auth-back-icon" /> <p className="auth-back-text">Back</p></Link>
        <h1 className="auth-header">Reset Password</h1>

        <p className="auth-form-title-2">We'll send you an email that'll allow you to reset your password</p>
        <form className="auth-form" autoComplete={false} >
            <div className="auth-form-content">
                <input className="auth-form-input" type="email" placeholder="Email" />
            </div>

            <p className="auth-form-forgot"></p>
            <button className="button-large">Send Recovery Email</button>
        </form>
    </div>
    )
}

export default ForgotPassword