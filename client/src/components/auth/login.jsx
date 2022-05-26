import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGoogleLink, login } from '../../actions/auth';
import validateEmail from '../../actions/checkEmail';
const Login = (props) => {

    const navigate = useNavigate();
    const onSubmit = async (e) => {
        setAlert('');
        e.preventDefault();
        if (!validateEmail(state.email)) {
            setAlert("*Invalid Email")
            return;
        }
        if (state.password.length < 8) {
            setAlert("*Invalid Credentials")
            return;
        }
        try {
            await props.login(state);
            navigate('/')
        }
        catch (err) {
            setAlert(err);
        }
    }
    const [alert, setAlert] = React.useState("");
    const [state, setState] = React.useState({ email: "", password: "" });
    const onChange = (e) => {
        setState(state => ({ ...state, [e.target.name]: e.target.value }));
    }
    return (<div className="auth">
        <h1 className="auth-header">Welcome to elect.io</h1>
        <form onSubmit={onSubmit} className="auth-form" autoComplete="no" >
            <p className="auth-form-title">Sign In</p>
            <div className="auth-form-content">
                <input className="auth-form-input" name="email" onChange={onChange} value={state.email} type="email" placeholder="Email" />
                <input className="auth-form-input" type="password" name="password" onChange={onChange} value={state.password} placeholder="Password" />
            </div>
            {alert.length > 0 ? <p className="auth-form-alert">{alert}</p> : null}
            <Link to="/profile/forgot-password" className="auth-form-forgot">Forgot your password?</Link>
            <button className="button-large">Sign In</button>
        </form>
        <div className="auth-google">
            <div className="auth-google-or">OR</div>
            <GoogleIcon onClick={async () => {
                document.location.href = await getGoogleLink()
            }} className="auth-google-icon" />
        </div>
        <p className="auth-redirect">
            New To elect.io? <Link to="/profile/sign-up" className="auth-redirect-link">Create Account</Link>
        </p>
    </div>
    )
}
const mapDispatch = (dispatch) => {
    return {
        login: async (options) => await login(dispatch, options)
    }
}
export default connect((state) => { return { state: state } }, mapDispatch)(Login)