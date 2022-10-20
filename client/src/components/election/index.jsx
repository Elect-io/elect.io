import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect } from 'react';
import axios from 'axios';
import Snippet from '../candidate/snippet';

import Analyze from '../buttons/assessment';
import { connect } from 'react-redux'
import Exclaim from '../../icons/exclaim';
const Election = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [state, setState] = React.useState({ loaded: false });
    useEffect(() => {
        try {
            (async () => {
                const election = await axios.get('/api/election/' + id);
                console.log(election.data);
                setState(state => ({ ...election.data.election, loaded: true }));
            })()
        }
        catch (err) {
            console.log(err);
            navigate(
                '/not-found'
            )
        }
    }, []);
    console.log(id)
    if (!state.loaded) {
        return <div>loading...</div>
    }
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date(state.date);
    return (<div className='election'>
        <div className='election-header'>
            <iframe className='election-map' width="600" height="500" src={`https://maps.google.com/maps?q=${state.location.city ? state.location.city + ', ' : ''}${state.location.state ? state.location.state + ', ' : ''}${state.location.country}&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            <div className='election-header-right'>
                <div>
                    <h1>{state.for}</h1>
                    <p>{state.location.city ? state.location.city + ', ' : ''}{state.location.state ? state.location.state + ', ' : ''}{state.location.country}</p>
                    <p>{months[date.getMonth()]}, {date.getDate()}th, {date.getFullYear()}</p>
                </div>
                <div>
                    <Analyze id={id} />
                    <div>
                        {state.answers.length === state.questions.length ? <p className="home-header-para-success">
                            <Exclaim />  You have already answered all questions pertaining to this election
                        </p> : <p className="home-header-para-general">
                            <Exclaim />  You have {state.questions.length - state.answers.length} unanswered questions
                        </p>}
                    </div>
                </div>
            </div>
        </div>
        <h2>Candidates</h2>
        <div className='election-candidates'>
            {state.politicians.map(a => {

                return <Snippet {...a} />
            })}
        </div>
    </div>)
}

export default Election;