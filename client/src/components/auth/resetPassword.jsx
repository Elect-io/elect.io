import React, { useEffect } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, getReset } from '../../actions/auth';
import axios from 'axios';
import { useParams } from "react-router-dom";

const ResetPassword = (props) => {
    const [state, setState] = React.useState({
        password: "", confirmPassword: "", exists: false, user: {}, profile: {}
    });
    const { id } = useParams();
    useEffect(() => {
        (async () => {
            const { user, profile } = await getReset(id);
            setState(state => ({ ...state, user, profile, exists: true }));
        })();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);
    }
    const onChange = (e) => {
        this.setState(state => ({ ...state, [e.target.name]: e.target.value }));
    }
    if(!state.exists){
        return <div>404 </div>
    }
    return (<div className="auth">
        <h1 className="auth-header">Reset Password</h1>
        <form onSubmit={onSubmit} className="auth-form" autoComplete="no" >
       
            <p className="auth-form-title-2">Enter a new password</p>
            <div className="auth-form-user">
                <img src={state.profile.picture} alt={state.profile.name} />
                <p>{state.profile.name}</p>
            </div>
            <div className="auth-form-content">
                <input className="auth-form-input" name="password" onChange={onChange} value={state.password} type="password" placeholder="Password" />
                <input className="auth-form-input" type="password" name="confirmPassword" onChange={onChange} value={state.confirmPassword} placeholder="Confirm Password" />
            </div>
            <Link to="/profile/login" className="auth-form-forgot">Want to login instead?</Link>
            <button className="button-large">Reset Password</button>
        </form>
    </div>
    )
}



const mapDispatch = (dispatch) => {
    return {
        reset: async (options) => await login(dispatch, options)
    }
}
export default connect((state) => { return { state: state } }, mapDispatch)(ResetPassword)