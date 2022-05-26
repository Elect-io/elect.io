import React from 'react';
import { connect } from 'react-redux';
import AccountCircle from '../../icons/account_circle_24px';
import Group from '../../icons/Group';
import Vector from '../../icons/Vector';
import { Link } from 'react-router-dom'
import SideBarToolkit from './sidebar-toolkit';
import SignUp from '../../icons/signUp';
import SignIn from '../../icons/signIn';
import EditIcon from '@mui/icons-material/Edit';
import { removeAccount } from '../../actions/auth';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: null }
    }

    componentDidMount() {
        if (document.location) {
            switch (document.location.pathname.replace().split('/')[1]) {
                case "profile":
                    this.setState({ selected: 1 });
                    break
                case "home":
                    this.setState({ selected: 2 });
                    break;
                case "elections":
                    this.setState({ selected: 3 });
                    break;
                default:
                    this.setState({ selected: null });
            }
        }
        else {
            this.setState({ selected: null });
        }
    }
    render() {
        return (<div className="sidebar">

            <div to="/profile" className="sidebar-each"><AccountCircle active={this.state.selected === 1} />
                {!this.props.loggedIn ?
                    <SideBarToolkit onClick={() => this.setState({ selected: 1 })} options={[{ link: "/profile/login", title: () => <>Login <SignIn /></> }, { link: "/profile/sign-up", title: () => <>Sign Up <SignUp /></> }]} /> :
                    <SideBarToolkit onClick={() => this.setState({ selected: 1 })} options={[{ link: "/profile", title: () => <>My Profile <img className="sidebar-each-toolkit-each-image" src={this.props.profile.picture} alt={this.props.profile.name} /></> }, { link: "/profile/edit", title: () => <>Edit Profile <EditIcon className="sidebar-each-toolkit-each-image"/></> }, { link: "", title: () => <div className="sidebar-each-toolkit-each" style={{margin:0, padding:0}} onClick={this.props.logout}>Log out <SignIn /></div> }]} />
                }

            </div>

            <Link to="/home" className="sidebar-each"><Vector onClick={() => this.setState({ selected: 2 })} active={this.state.selected === 2} /></Link>
            <Link to="/elections" className="sidebar-each"><Group onClick={() => this.setState({ selected: 3 })} active={this.state.selected === 3} /></Link>

        </div>)
    }
}
const mapStateToProps = (state) => {
    return {
        loggedIn: state.profile.loaded,
        profile: state.profile.profile
    }
}
const mapDispatch = (dispatch) => {
    return {
        logout: () => removeAccount(dispatch)
    }
}
export default connect(mapStateToProps, mapDispatch)(SideBar);