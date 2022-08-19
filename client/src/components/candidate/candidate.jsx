import Map from '../../icons/map';
import React from 'react'
import Analyze from '../buttons/assessment'
import { connect } from 'react-redux'

import { Link, useNavigate, useParams } from 'react-router-dom';
import Exclaim from '../../icons/exclaim';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import axios from 'axios';

const Profile = (props) => {
    const navigate = useNavigate();
    let keys = ['Gender Identity', "Religion", "Sexual Orientation", "Race", "Gender"];
    let trueKeys = {
        "Gender Identity": "genderIdentity",
        Religion: 'religion',
        "Sexual Orientation": "sexualOrientation",
        Race: "race",
        Gender: "gender"
    }
    let { id } = useParams()
    const [profile, setProfile] = React.useState({})
    React.useEffect(() => {
        (async () => {
            try {
                let data = await axios.get(`/api/politician/${id}`)
                setProfile(data.data.politician)
                console.log(data)
            }
            catch(err){
                navigate('/not-found')
            }
        })()
    }, [])
    let top = (50 - (profile.yCoefficient / 56 * 40));
    let left = (50 + (profile.xCoefficient / 22 * 42));
    console.log(top);
    return (<div className="profile">
        <div className="profile-header">
            <div className="profile-header-left">
                <img className="profile-header-left-image" src={profile.picture} alt={profile.name} />
                <div>
                    <h2 className="profile-header-left-name">{profile.name} <Link to="/profile/edit"><ModeEditOutlineOutlinedIcon className="profile-header-left-name-icon" /></Link></h2>
                
                    <p className="profile-header-left-content">
                        {profile.country ? profile.country : null}{profile.state ? ", " + profile.state : null}
                    </p>
                </div>
            </div>
            <div className="profile-header-right">
                <Analyze />
                {props.generalQuestions.answers.length === props.generalQuestions.questions.length ? <p className="home-header-para-success">
                    <Exclaim />  You have already answered all the general questions
                </p> : <p className="home-header-para-general">
                    <Exclaim />  You have {props.generalQuestions.questions.length - props.generalQuestions.answers.length} questions  unanswered questions
                </p>}
            </div>
        </div>
        <div className="profile-body">
            <div className="profile-map">
                <h3 className="profile-map-title">Their General Political Alignment</h3>
                <div className="profile-map-legend">
                    <div className="profile-map-legend-marker">
                    </div>
                    <p>Represents Their political views on the political compass </p>
                </div>
                <div className="profile-map-content">
                    <Map className="profile-map-content-map" />
                    <div style={{ top: top + "%", left: left + "%" }} className="profile-map-content-marker">

                    </div>
                </div>
            </div>
            <div>

                <h3 className="profile-map-title">Their Demographic</h3>
                <div className="profile-demographics">

                    {keys.map(a => <div className="profile-demographics-each"><p className="profile-demographics-each-title">{a} </p><p
                        className="profile-demographics-each-content">{!profile[trueKeys[a]] ? "Not Answered" : profile[trueKeys[a]]}</p></div>)}

                </div>
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