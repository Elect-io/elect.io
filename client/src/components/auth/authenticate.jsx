import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { dispatchToken } from '../../actions/auth';
import { useParams, useNavigate } from "react-router-dom";

const ConnectGoogleAccount = (props) => {
    const [state, setState] = React.useState({
        password: "", confirmPassword: "", exists: false, social: {}
    });
    const navigate = useNavigate();
    const { token } = useParams();
    useEffect(() => {
        (async () => {
            const social = await props.authenticate(token);
            navigate('/');
        })();
    }, []);


    console.log(props.state)
    if (!state.exists) {
        return <div>404 </div>
    }
    else {
        return (<div className="auth">

        </div>
        )
    }

}



const mapDispatch = (dispatch) => {
    return {
        authenticate: async (options) => await dispatchToken(dispatch, options)
    }
}
export default connect((state) => { return { state: state } }, mapDispatch)(ConnectGoogleAccount)