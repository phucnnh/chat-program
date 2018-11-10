import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {firebaseAuth, authProvider } from "./config/Config";
import Dashboards from './components/Dashboards';
import Login from './components/Login';
import { UpdateUser } from './actions/UpdateUser';
import { bindActionCreators } from 'redux';


// Initialize Firebase
// TODO: Replace with your project's customized code snippet


class App extends Component {
  onUpdateUser = (user) => {
    this.props.onUpdateUser(user);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    firebaseAuth.onAuthStateChanged((user) => {
      this.onUpdateUser(user);

      
    });
  }

  render() {
   
    var page = this.props.user ?  ( <Dashboards/>) : (<Login/>);
    return (
          <div>
            {page}
          </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onUpdateUser: UpdateUser
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps) (App);