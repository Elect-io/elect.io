import React from 'react';
import { connect } from 'react-redux';
import { Routes as Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import setToken from './actions/setToken';
import { loadProfile } from './actions/auth';
import General from './components/assessment/general';
import { getAllQuestions } from './actions/poll';
import Candidate from './components/candidate/candidate';
const SideBar = lazy(() => import('./components/reusables/sidebar'));
const Login = lazy(() => import('./components/auth/login'));
const Signup = lazy(() => import('./components/auth/signup'));
const ForgotPassword = lazy(() => import('./components/auth/forgotPassword'));
const ResetPassword = lazy(() => import('./components/auth/resetPassword'));
const CreateFromGoogle = lazy(() => import('./components/auth/createFromGoogle'));
const Merge = lazy(() => import('./components/auth/merge'));
const Profile = lazy(() => import('./components/profile/profile'));
const EditProfile = lazy(() => import('./components/profile/editProfile'));
const Authenticate = lazy(() => import('./components/auth/authenticate'));
const CreateCandidate = lazy(() => import('./components/candidate/create'));
const EditCandidate = lazy(() => import('./components/candidate/edit'));

const CreateElection = lazy(() => import('./components/election/create'));
const Election = lazy(() => import('./components/election/index'));

const EditElection = lazy(() => import('./components/election/edit'));
const ModDashboard = lazy(() => import('./components/moderator/dashboard'));

const EditGeneralQuestions = lazy(() => import('./components/moderator/questions/editGeneralQuestions'));
const EditElectionSpecificQuestions = lazy(() => import('./components/moderator/questions/editElectionSpecificQuestions'));
const CreateParty = lazy(() => import('./components/party/create'));
const EditParty = lazy(() => import('./components/party/edit'));
const Party = lazy(() => import('./components/party/index'));
const TakeQuizAsCandidate = lazy(() => import('./components/moderator/takeGeneralQuizAsAcandidate'));

const Home = lazy(() => import('./components/home/home'));
class App extends React.Component {
  async componentWillMount() {
    let token = localStorage.getItem('token');

    if (token) {
      setToken(token);
      await this.props.load();
      await this.props.getAllQuestions();
    }
  }
  render() {
    console.log(this.props.state);
    if (this.props.loaded) {
      return (<Suspense fallback={<div>Loading...</div>}>


        <Router>
          <div className="app">
            <SideBar />

            <div className="app-right">
              <Switch>
                <Route path="/" element={<div><Home /></div>} />
                <Route path="/assessment/general" exact element={<div><General /></div>} />
                <Route path="/profile" exact element={<div><Profile /></div>} />
                <Route path="/profile/edit" exact element={<div><EditProfile /></div>} />
                <Route path="/party/:id" exact element={<div><Party /></div>} />
                <Route path="/election/:id" exact element={<div><Election /></div>} />
                <Route path="/candidate/:id" exact element={<div><Candidate /></div>} />
                {this.props.admin > 0 ?

                  <><Route path="/mod/dashboard" exact element={<div><ModDashboard /></div>} />
                    <Route path='/create/candidate' exact element={<div><CreateCandidate /></div>} />
                    <Route path='/edit/candidate/:id' exact element={<div><EditCandidate /></div>} />

                    <Route path='/create/election' exact element={<div><CreateElection /></div>} />
                    <Route path='/edit/election/:id' exact element={<div><EditElection /></div>} />
                    <Route path='/create/party/' exact element={<div><CreateParty /></div>} />
                    <Route path='/edit/party/:id' exact element={<div><EditParty /></div>} />
                    <Route path='/assessment/general/:id' exact element={<div><TakeQuizAsCandidate /></div>} />

                  </>
                  : null}
                {this.props.admin === 3 ?
                  <>
                    <Route path="/edit/questions/general" exact element={<div><EditGeneralQuestions /></div>} />
                    <Route path='/edit/questions/:id' exact element={<div><EditElectionSpecificQuestions /></div>} />
                  </>
                  : null}

              </Switch>
            </div>
          </div>
        </Router>

      </Suspense>)
    }
    else if (localStorage.getItem('token')) {
      return (<Suspense fallback={<div>Loading...</div>}>


        <Router>
          <div className="app">
            <SideBar />

            <div className="app-right">
              Loading...
            </div>
          </div>
        </Router>

      </Suspense>)
    }
    else {
      return (
        <Suspense fallback={<div>Loading...</div>}>


          <Router>
            <div className="app">
              <SideBar />

              <div className="app-right">
                <Switch>
                  <Route path="/" element={<div>Home</div>} />
                  <Route path="/profile/login" element={<Login />} />
                  <Route path="/profile/forgot-password/:id" exact element={<ResetPassword />} />
                  <Route path="/profile/forgot-password" element={<ForgotPassword />} />
                  <Route path="/profile/sign-up" element={<Signup />} />
                  <Route path="/profile/socials/google/:id" element={<CreateFromGoogle />} />
                  <Route path="/profile/socials/merge/:id" element={<Merge />} />
                  <Route path="/profile/authenticate/:token" element={<Authenticate />} />

                </Switch>
              </div>
            </div>
          </Router>

        </Suspense>
      )
    }

  }
}
const mapDispatch = (dispatch) => {
  return ({
    load: async () => loadProfile(dispatch),
    getAllQuestions: async () => await getAllQuestions(dispatch)
  })
}
const mapStateToProps = (state) => {
  return ({
    loaded: state.profile.loaded,
    admin: state.profile.user.admin,
    state: state
  });
}
export default connect(mapStateToProps, mapDispatch)(App);
