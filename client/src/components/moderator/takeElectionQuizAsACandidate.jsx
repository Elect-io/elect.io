import React from "react";
import { connect } from 'react-redux'
import { Navigate as Redirect, useParams, useNavigate } from 'react-router-dom';
import { getAllQuestions, setAnswer } from "../../actions/poll";
import ArrowRight from "../../icons/u_arrow-circle-right";
import axios from 'axios';
import { loadProfile } from '../../actions/auth';
const General = (props) => {
    const { id, election } = useParams();
    const navigate = useNavigate();
    console.log(id)

    const [state, setState] = React.useState({
        current: 0,
        completed: [],
        answers: [],
        source: '',
        politician: {
            name: '',
            picture: ''
        },
        election: {
            location: '',
            date: '',
            for: ''
        },
        loaded: false
    })
    React.useEffect(() => {

        ((async () => {
            let politician = await axios.get(`/api/politician/${id}`);
            let answers = await axios.get('/api/answer-politician-general-question/' + id);
            let Election = await axios.get('/api/election/' + election);
            setState(state => ({ ...state, politician: politician.data.politician, answers: answers.data.answers, election: Election.data.election }))
        }))()
    }, []);
    const setAnswer = async (answer, previousAnswer) => {
        console.log("set answer")
        console.log(answer)
        let answer1 = await axios.post('/api/answer-politician-general-question/' + props.generalQuestions.questions[state.current]._id + '/' + id + '/' + answer, { source: state.source[0]?.length > 4 ? state.source[0] : previousAnswer?.source[0].length > 4 ? previousAnswer.source[0] : 'none' });
        let exists = state.answers.find(a => a.question.toString() === answer1.data.answer.question.toString())
        if (!exists) {
            setState(state => ({ ...state, answers: [...state.answers, answer1.data.answer], source: '' }))
        }
        else {
            setState(state => ({
                ...state, answers: state.answers.map(a => {
                    console.log(a, answer1.data.answer);
                    if (a.question.toString() === answer1.data.answer.question.toString()) {
                        return answer1.data.answer
                    }
                    else {
                        return a;
                    }

                })
            }))
        }
        setTimeout(() => {
            right();
        }, 200)
    }
    const right = () => {
        let answer = state.answers.find(a => {
            if (a.question.toString() === props.generalQuestions.questions[state.current + 1]?._id.toString()) {
                return a;
            }
        })
        console.log(answer)
        if (!answer) {
            console.log('setting source to none')
            setState(state => ({ ...state, source: ['', ''] }))
        }
        else {
            setState(state => ({ ...state, source: answer?.source }))
        }
        setState(state => ({ ...state, current: state.current + 1 }));
    }

    const left = () => {
        let answer = state.answers.find(a => {
            if (a.question.toString() === props.generalQuestions.questions[state.current - 1]._id.toString()) {
                return a;
            }
        })
        if (!answer) {
            setState(state => ({ ...state, source: '' }))
        }
        else {
            setState(state => ({ ...state, source: answer?.source }))
        }
        setState(state => ({ ...state, current: state.current - 1 }));
    }
    const answers = ["Strongly Agree", "Agree", "Unsure", "Disagree", "Strongly Disagree"]
    if (props.generalQuestions.loaded) {
        if (!props.generalQuestions.questions[state.current]) {
            return <Redirect to={'/candidate/' + id} />
        }
        let answer = state.answers.find(a => {
            if (a.question.toString() === props.generalQuestions.questions[state.current]._id.toString()) {
                return a;
            }
        })
        if (answer && !state.loaded) {
            setState(state => ({ ...state, source: answer.source, loaded: true }))
        }
        console.log(answer)
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = new Date(state.election.date);
        return (
            <div className="poll-politicians">
                <div className="poll-politician">
                    <h3>You're taking the quiz as </h3>
                    <div>
                        <img src={state.politician.picture} alt={state.politician.name} />
                        <p>{state.politician.name}</p>
                    </div>
                    <div className='election-header election-header-snippet'>
                        <iframe className='election-map' width="600" height="500" src={`https://maps.google.com/maps?q=${state.election.location.city ? state.election.location.city + ', ' : ''}${state.election.location.state ? state.election.location.state + ', ' : ''}${state.election.location.country}&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                        <div className='election-header-right'>
                            <div>
                                <h1>{state.election.for}</h1>
                                <p>{state.election.location.city ? state.election.location.city + ', ' : ''}{state.election.location.state ? state.election.location.state + ', ' : ''}{state.election.location.country}</p>
                                <p>{months[date.getMonth()]}, {date.getDate()}th, {date.getFullYear()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="poll-container">

                    <div className="poll-general">
                        <div className="poll-general-question">
                            <h2 className="poll-general-question-title">
                                {props.generalQuestions.questions[state.current].question}
                            </h2>
                            <div className="poll-general-question-answer">
                                {answers.map((a, index) => <p onClick={setAnswer.bind(this, index, answer)} className={answer?.answer === index ? "poll-general-question-answer-each poll-general-question-answer-each-selected" : "poll-general-question-answer-each"}>
                                    {a}
                                </p>)}
                                <input class="poll-politician-input" value={state.source[0]} placeholder={"Source"} onChange={(e) => {
                                    if (answer.source) {
                                        setState(state => ({
                                            ...state, answers: state.answers.map(a => {
                                                if (a._id.toString() === answer._id) {
                                                    return { ...a, source: [e.target.value, ''] }
                                                }
                                                else {
                                                    return a;
                                                }
                                            })
                                        }))
                                    }
                                    setState(state => ({ ...state, source: e.target.value }))

                                }}></input>
                                <p>Please enter the source before selecting the answer</p>
                            </div>
                            <div className="poll-arrows">
                                {state.current > 0 ? <span onClick={left}> <ArrowRight className="poll-arrows-left" /></span> : null}

                                <span onClick={right} className="poll-arrows-right"><ArrowRight /></span>
                            </div>
                        </div>
                        <div className="poll-general-key">
                            {props.generalQuestions.questions.map((question, index) => {
                                return <div className="poll-general-key-each" onClick={() => {
                                    let answer = state.answers.find(a => {
                                        if (a.question.toString() === props.generalQuestions.questions[index]._id.toString()) {
                                            return a;
                                        }
                                    })
                                    setState(state => ({ ...state, current: index, source: answer ? answer?.source : ['', ''] }))

                                }}><div className={index === state.current ? "poll-general-key-each-selected" : "poll-general-key-each-unselected"}><div className={state.answers.find(a => a.question.toString() === question._id.toString()) ? "poll-general-key-each-filled" : null} /></div> </div>
                            })
                            }
                        </div>
                    </div>

                </div>
            </div>)
    }
    else {
        return <div></div>
    }
}
const mapStateToProps = (state) => {
    return {
        generalQuestions: state.poll
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllQuestions: async () => await getAllQuestions(dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(General);