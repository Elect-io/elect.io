import React from 'react';
import Analyze from '../buttons/assessment';
import { connect } from 'react-redux'
import Exclaim from '../../icons/exclaim';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import listOfCountries from '../../util/listOfCountries.ts';
import listOfAmericanStates from '../../util/listOfAmericanStates.ts';
import Snippet from '../election/snippet';
let listOfElectionTypes = ["Federal", "State", "Municipal", "Primaries-Federal", "Primaries-State", "Primaries-Municipal"];
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: 'The United States of America',
            state: null,
            dropDown: null,
            hasMore: true,
            electionType: null,
            elections: []
        };
    }
    componentDidMount() {
        this.loadMoreElections(0, this.state.country, this.state.state, this.state.electionType)
    }
    loadMoreElections = async (a = 0, country, s, type) => {

        let elections = await axios.get(`/api/election/location/?country=${country}&state=${s}&electionType=${type}&offset=${a}`)

        console.log(elections.data)
        if (a === 0) {
            this.setState(state => ({
                ...state,
                elections: elections.data.elections,
                hasMore: elections.length === 10
            }));
        }
        else {
            this.setState(state => ({
                ...state,
                elections: [...state.elections, ...elections.data.elections],
                hasMore: elections.length === 10
            }));
        }

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

                                        this.loadMoreElections(0, item, this.state.state, this.state.electionType)
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

                                        this.loadMoreElections(0, this.state.country, item, this.state.electionType)
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
            <div className='home-elections'>
                <h3>Upcoming Elections</h3>
                <div className="home-header-top-input-election">

                    <span className="profile-edit-each-container"><div className="profile-edit-each-dropdown home-header-top-input-election-dropdown" onClick={(e) => {
                        if (this.state.dropDown === 'election') {
                            this.setState(state => ({ ...state, dropDown: null }));
                        }
                        else {
                            this.setState(state => ({ ...state, dropDown: 'election' }));
                        }
                    }}><p>{this.state.electionType ? this.state.electionType : "Election Type"} <span style={this.state.dropDown === "election" ? { transform: 'rotate(180deg) translate(50%, 20%)' } : null}><svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1.00016L5 5.33398L1 1.00016" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </span></p>


                    </div></span>

                    <div className="profile-dropdown" style={{ opacity: this.state.dropDown === 'election' ? 100 : 0, visibility: this.state.dropDown === 'election' ? 'visible' : 'hidden' }}>
                        {listOfElectionTypes.map(item => {
                            return <p class="profile-dropdown-each " onClick={() => {
                                if (item !== this.state.electionType) {
                                    this.setState(state => ({ ...state, electionType: item, dropDown: null, elections: [] }));
                                    this.loadMoreElections(0, this.state.country, this.state.state, item);
                                }
                                else {
                                    this.setState(state => ({ ...state, electionType: item, dropDown: null }));
                                }

                            }}>{item}</p>
                        })}
                    </div>
                </div>
                <div id="election" >
                    <InfiniteScroll
                        dataLength={this.state.elections.length}
                        next={this.loadMoreElections.bind(this, this.state.elections.length, this.state.country, this.state.state, this.state.electionType)}
                        style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                        hasMore={this.state.hasMore}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="election"
                    >
                        <div className='home-elections-container'>

                            {this.state.elections.map((item, index) => (

                                <Snippet {...item} key={index} />
                            ))}

                        </div>
                    </InfiniteScroll>
                </div>

            </div>
        </div>)
    }
}
const mapStateToProps = (state) => {
    return {
        generalQuestions: state.poll,
        admin: state.profile.user.admin,
        profile: state.profile.profile
    }
}
export default connect(mapStateToProps)(Home);