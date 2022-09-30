import React from 'react';
import { connect } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { promoteToModerator, promoteToAdmin, demote } from '../../actions/admin';
import checkEmail from '../../actions/checkEmail';
import { useNavigate as useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = (props) => {
    console.log(props);
    const keys = {
        stats: {
            "Profiles": props.admin.profileCount,
            "Politicians": props.admin.politicians.length,
            "Elections": props.admin.elections.length
        },
        "Your Contributions": {

            "Total Contributions": props.admin.totalContributions,
            "Elections Created": props.admin.createdElections.length,
            "Answers Created": props.admin.createdPoliticianAnswers.length,
            "Politician Profiles Created": props.admin.createdPoliticians.length
        }
    }
    const months = ['January', 'February', "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [mods, setMods] = React.useState(props.admin.mods);
    const [user, setUser] = React.useState({});
    const [state, setState] = React.useState({
        editCandidate: '',
        editElection: ''
    });
    const history = useHistory();
    if (props.admin.mods.length > mods.length) {
        setMods(props.admin.mods);
    }
    return (<div className="dashboard">
        <div className="dashboard-header">
            <p className="dashboard-header-name">Hi, {props.name},</p>

            <p className="dashboard-header-welcome">Welcome to Elect.io's moderator dashboard </p>
        </div>

        <h2 className="dashboard-title">
            Elect.io Stats
        </h2>
        <div className="dashboard-row">
            {Object.keys(keys.stats).map(key => {
                return (<div className="dashboard-row-item"><h3 className="dashboard-row-item-header">{key}</h3><p>{keys["stats"][key]}</p></div>)
            })}
        </div>
        <h2 className="dashboard-title">
            Your Contributions
        </h2>
        <div className="dashboard-row">

            {Object.keys(keys["Your Contributions"]).map(key => {
                return (<div className="dashboard-row-item"><h3 className="dashboard-row-item-header">{key}</h3><p>{keys["Your Contributions"][key]}</p></div>)
            })}
        </div>

        <h2 className="dashboard-title">
            Moderator Information
        </h2>
        <div className="dashboard-row">
            <div className="dashboard-row-item"><h3 className="dashboard-row-item-header">Your Mod Level</h3><p>{(props.adminLevel === 1 ? "Moderator" : props.adminLevel === 2 ? "Admin" : "Super Admin")}</p></div>
            <div className="dashboard-row-mod"><h3 className="dashboard-row-item-header">Moderators</h3>
                <div className="dashboard-row-mod-container">
                    {mods.map(a => {
                        if (a.admin < 1) {
                            return null
                        }
                        return <div className="dashboard-row-mod-container-each">
                            <img className="dashboard-row-mod-container-each-img" src={a.picture} alt={a.name} />
                            <p className="dashboard-row-mod-container-each-name">{a.name}</p>
                            <p className="dashboard-row-mod-container-each-admin">{(a.admin === 1 ? "Moderator" : a.admin === 2 ? "Admin" : "Super Admin")}</p>
                            {props.adminLevel > 2 ?
                                <div className="dashboard-row-mod-container-each-alter">
                                    {a.admin < (props.adminLevel - 1) ? <AddIcon onClick={async () => {
                                        setMods(mods => {
                                            return mods.map(mod => {
                                                if (mod.user.toString() !== a.user.toString()) {
                                                    return mod
                                                }
                                                else {
                                                    return { ...mod, admin: 2 }
                                                }
                                            })
                                        })
                                        try {
                                            await props.promoteToAdmin(a.user);
                                        }
                                        catch (err) {
                                            setMods(props.admin.mods);
                                        }
                                    }} /> : null}
                                    {a.admin < props.adminLevel ? <RemoveIcon onClick={async () => {
                                        setMods(mods => {
                                            return mods.map(mod => {
                                                if (mod.user.toString() !== a.user.toString()) {
                                                    return mod
                                                }
                                                else {
                                                    return { ...mod, admin: mod.admin - 1 }
                                                }
                                            })
                                        })
                                        try {
                                            await props.demote(a.user);
                                        }
                                        catch (err) {
                                            setMods(props.admin.mods);
                                        }
                                    }} /> : null}
                                </div> : null}
                        </div>
                    })}
                </div>
            </div>
            {props.adminLevel > 1 ?
                <div className="dashboard-row-mod"><h3 className="dashboard-row-item-header">Add a new moderator</h3>
                    <div className="dashboard-row-mod-input">
                        <p>Enter Mod's Email</p>
                        <input placeholder="Email" onChange={async (e) => {
                            if (checkEmail(e.target.value)) {
                                console.log("true email")
                                const user = await axios.get(`/api/mod/email/${e.target.value}`);
                                if (user.data.user) {
                                    setUser({ picture: user.data.profile.picture, name: user.data.profile.name, email: user.data.user.email, id: user.data.user._id });
                                }
                            }
                        }} />

                    </div>
                    {user.name ? <div className="dashboard-row-mod-container">
                        <div className="dashboard-row-mod-container-each">
                            <img className="dashboard-row-mod-container-each-img" src={user.picture} alt={user.name} />
                            <p className="dashboard-row-mod-container-each-name">{user.name}</p>
                            <p className="dashboard-row-mod-container-each-name">{user.email}</p>
                            <div className="dashboard-row-mod-container-each-alter">
                                <AddIcon onClick={async () => {
                                    setMods(mods => [...mods, { admin: 1, user: user.id, name: user.name, picture: user.picture }]);
                                    try {
                                        await props.promoteToMod(user.id);
                                        setUser({});
                                    }
                                    catch (err) {
                                        setMods(props.admin.mods);
                                    }
                                }} />

                            </div>
                        </div>

                    </div> : null}
                </div> : null}
        </div>
        <h2 className="dashboard-title">
            Moderator Tools
        </h2>
        <div className="dashboard-row">

            <Link to="/create/candidate" className="dashboard-row-mod-link">
                <p className="dashboard-row-item-link"> Create a Candidate</p>
            </Link>
            <Link to="/create/election" className="dashboard-row-mod-link">
                <p className="dashboard-row-item-link"> Create an Election</p>
            </Link>

            <Link to="/create/candidate" className="dashboard-row-mod-link">
                <p className="dashboard-row-item-link"> Answer General Questions as a Politician</p>
            </Link>

        </div>
        <div className="dashboard-row">
            <div className="dashboard-row-mod"><h3 className="dashboard-row-item-header">Edit a Candidate</h3>
                <div className="dashboard-row-mod-container">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        history(`/edit/candidate/${state.editCandidate}`);
                    }} className="dashboard-row-mod-input">
                        <p>Enter Candidate's ID</p>
                        <input onChange={async (e) => {
                            setState(state => ({ ...state, editCandidate: e.target.value }))
                        }} placeholder="Name" />
                    </form>
                </div>
            </div>
            <div className="dashboard-row-mod"><h3 className="dashboard-row-item-header">Edit an Election</h3>
                <div className="dashboard-row-mod-container">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log(e)
                        history(`/edit/election/${state.editElection}`);
                    }} className="dashboard-row-mod-input">
                        <p>Enter Election ID</p>
                        <input placeholder="ID" onChange={async (e) => {
                            setState(state => ({ ...state, editElection: e.target.value }))
                        }} />
                    </form>
                </div>
            </div>
            <div className="dashboard-row-mod"><h3 className="dashboard-row-item-header">Answer Election Specific Questions as a Politician</h3>
                <div className="dashboard-row-mod-container">
                    <div className="dashboard-row-mod-input">
                        <p>Enter Election ID</p>
                        <input placeholder="Election's ID" />
                    </div>
                    <div className="dashboard-row-mod-input">
                        <p>Enter Politician's ID</p>
                        <input placeholder="Politician's id" />
                    </div>
                </div>
            </div>
        </div>
        <h2 className="dashboard-title">
            Overview
        </h2>
        <div className='dashboard-row'>
            <div className="dashboard-row-mod"><h3 className="dashboard-row-item-header">Politicians</h3>
                <div className="dashboard-row-mod-container">
                    <div className="dashboard-row-mod-container-politicians">
                        {props.admin.politicians.map(p => {
                            return (<div className="dashboard-row-mod-container-politicians-each" onClick={() => {
                                history(`/candidate/${p._id}`);
                            }}>
                                <img src={p.picture} alt={p.name}></img>
                                <p>{p.name}</p>
                                <p>{p.state}, {p.country}</p>

                            </div>)
                        })}
                    </div>
                </div>
            </div>
            <div className="dashboard-row-mod"><h3 className="dashboard-row-item-header">Elections</h3>
                <div className="dashboard-row-mod-container">
                    <div className="dashboard-row-mod-container-politicians">
                        {props.admin.elections.map(p => {
                            return (<div className="dashboard-row-mod-container-politicians-each" onClick={() => {
                                history(`/election/${p._id}`);
                            }}>
                                <p>{p.for}</p>
                                <p>{p.location.city ? p.location.city + "," : null} {p.location.state ? p.location.state + "," : null} {p.location.country ? p.location.country : null}</p>
                                <p>{(months[(new Date(p.date)).getMonth()]) + " " + new Date(p.date).getDate() + 'th' + ', ' + new Date(p.date).getFullYear()}</p>
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        </div>

    </div >)
}
const mapStateToProps = (state) => {
    return ({
        admin: state.adminDashboard,
        adminLevel: state.profile.user.admin,
        name: state.profile.profile.name
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({
        promoteToMod: async (id) => await promoteToModerator(dispatch, id),
        promoteToAdmin: async (id) => await promoteToAdmin(dispatch, id),
        demote: async (id) => await demote(dispatch, id)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
