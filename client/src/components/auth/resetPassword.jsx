import React, { useEffect } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { finishReset, getReset } from '../../actions/auth';
import axios from 'axios';

import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = (props) => {
    const [state, setState] = React.useState({
        password: "", confirmPassword: "", exists: false, user: {}, profile: {}
    });
    const [alert, setAlert] = React.useState("");
    const { id } = useParams();
    useEffect(() => {
        (async () => {
            const { user, profile } = await getReset(id);
            setState(state => ({ ...state, user, profile, exists: true }));
        })();
    }, []);

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (state.password.length < 8) {
            setAlert("*Your password should be at least 8 characters long")
            return;
        }
        if (state.password !== state.confirmPassword) {
            setAlert("*Your passwords don't match")
            return;
        }
        try {
            await props.reset({ password: state.password, id })
            navigate('/')
        }
        catch (err) {
            setAlert(err);
        }

    }
    const onChange = (e) => {
        setState(state => ({ ...state, [e.target.name]: e.target.value }));
    }
    console.log(props.state)
    if (!state.exists) {
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

            {alert.length > 0 ? <p className="auth-form-alert">{alert}</p> : null}
            <Link to="/profile/login" className="auth-form-forgot">Want to login instead?</Link>
            <button className="button-large">Reset Password</button>
        </form>
    </div>
    )
}



const mapDispatch = (dispatch) => {
    return {
        reset: async (options) => await finishReset(dispatch, options)
    }
}
export default connect((state) => { return { state: state } }, mapDispatch)(ResetPassword)