import React from 'react';
import { connect } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Dashboard = (props) => {
    console.log(props.admin);
    const keys = {
        stats: {
            "Profiles": props.admin.profileCount,
            "Politicians": props.admin.politicianCount,
            "Elections": props.admin.electionCount
        },
        mods: props.admin.mods,
        "Your Contributions": {

            "Total Contributions": props.admin.totalContributions,
            "Elections Created": props.admin.createdElections,
            "Answers Created": props.admin.createdPoliticianAnswers,
            "Politician Profiles Created": props.admin.createdPoliticians
        }
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
                    {keys.mods.map(a => {
                        return <div className="dashboard-row-mod-container-each">
                            <img className="dashboard-row-mod-container-each-img" src={a.picture} alt={a.name} />
                            <p className="dashboard-row-mod-container-each-name">{a.name}</p>
                            <p className="dashboard-row-mod-container-each-admin">{(a.admin === 1 ? "Moderator" : props.admin === 2 ? "Admin" : "Super Admin")}</p>
                            <p></p>
                        </div>
                    })}
                    {keys.mods.map(a => {
                        return <div className="dashboard-row-mod-container-each">
                            <img className="dashboard-row-mod-container-each-img" src={a.picture} alt={a.name} />
                            <p className="dashboard-row-mod-container-each-name">{a.name}</p>
                            <p className="dashboard-row-mod-container-each-admin">{(a.admin === 1 ? "Moderator" : props.admin === 2 ? "Admin" : "Super Admin")}</p>
                            <p></p>
                        </div>
                    })}
                    {keys.mods.map(a => {
                        return <div className="dashboard-row-mod-container-each">
                            <img className="dashboard-row-mod-container-each-img" src={a.picture} alt={a.name} />
                            <p className="dashboard-row-mod-container-each-name">{a.name}</p>
                            <p className="dashboard-row-mod-container-each-admin">{(a.admin === 1 ? "Moderator" : props.admin === 2 ? "Admin" : "Super Admin")}</p>
                            <p></p>
                        </div>
                    })}
                </div>
            </div>

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

export default connect(mapStateToProps)(Dashboard);
