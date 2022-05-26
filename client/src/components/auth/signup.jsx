import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GetImage from '../../actions/getImage';
import CancelIcon from '@mui/icons-material/Cancel';
import { connect } from 'react-redux';
import { getGoogleLink, signup } from '../../actions/auth';
import validateEmail from '../../actions/checkEmail';
const Signup = (props) => {
    const [state, setState] = React.useState({ email: "", password: "", confirmPassword: "", name: "", image: "" });
    const [alert, setAlert] = React.useState("");

    const onChange = (e) => {
        setState(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        setAlert('');
        if (!validateEmail(state.email)) {
            setAlert("*Invalid Email")
            return;
        }
        if (state.password.length < 8) {
            setAlert("*Your password should be at least 8 characters long")
            return;
        }
        if (state.password !== state.confirmPassword) {
            setAlert("*Your passwords don't match")
            return;
        }
        if (state.name.length < 1) {
            setAlert("*Please enter a name");
            return;
        }
        try {
            console.log(state);
            await props.onSignUp(state);
            navigate('/');
        }
        catch (err) {
            setAlert(err);
        }
        // await props.login(state);
    }
    console.log(props.state)
    return (<div className="auth">
        <h1 className="auth-header">Welcome to elect.io</h1>
        <form className="auth-form" onSubmit={onSubmit}>
            <p className="auth-form-title">Sign Up</p>
            <div className="auth-form-content">
                <input className="auth-form-input" name="name" onChange={onChange} value={state.name} type="string" placeholder="Name" />

                <input className="auth-form-input" name="email" onChange={onChange} value={state.email} type="email" placeholder="Email" />
            </div>
            <input className="auth-form-input-hidden" onChange={(e) => {
                GetImage(e.target.files[0], setState)
            }} id="profile" type="file" placeholder="Password" />


            {!state.image ? <label htmlFor="profile" className="auth-form-input-profile"> <p>Choose a profile picture</p>
                <AddCircleOutlineIcon className="auth-form-input-profile-icon" /></label> :
                <div className="auth-form-input-profile">
                    <img className="auth-form-input-profile-image" src={state.image} alt="profile" />
                    <div className="auth-form-input-profile-cross" onClick={() => setState({ ...state, image: null })}><CancelIcon className="auth-form-input-profile-cross-icon" /></div>
                </div>}
            <div className="auth-form-content">
                <input className="auth-form-input" name="password" onChange={onChange} value={state.password} type="password" placeholder="Password" />
                <input className="auth-form-input" type="password" placeholder="Re-Enter Password" name="confirmPassword" onChange={onChange} value={state.confirmPassword} />
            </div>

            {alert.length > 0 ? <p className="auth-form-alert">{alert}</p> : null}
            <p className="auth-form-forgot"></p>
            <button className="button-large">Sign Up</button>
        </form>
        <div className="auth-google">
            <div className="auth-google-or">OR</div>
            <GoogleIcon onClick={async () => {
                document.location.href = await getGoogleLink()
            }} className="auth-google-icon" />
        </div>
        <p className="auth-redirect">
            Already have an account? <Link to="/profile/login" className="auth-redirect-link">Sign In</Link>
        </p>
    </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return ({
        onSignUp: async (options) => await signup(dispatch, options)
    })
}
export default connect((state) => { return { state } }, mapDispatchToProps)(Signup)