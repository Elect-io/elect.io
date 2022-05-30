import React from 'react';
import Analyze from '../buttons/assessment';
import { connect } from 'react-redux'
import Exclaim from '../../icons/exclaim';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: 'United States',
            state: "California"
        };
    }
    onChange = (e) => {

    }
    render() {
        return (<div className="home">
            <div className="home-header">
                <div className="home-header-top">
                    <div className="home-header-top-name">
                        {this.state.country}{this.state.state ? `, ${this.state.state}` : null}
                    </div>
                    <div className="home-header-top-input">
                        <div className="home-header-top-input-each">
                            <p>
                                Country
                            </p>
                            <input className="input" name="country" onChange={this.onChange} type="text" placeholder="Country" />
                        </div>

                        <div className="home-header-top-input-each">
                            <p>
                                State/Province
                            </p>
                            <input className="input" name="state" onChange={this.onChange} type="text" placeholder="Country" />
                        </div>
                    </div>
                </div>
                <div>
                    <Analyze />
                    {this.props.generalQuestions.answers.length === this.props.generalQuestions.questions.length ? <p className="home-header-para-success">
                        <Exclaim />  You have already answered all the general questions
                    </p> : <p className="home-header-para-general">
                        <Exclaim />  You have {this.props.generalQuestions.questions.length - this.props.generalQuestions.answers.length} questions  unanswered questions
                    </p>}
                    <p>

                    </p>
                </div>

            </div>
        </div>)
    }
}
const mapStateToProps = (state) => {
    return {
        generalQuestions: state.poll
    }
}
export default connect(mapStateToProps)(Home);