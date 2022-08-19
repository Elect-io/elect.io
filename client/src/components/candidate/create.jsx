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

const CreateCandidate = (props) => {
    
    const navigate = useNavigate();
    let keys = ['Name', 'Gender Identity', "Religion", "Sexual Orientation", "Political Affiliation", "Race", "Gender", "Date Of Birth", "State", "Country"];
    let trueKeys = {
        Name: "name",
        "Gender Identity": "genderIdentity",
        Religion: 'religion',
        "Sexual Orientation": "sexualOrientation",
        Race: "race",
        "Date Of Birth": "dateOfBirth",
        Gender: "gender",
        State: "state",
        Country: "country",
        "Political Affiliation": "partyAffiliation"
    }
    let lists = {
        race: listOfRaces,
        religion: listOfReligions,
        sexualOrientation: listOfSexualities,
        gender: listOfGenders,
        genderIdentity: listOfGenderIdentities,
        country: listOfCountries,
        state: listOfAmericanStates
    }
    const [dropDown, setDropDown] = React.useState(null);
    const [parties, setParties] = React.useState([]);
    const [state, setState] = React.useState({
        name: "", //
        picture: "", //
        dateOfBirth: "",
        country: '', //
        state: '', //
        race: '', //
        sexualOrientation: "", //
        gender: "", //
        religion: "", //
        genderIdentity: "", //
        partyAffiliation: { name: '' }
    })
    return (
        <div className="profile">
            <h1 className="auth-header">Create Candidate Profile</h1>
            <div className="profile-header">
                <div className="profile-header-left">
                    <input className="auth-form-input-hidden" onChange={(e) => {
                        GetImage(e.target.files[0], setState, 'picture')
                    }} id="profile" type="file" placeholder="Password" />


                    {!state.picture ? <label htmlFor="profile" className="auth-form-input-profile"> <p>Choose a profile picture</p>
                        <AddCircleOutlineIcon className="auth-form-input-profile-icon" /></label> :
                        <div className="auth-form-input-profile">
                            <img className="auth-form-input-profile-image" src={state.picture} alt="profile" />
                            <div className="auth-form-input-profile-cross" onClick={() => setState({ ...state, picture: null })}><CancelIcon className="auth-form-input-profile-cross-icon" /></div>
                        </div>}
                    {/* <img className="profile-header-left-image" src={props.profile.picture} alt={props.profile.name} /> */}

                </div>
            </div>
            <div className="profile-edit">
                {keys.map(a => {
                    if (a === "Name") {
                        return (<div className="profile-edit-each"> <p className="profile-edit-each-title">{a}</p><span className="profile-edit-each-container"><input className="auth-form-input" name={trueKeys[a]} value={state[trueKeys[a]]} onChange={(e) => {
                            setState(state => ({ ...state, [trueKeys[a]]: e.target.value }))
                        }} type="text" placeholder={a} /></span></div>)
                    }
                    else if (a === "Date Of Birth") {
                        return (<div className="profile-edit-each"> <p className="profile-edit-each-title">{a}</p><span className="profile-edit-each-container"><input min="1905-01-01" max="2003-01-01" type="date" className="auth-form-input" name={trueKeys[a]} value={state[trueKeys[a]]} onChange={(e) => {
                            setState(state => ({ ...state, [trueKeys[a]]: e.target.value }))
                        }} placeholder={a} /></span></div>)
                    }
                    else if (a === "Political Affiliation") {

                        return (<div className="profile-edit-each"> <p className="profile-edit-each-title">{a}</p><span className="profile-edit-each-container"><input className="auth-form-input" name={trueKeys[a]} value={state[trueKeys[a]].name} onChange={async (e) => {
                            setState(state => ({ ...state, [trueKeys[a]]: { ...state[trueKeys[a]], name: e.target.value } }))
                            setDropDown(trueKeys[a]);
                            console.log(state["partyAffiliation"])
                            if (state.country) {
                                let res = await axios.get(`/api/party/search/${state.country}/${e.target.value}`);
                                console.log(res);
                                setParties(res.data.party);
                            }
                            else {
                                let res = await axios.get(`/api/party/search/all/${e.target.value}`);
                                setParties(res.data.party);
                                console.log(res)
                            }

                        }} type="text" placeholder={a} /></span>

                            <div className="profile-dropdown" style={{ opacity: dropDown === trueKeys[a] ? 100 : 0, visibility: dropDown === trueKeys[a] ? 'visible' : 'hidden' }}>
                                {parties.map(item => {
                                    return <p class="profile-dropdown-each" onClick={() => {
                                        setState(state => ({ ...state, [trueKeys[a]]: item }));
                                        setDropDown(null);
                                    }}>{item.name}</p>
                                })}
                            </div>

                        </div>)

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
                let res = await axios.post('/api/politician', state);
                navigate(`/candidate/${res.data.politician._id}`);
            }}>Save</button>
        </div>
    )
}

export default connect(mapStateToProps)(CreateCandidate)
