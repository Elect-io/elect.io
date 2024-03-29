import React from 'react'
import { connect } from 'react-redux'
import { update } from '../../actions/auth';

import listOfCountries from '../../util/listOfCountries.ts';
import listOfAmericanStates from '../../util/listOfAmericanStates.ts';
import listOfGenderIdentities from '../../util/listOfGenderIdentities.ts';
import listOfGenders from '../../util/listOfGenders.ts';
import listOfSexualities from '../../util/listOfSexualities.ts';
import listOfReligions from '../../util/listOfReligions.ts';
import listOfRaces from '../../util/listOfRaces.ts';

import CancelIcon from '@mui/icons-material/Cancel';
import GetImage from '../../actions/getImage';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const EditProfile = (props) => {
    let keys = ['Name', 'Gender Identity', "Religion", "Sexual Orientation", "Race", "Gender", "State", "Country"];
    const [state, setState] = React.useState(props.profile);
    const [dropDown, setDropDown] = React.useState(null);
    let trueKeys = {
        Name: "name",
        "Gender Identity": "genderIdentity",
        Religion: 'religion',
        "Sexual Orientation": "sexualOrientation",
        Race: "race",
        Gender: "gender",
        State: "state",
        Country: "country"
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
    console.log(dropDown)
    return (<div className="profile">
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
            if (state.name !== props.profile.name) {
                await props.update(state.name, 'name')
            }
            if (state.picture !== props.profile.picture) {
                await props.update(state.picture, 'picture')
            }
            if (state.sexualOrientation !== props.profile.sexualOrientation) {
                await props.update(state.sexualOrientation, 'sexualOrientation')
            }
            if (state.race !== props.profile.race) {
                await props.update(state.race, 'race')
            }
            if (state.gender !== props.profile.gender) {
                await props.update(state.gender, 'gender')
            }
            if (state.genderIdentity !== props.profile.genderIdentity) {
                await props.update(state.genderIdentity, 'genderIdentity')
            }
            if (state.country !== props.profile.country) {
                await props.update(state.country, 'country')
            }
            if (state.state !== props.profile.state) {
                await props.update(state.state, 'state')
            }
        }}>Save</button>
    </div >)
}


const mapStateToProps = (state) => {
    return {
        generalQuestions: state.poll,
        profile: state.profile.profile,
        user: state.profile.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        update: async (newValue, key) => await update(dispatch, newValue, key)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);