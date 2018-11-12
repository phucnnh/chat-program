import React from 'react';
import './App.css';
import DashBoards from './components/DashBoards';
import Login from './components/Login';
import {firebaseAuth } from "./config/Config";
import { connect } from 'react-redux';
import { UpdateUser } from './actions/UpdateUser';
import { bindActionCreators } from 'redux';

class App extends React.Component {

  onUpdateUser = (user) => {
    this.props.onUpdateUser(user);
  }
  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    firebaseAuth.onAuthStateChanged((user) => {
      this.onUpdateUser(user);

      if (user) {
      } else {
        console.log("no user");
      }
      
    });
  }

  render() {
    var page = this.props.user ?  ( <DashBoards/>) : (<Login/>);
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
