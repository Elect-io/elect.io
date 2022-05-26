import React from 'react';
import { Link } from 'react-router-dom';
import BackArrow from '../../icons/u_arrow-circle-right';
import { startReset } from '../../actions/auth';

import validateEmail from '../../actions/checkEmail';
const ForgotPassword = (props) => {
    const [state, setState] = React.useState("");
    const [alert, setAlert] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);
    
    return (<div className="auth auth-2">
        <Link to="/profile/login" className="auth-back"><BackArrow className="auth-back-icon" /> <p className="auth-back-text">Back</p></Link>
        <h1 className="auth-header">Reset Password</h1>

        <p className="auth-form-title-2">We'll send you an email that'll allow you to reset your password</p>
        {!submitted?<form className="auth-form" onSubmit={(e) => {
            e.preventDefault();
            setAlert('');
            if (!validateEmail(state)) {
                setAlert("*Please enter a valid email address")
                return;
            }
            try {
                startReset(state);
            }
            catch (e) { }
            setSubmitted(true)
        }} >
            <div className="auth-form-content">
                <input className="auth-form-input" type="email" value={state} onChange={(e) => { setState(e.target.value) }} placeholder="Email" />
            </div>

            {alert.length > 0 ? <p className="auth-form-alert">{alert}</p> : null}
            <p className="auth-form-forgot"></p>
            <button className="button-large">Send Recovery Email</button>
        </form>:
        <p className="auth-form-title-2">If an account with this email exists, we will send you a recovery email. Make sure to check your spam folder</p>}
    </div>
    )
}

export default ForgotPassword