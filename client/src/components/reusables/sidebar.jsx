import React from 'react';
import { connect } from 'react-redux';
import AccountCircle from '../../icons/account_circle_24px';
import Group from '../../icons/Group';
import Vector from '../../icons/Vector';
import { Link } from 'react-router-dom'
import SideBarToolkit from './sidebar-toolkit';

class SideBar extends React.Component {

    componentWillMount() {

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

    render() {

        return (<div className="sidebar">
            <Link to="/profile" className="sidebar-each"><AccountCircle onClick={() => this.setState({ selected: 1 })} active={this.state.selected === 1} /><SideBarToolkit options={[{link:"/login", title:"Login"}, {link:"/sign-up", title:"Sign Up"}]}/></Link>
            <Link to="/home" className="sidebar-each"><Vector onClick={() => this.setState({ selected: 2 })} active={this.state.selected === 2} /></Link>
            <Link to="/elections" className="sidebar-each"><Group onClick={() => this.setState({ selected: 3 })} active={this.state.selected === 3} /></Link>

        </div>)
    }
}

export default SideBar;