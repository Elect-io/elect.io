import React from 'react';
import Analyze from '../buttons/assessment';
import { connect } from 'react-redux'
import Exclaim from '../../icons/exclaim';

import listOfCountries from '../../util/listOfCountries.ts';
import listOfAmericanStates from '../../util/listOfAmericanStates.ts';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: 'The United States of America',
            state: null,
            dropDown: null
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

                            <p className="profile-edit-each-title">Country</p><span className="profile-edit-each-container"><div className="profile-edit-each-dropdown" onClick={(e) => {
                                if (this.state.dropDown === 'country') {
                                    this.setState(state => ({ ...state, dropDown: null }));
                                }
                                else {
                                    this.setState(state => ({ ...state, dropDown: 'country' }));
                                }
                            }}><p>{this.state.country ? this.state.country : "Country"}</p>


                            </div></span>

                            <div className="profile-dropdown" style={{ opacity: this.state.dropDown === 'country' ? 100 : 0, visibility: this.state.dropDown === 'country' ? 'visible' : 'hidden' }}>
                                {listOfCountries.map(item => {
                                    return <p class="profile-dropdown-each" onClick={() => {
                                        this.setState(state => ({ ...state, country: item, dropDown: null }));

                                    }}>{item}</p>
                                })}
                            </div>
                        </div>
                        <div className="home-header-top-input-each">

                            <p className="profile-edit-each-title">State/Province</p><span className="profile-edit-each-container"><div className="profile-edit-each-dropdown" onClick={(e) => {
                                if (this.state.dropDown === 'state') {
                                    this.setState(state => ({ ...state, dropDown: null }));
                                }
                                else {
                                    this.setState(state => ({ ...state, dropDown: 'state' }));
                                }
                            }}><p>{this.state.state ? this.state.state : "State/Province"}</p>


                            </div></span>

                            <div className="profile-dropdown" style={{ opacity: this.state.dropDown === 'state' ? 100 : 0, visibility: this.state.dropDown === 'state' ? 'visible' : 'hidden' }}>
                                {listOfAmericanStates.map(item => {
                                    return <p class="profile-dropdown-each " onClick={() => {
                                        this.setState(state => ({ ...state, state: item, dropDown: null }));

                                    }}>{item}</p>
                                })}
                            </div>
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