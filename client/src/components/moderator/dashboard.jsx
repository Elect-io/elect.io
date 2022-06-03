import React from 'react';
import { connect } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { promoteToModerator, promoteToAdmin, demote } from '../../actions/admin';
import checkEmail from '../../actions/checkEmail';
import axios from 'axios';
const Dashboard = (props) => {
    console.log(props.admin);
    const keys = {
        stats: {
            "Profiles": props.admin.profileCount,
            "Politicians": props.admin.politicianCount,
            "Elections": props.admin.electionCount
        },
        "Your Contributions": {

            "Total Contributions": props.admin.totalContributions,
            "Elections Created": props.admin.createdElections,
            "Answers Created": props.admin.createdPoliticianAnswers,
            "Politician Profiles Created": props.admin.createdPoliticians
        }
    }
    const [mods, setMods] = React.useState(props.admin.mods);
    const [user, setUser] = React.useState({});
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
                        if(a.admin < 1){
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
    </div>)
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
