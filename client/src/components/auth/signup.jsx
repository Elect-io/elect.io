import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GetImage from '../../actions/getImage';
import CancelIcon from '@mui/icons-material/Cancel';

const Signup = (props) => {
    const [state, setState] = React.useState({ email: "", password: "", confirmPassword: "", name: "", image: "" });
    const onChange = (e) => {
        setState(state => ({ ...state, [e.target.name]: e.target.value }));
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(state);
        // await props.login(state);
    }

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
                    <div className="auth-form-input-profile-cross" onClick={()=>setState({...state, image: null})}><CancelIcon className="auth-form-input-profile-cross-icon" /></div>
                </div>}
            <div className="auth-form-content">
                <input className="auth-form-input" name="password" onChange={onChange} value={state.password} type="password" placeholder="Password" />
                <input className="auth-form-input" type="password" placeholder="Re-Enter Password" name="confirmPassword" onChange={onChange} value={state.confirmPassword} />
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