import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase";
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
export var config = {
  apiKey: "AIzaSyATYsRS_M6geNfZV5yseO9DdHc3TTIOI6k",
  authDomain: "chat-program-d8e67.firebaseapp.com",
  databaseURL: "https://chat-program-d8e67.firebaseio.com",
  storageBucket: "chat-program-d8e67.appspot. com",
};
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      //console.log(user);
      this.setState({
        user: user,
      })
    });
  }
  onClick = () => {

    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  onClick2 = () => {
    firebase.auth().signOut();

  }

  render() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified, emailName;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
      emailName = email.split('@gmail.com')

      this.props.firebase.set(`listuser/${emailName[0]}`,
        {
          name: name,
          email: email,
          photoUrl: photoUrl,
          emailVerified: emailVerified,
        });
    }
    const userList = !isLoaded(this.props.listuser)
      ? 'Loading'
      : isEmpty(this.props.listuser)
        ? 'User list is empty'
        : Object.keys(this.props.listuser).map(
          (key, id) => (
            this.props.listuser[key].email === email ? null : (
              <li key={key} id={id} class="clearfix li-cursor">
                <img class="user-profile" src={this.props.listuser[key].photoUrl} alt="avatar" />
                <div class="about">
                  <div class="name">{this.props.listuser[key].name}</div>


                </div>

              </li>)
          )
        )

    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <h1>Home page</h1><button onClick={this.onClick2}>Logout</button>
            {/* <div>{name}</div>
      <div>{email}</div>
       <img src={photoUrl}/></div> */}

            <div class="container clearfix">
              <div class="people-list" id="people-list">
                <div class="search">
                  <input type="text" placeholder="search" />
                  <i class="fa fa-search"></i>
                </div>
                <ul class="list">
                  {userList}

                </ul>
              </div>

              <div class="chat">
                <div class="chat-header clearfix">
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />

                  <div class="chat-about">
                    <div class="chat-with">Chat with Vincent Porter</div>
                    <div class="chat-num-messages">already 1 902 messages</div>
                  </div>
                  <i class="fa fa-star"></i>
                </div>

                <div class="chat-history">
                  <ul>
                    <li class="clearfix">
                      <div class="message-data align-right">
                        <span class="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
              <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>

                      </div>
                      <div class="message other-message float-right">
                        Hi Vincent, how are you? How is the project coming along?
            </div>
                    </li>

                    <li>
                      <div class="message-data">
                        <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                        <span class="message-data-time">10:12 AM, Today</span>
                      </div>
                      <div class="message my-message">
                        Are we meeting today? Project has been already finished and I have results to show you.
            </div>
                    </li>

                    <li class="clearfix">
                      <div class="message-data align-right">
                        <span class="message-data-time" >10:14 AM, Today</span> &nbsp; &nbsp;
              <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>

                      </div>
                      <div class="message other-message float-right">
                        Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
            </div>
                    </li>

                    <li>
                      <div class="message-data">
                        <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                        <span class="message-data-time">10:20 AM, Today</span>
                      </div>
                      <div class="message my-message">
                        Actually everything was fine. I'm very excited to show this to our team.
            </div>
                    </li>

                    <li>
                      <div class="message-data">
                        <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                        <span class="message-data-time">10:31 AM, Today</span>
                      </div>
                      <i class="fa fa-circle online"></i>
                      <i class="fa fa-circle online" ></i>
                      <i class="fa fa-circle online" ></i>
                    </li>

                  </ul>

                </div>

                <div class="chat-message clearfix">
                  <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>

                  <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i class="fa fa-file-image-o"></i>

                  <button>Send</button>

                </div>

              </div>

            </div>
          </div>
        )
          : (<div><h1>Login page</h1><button onClick={this.onClick}>Login</button></div>)}

      </div>

    );
  }
}


export default compose(
  firebaseConnect([
    'listuser' // { path: '/user' } // object notation
  ]),
  connect(((state) => ({
    listuser: state.firebase.data.listuser,
  })))
)(App)
