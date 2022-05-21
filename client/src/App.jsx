import React from 'react';
import { connect } from 'react-redux';
import { Routes as Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const SideBar = lazy(() => import('./components/reusables/sidebar'));

class App extends React.Component {
  render() {
    console.log(this.props.loaded);
    return (
      <Suspense fallback={<div>Loading...</div>}>


        <Router>
          <div className="app">
            <SideBar />

            <div className="app-right">
              <Switch>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/login" element={<div>Login</div>} />
              </Switch>
            </div>
          </div>
        </Router>

      </Suspense>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    loaded: state.profile.loaded
  });
}
export default connect(mapStateToProps)(App);
