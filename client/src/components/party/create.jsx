import { connect } from 'react-redux'
import React from 'react';
import axios from 'axios';
import GetImage from '../../actions/getImage';

import { Link, useNavigate } from 'react-router-dom';
import listOfCountries from '../../util/listOfCountries.ts';
import listOfAmericanStates from '../../util/listOfAmericanStates.ts';
import listOfGenderIdentities from '../../util/listOfGenderIdentities.ts';
import listOfGenders from '../../util/listOfGenders.ts';
import listOfSexualities from '../../util/listOfSexualities.ts';
import listOfReligions from '../../util/listOfReligions.ts';
import listOfRaces from '../../util/listOfRaces.ts';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

const mapStateToProps = (state) => {
    return {
        user: state.profile.user,
        profile: state.profile.profile,
        adminLevel: state.profile.user.admin
    }
}

const CreateParty = (props) => {

    const navigate = useNavigate();
    let keys = ['Name',  "Color", "Common Name", "More Details",  "Country"]
    let trueKeys = {
        Name: "name",
        Symbol: "symbol",
        Color: 'color',
        "Common Name": 'commonName',
        "More Details": 'moreDetails',
        Country: "country",
    }
    let lists = {
        country: listOfCountries,
        state: listOfAmericanStates
    }
    const [dropDown, setDropDown] = React.useState(null);
    const [parties, setParties] = React.useState([]);
    const [state, setState] = React.useState({
        name: '',
        symbol: '',
        color: '',
        commonName: '',
        moreDetails: '',
        country: 'The United States of America',
    })
    return (
        <div className="profile">
            <h1 className="auth-header">Create Political Party</h1>
            <div className="profile-header">
                <div className="profile-header-left">
                    <input className="auth-form-input-hidden" onChange={(e) => {
                        GetImage(e.target.files[0], setState, 'symbol')
                    }} id="profile" type="file" placeholder="Password" />


                    {!state.symbol ? <label htmlFor="profile" className="auth-form-input-profile"> <p>Choose a Symbol</p>
                        <AddCircleOutlineIcon className="auth-form-input-profile-icon" /></label> :
                        <div className="auth-form-input-profile">
                            <img className="auth-form-input-profile-image" src={state.symbol} alt="profile" />
                            <div className="auth-form-input-profile-cross" onClick={() => setState({ ...state, symbol: null })}><CancelIcon className="auth-form-input-profile-cross-icon" /></div>
                        </div>}
                    {/* <img className="profile-header-left-image" src={props.profile.picture} alt={props.profile.name} /> */}

                </div>
            </div>
            <div className="profile-edit">
                {keys.map(a => {
                    if (a === "Name" || a==="Color" || a === "More Details" || a === "Common Name") {
                        return (<div className="profile-edit-each"> <p className="profile-edit-each-title">{a}</p><span className="profile-edit-each-container"><input className="auth-form-input" name={trueKeys[a]} value={state[trueKeys[a]]} onChange={(e) => {
                            setState(state => ({ ...state, [trueKeys[a]]: e.target.value }))
                        }} type="text" placeholder={a} /></span></div>)
                    }


                    else {
                        return (
                            <div className="profile-edit-each">

                                <p className="profile-edit-each-title">{a}</p><span className="profile-edit-each-container"><div className="profile-edit-each-dropdown" onClick={(e) => {
                                    if (dropDown === trueKeys[a]) {
                                        setDropDown(null);
                                    }
                                    else {
                                        setDropDown(trueKeys[a]);
                                    }
                                }} value={props.profile[trueKeys[a]]} type="text" placeholder={a}><p>{state[trueKeys[a]] ? state[trueKeys[a]] : a}</p>


                                </div></span>

                                <div className="profile-dropdown" style={{ opacity: dropDown === trueKeys[a] ? 100 : 0, visibility: dropDown === trueKeys[a] ? 'visible' : 'hidden' }}>
                                    {lists[trueKeys[a]].map(item => {
                                        return <p class="profile-dropdown-each" onClick={() => {
                                            setState(state => ({ ...state, [trueKeys[a]]: item }));
                                            setDropDown(null);
                                        }}>{item}</p>
                                    })}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>

            <button className="button-sm" onClick={async () => {
                let res = await axios.post('/api/party', state);
                navigate(`/party/${res.data.party._id}`);
            }}>Save</button>
        </div>
    )
}

export default connect(mapStateToProps)(CreateParty)
