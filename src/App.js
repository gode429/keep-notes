import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//import FetchNotes from './containers/FetchNotes/FetchNotes';
//import EditNote from './containers/EditNote/EditNote';
import CreateNote from './containers/CreateNote/CreateNote';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

//Lazy loading for components in route, means component is only loaded when it is required

const asyncFetchNotes = asyncComponent(() => {
  return import('./containers/FetchNotes/FetchNotes');
});

const asyncEditNote = asyncComponent(() => {
  return import('./containers/EditNote/EditNote');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});


class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/createnote" exact component={CreateNote} />
        <Route path="/" exact component={CreateNote} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          {/* <Route path="/checkout" component={asyncCheckout} /> */}
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/createnote" exact component={CreateNote} />
          <Route path="/fetchNotes" component={asyncFetchNotes} />
          <Route path="/editNote" component={asyncEditNote} />
          <Route path="/" exact component={CreateNote} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));