import React, { useEffect } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { connectGoogleAccount, getSocial } from '../../actions/auth';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

const ConnectGoogleAccount = (props) => {
    const [state, setState] = React.useState({
        password: "", confirmPassword: "", exists: false, social: {}
    });

    const navigate = useNavigate();
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
        await props.connectGoogleAccount(id);
        navigate('/')

    }

    console.log(props.state)
    if (!state.exists) {
        return <div>404 </div>
    }
    else {
        return (<div className="auth">
            <h1 className="auth-header">Do you want to connect your google account?</h1>
            <div onSubmit={onSubmit} className="auth-form" autoComplete="no" >

                <p className="auth-form-title-2"></p>
                <div className="auth-form-user">
                    <img src={state.social.image} alt={state.social.name} />
                    <p>{state.social.name}</p>
                </div>

                <button onClick={onSubmit} className="button-large">Connect Google Account</button>
            </div>
        </div>
        )
    }

}



const mapDispatch = (dispatch) => {
    return {
        connectGoogleAccount: async (options) => await connectGoogleAccount(dispatch, options)
    }
}
export default connect((state) => { return { state: state } }, mapDispatch)(ConnectGoogleAccount)