import React, { useEffect } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createFromGoogle, getSocial } from '../../actions/auth';
import axios from 'axios';
import { useParams } from "react-router-dom";

const CreateAccountFromGoogle = (props) => {
    const [state, setState] = React.useState({
        password: "", confirmPassword: "", exists: false, social: {}
    });
    const { id } = useParams();
    useEffect(() => {
        (async () => {
            try {
                const social = await getSocial(id);
                if (social) {

                    setState(state => ({ ...state, social, exists: true }));
                }
            }
            catch (err) {

            }
        })();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log(this.state);
        await props.createFromGoogle({ password: state.password, id, name: state.social.name })
    }
    const onChange = (e) => {
        setState(state => ({ ...state, [e.target.name]: e.target.value }));
    }
    console.log(props.state)
    if (!state.exists) {
        return <div>404 </div>
    }
    else {
        return (<div className="auth">
            <h1 className="auth-header">Create Account</h1>
            <form onSubmit={onSubmit} className="auth-form" autoComplete="no" >

                <p className="auth-form-title-2">Enter a password</p>
                <div className="auth-form-user">
                    <img src={state.social.image} alt={state.social.name} />
                    <p>{state.social.name}</p>
                </div>
                <div className="auth-form-content">
                    <input className="auth-form-input" name="password" onChange={onChange} value={state.password} type="password" placeholder="Password" />
                    <input className="auth-form-input" type="password" name="confirmPassword" onChange={onChange} value={state.confirmPassword} placeholder="Confirm Password" />
                </div>
                <span className="auth-form-forgot"></span>
                <button className="button-large">Complete Registration</button>
            </form>
        </div>
        )
    }

}



const mapDispatch = (dispatch) => {
    return {
        createFromGoogle: async (options) => await createFromGoogle(dispatch, options)
    }
}
export default connect((state) => { return { state: state } }, mapDispatch)(CreateAccountFromGoogle)