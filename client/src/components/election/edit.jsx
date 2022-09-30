import { connect } from 'react-redux'
import React, { useEffect } from 'react';
import axios from 'axios';
import GetImage from '../../actions/getImage';

import { Link, useNavigate, useParams } from 'react-router-dom';
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
    let { id } = useParams()

    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                let data = await axios.get(`/api/election/${id}`)
                console.log(data.data)
                let date = new Date(data.data.election.date)
                setState({ ...data.data.election, country: data.data.election.location.country, state: data.data.election.location.state, date: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1).toString() : date.getMonth() + 1}-${date.getDate()<10?("0"+date.getDate().toString()):date.getDate()}` });
            }
            catch (err) {
                console.log()
                // navigate('/dashboard')
            }
        })()
    }, []);
    let keys = ["Politicians", "For", "Type", "Date", "State", "Country"];
    let trueKeys = {
        For: "for",
        "Politicians": "politicians",
        Date: 'date',
        Type: 'type',
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
        state: listOfAmericanStates,
        type: ["Federal", "State", "Municipal", "Primaries-Federal", "Primaries-State", "Primaries-Municipal"]
    }
    const [dropDown, setDropDown] = React.useState(null);
    const [politicians, setPoliticians] = React.useState([]);
    const [state, setState] = React.useState({
        for: "",
        politicians: [],
        politicianSearch: '',
        date: '',
        type: '',
        state: "",
        country: ""
    })
    return (
        <div className="profile">
            <h1 className="auth-header">Edit Election</h1>

            <div className="profile-edit">
                {keys.map(a => {
                    if (a === "For") {
                        return (<div className="profile-edit-each"> <p className="profile-edit-each-title">{a}</p><span className="profile-edit-each-container"><input className="auth-form-input" name={trueKeys[a]} value={state[trueKeys[a]]} onChange={(e) => {
                            setState(state => ({ ...state, [trueKeys[a]]: e.target.value }))
                        }} type="text" placeholder={a} /></span></div>)
                    }
                    else if (a === "Date") {
                        return (<div className="profile-edit-each"> <p className="profile-edit-each-title">{a}</p><span className="profile-edit-each-container"><input min="2022-01-01" max="2050-01-01" type="date" className="auth-form-input" name={trueKeys[a]} value={state[trueKeys[a]]} onChange={(e) => {
                            setState(state => ({ ...state, [trueKeys[a]]: e.target.value }))
                        }} placeholder={a} /></span></div>)
                    }
                    else if (a === "Politicians") {

                        return (<div className="profile-edit-each"> <p className="profile-edit-each-title">{a}</p><span className="profile-edit-each-container">
                            <div className='profile-edit-politician'>

                                {state.politicians.map(item => {
                                    return <div class="profile-edit-politician-each" onClick={() => {
                                        setState(state => ({ ...state, politicians: state.politicians.filter(a => a !== item) }))
                                    }}>
                                        <img alt={item.name} src={item.picture} />
                                        <p>{item.name}</p>
                                    </div>
                                })}
                            </div>

                            <input className="auth-form-input" name={trueKeys[a]} value={state.politicianSearch} onChange={async (e) => {
                                setState(state => ({ ...state, politicianSearch: e.target.value }))
                                setDropDown(trueKeys[a]);
                                if (state.state && state.country) {
                                    let res = await axios.get(`/ api / politician / search / ${state.country} /${state.state}/${e.target.value} `);
                                    console.log(res.data.politicians);
                                    setPoliticians(res.data.politicians);
                                }
                                else if (state.country) {
                                    let res = await axios.get(`/ api / politician / search / ${state.country} /${e.target.value}`);
                                    setPoliticians(res.data.politicians);
                                    console.log(res.data.politicians)
                                }

                            }} type="text" placeholder={a} /></span >


                            <div className="profile-dropdown" style={{ opacity: dropDown === trueKeys[a] ? 100 : 0, visibility: dropDown === trueKeys[a] ? 'visible' : 'hidden' }}>
                                {politicians.map(item => {
                                    return <div class="profile-dropdown-politician" onClick={() => {
                                        let found = state.politicians.find(a => a._id.toString() === item._id.toString());
                                        console.log(found)
                                        if (!found) {
                                            setState(state => ({ ...state, [trueKeys[a]]: [...state.politicians, item], politicianSearch: '' }));
                                            setDropDown(null);
                                        }

                                    }}>
                                        <img alt={item.name} src={item.picture} />
                                        <p>{item.name}</p>
                                    </div>
                                })}
                            </div>

                        </div >)

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
            </div >

            <button className="button-sm" onClick={async () => {
                let s = state;
                s.politicians = s.politicians.map(a => a._id);
                if (s.state?.length === 0) {
                    s.state = null;
                }
                s.For = s.for;
                console.log(s)
                let res = await axios.put('/api/election/'+id, s);

                navigate(`/election/${res.data.election._id}`);
            }}>Save</button>
        </div >
    )
}

export default connect(mapStateToProps)(CreateCandidate)
