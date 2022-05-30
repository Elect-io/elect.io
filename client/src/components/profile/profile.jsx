import Map from '../../icons/map';
import React from 'react'
import Analyze from '../buttons/assessment'
import { connect } from 'react-redux'
import Exclaim from '../../icons/exclaim';

const Profile = (props) => {
    return (<div className="profile">
        <div className="profile-header">
            <div className="profile-header-left">
                <img className="profile-header-left-image" src={props.profile.picture} alt={props.profile.name} />
                <div>
                    <h2 className="profile-header-left-name">{props.profile.name}</h2>
                    <p className="profile-header-left-content">
                        {props.user.email}
                    </p>
                    <p className="profile-header-left-content">
                        {props.profile.country ? props.profile.country : null}{props.profile.state ? ", " + props.profile.state : null}
                    </p>
                </div>
            </div>
            <div className="profile-header-right">
                <Analyze />
                {this.props.generalQuestions.answers.length === this.props.generalQuestions.questions.length ? <p className="home-header-para-success">
                    <Exclaim />  You have already answered all the general questions
                </p> : <p className="home-header-para-general">
                    <Exclaim />  You have {this.props.generalQuestions.questions.length - this.props.generalQuestions.answers.length} questions  unanswered questions
                </p>}
            </div>
        </div>
        <div className="profile-body">
            <div className="profile-map">
                <h3 className="profile-map-title">Your General Political Alignment</h3>
                <Map className="profile-map-content" />
            </div>
            <div className="profile-demographics">
                {props.profile.keys().map(a => <div className="profile-demographics-each"><p className="profile-demographics-each-title">{a}</p><p className="profile-demographics-each-content">{props.profile[a]}</p></div>)}
            </div>
        </div>
    </div>)
}


const mapStateToProps = (state) => {
    return {
        generalQuestions: state.poll,
        profile: state.profile.profile,
        user: state.profile.user
    }
}
export default connect(mapStateToProps)(Profile);