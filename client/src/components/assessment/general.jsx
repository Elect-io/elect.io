import React from "react";
import { connect } from 'react-redux'
import { Navigate as Redirect } from 'react-router';
import { getAllQuestions, setAnswer } from "../../actions/poll";
import ArrowRight from "../../icons/u_arrow-circle-right";
import { loadProfile } from '../../actions/auth';
class General extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            completed: []
        }
    }
    setAnswer = (answer, previousAnswer) => {
        console.log("set answer")
        this.props.setAnswer(this.props.generalQuestions.questions[this.state.current]._id, answer, previousAnswer);
        setTimeout(() => {

            this.right();
        }, 200)
    }
    right = () => {
        this.setState(state => ({ ...state, current: state.current + 1 }));
    }

    left = () => {
        this.setState(state => ({ ...state, current: state.current - 1 }));
    }
    answers = ["Strongly Agree", "Agree", "Unsure", "Disagree", "Strongly Disagree"]
    render() {
        console.log(this.props.generalQuestions)
        if (this.props.generalQuestions.loaded) {
            if (!this.props.generalQuestions.questions[this.state.current]) {
                (async () => await this.props.load())();
                return <Redirect to="/profile" />
            }
            let answer = this.props.generalQuestions.answers.find(a => {
                if (a.question.toString() === this.props.generalQuestions.questions[this.state.current]._id.toString()) {
                    return a;
                }
            })
            console.log(answer)
            return (
                <div className="poll">
                    <div className="poll-container">
                        <div className="poll-general">
                            <div className="poll-general-question">
                                <h2 className="poll-general-question-title">
                                    {this.props.generalQuestions.questions[this.state.current].question}
                                </h2>
                                <div className="poll-general-question-answer">
                                    {this.answers.map((a, index) => <p onClick={this.setAnswer.bind(this, index, answer)} className={answer?.answer === index ? "poll-general-question-answer-each poll-general-question-answer-each-selected" : "poll-general-question-answer-each"}>
                                        {a}
                                    </p>)}
                                </div>
                                <div className="poll-arrows">
                                    {this.state.current > 0 ? <span onClick={this.left}> <ArrowRight className="poll-arrows-left" /></span> : null}

                                    <span onClick={this.right} className="poll-arrows-right"><ArrowRight /></span>
                                </div>
                            </div>
                            <div className="poll-general-key">
                                {this.props.generalQuestions.questions.map((question, index) => {
                                    return <div className="poll-general-key-each" onClick={() => this.setState(state => ({ ...state, current: index }))}><div className={index === this.state.current ? "poll-general-key-each-selected" : "poll-general-key-each-unselected"}><div className={this.props.generalQuestions.answers.find(a => a.question.toString() === question._id.toString()) ? "poll-general-key-each-filled" : null} /></div> </div>
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
}
const mapStateToProps = (state) => {
    return {
        generalQuestions: state.poll
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllQuestions: async () => await getAllQuestions(dispatch),
        setAnswer: async (question, answer, previousAnswer) => await setAnswer(dispatch, question, answer, previousAnswer),
        load: async () => loadProfile(dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(General);