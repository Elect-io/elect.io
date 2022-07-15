import React from 'react';
import { connect } from 'react-redux';
import { Routes as Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import setToken from './actions/setToken';
import { loadProfile } from './actions/auth';
import General from './components/assessment/general';
import { getAllQuestions } from './actions/poll';
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
const ModDashboard = lazy(() => import('./components/moderator/dashboard'));
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
                {this.props.admin > 0 ?

                  <><Route path="/mod/dashboard" exact element={<div><ModDashboard /></div>} />
                  <Route path='/create/candidate' exact element={<div><CreateCandidate /></div>} />
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
