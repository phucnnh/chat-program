import React from 'react';
import { firebaseAuth } from "../config/Config";
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Linkify from 'react-linkify';
import { bindActionCreators, compose } from 'redux';

import { updateInput } from '../actions/UpdateInput';
import { UpdateUserList } from '../actions/UpdateUserList';
import { UpdateMessage } from '../actions/UpdateMessage';

class ChatForm extends React.Component {


  handleChange = (e) => {
    var a = e.target.value;
    this.props.onUpdateInput(a);
  }

  userList = (e) => {
    var a = e.target.value;
    this.props.onUpdateUserList(a);
  }

  clickToChat(chattingUser) {
    var user = firebaseAuth.currentUser;
    var email, emailName;

    if (user != null) {
      email = user.email;
      emailName = email.split('@gmail.com');
    }
    if (chattingUser != null) {

      this.props.firebase.update(`user/${emailName[0]}`,
        {
          isChattingWith: chattingUser
        });
    }

  }

  isExistPath(path, messageStore) {
    let i = 0;
    while (Object.keys(messageStore)[i] != null) {
      if (Object.keys(messageStore)[i] === path) {
        return true;
      }
      i++;
    }
    return false;
  }


  onSend = () => {
    document.getElementById('message-to-send').value = '';

    var user = firebaseAuth.currentUser;
    var name, email, emailName;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      emailName = email.split('@gmail.com');
    }
    const arr = !isLoaded(this.props.user)
      ? 'Loading'
      : isEmpty(this.props.user)
        ? 'User list is empty'
        : Object.keys(this.props.user).map(
          (key, id) => (this.props.user[key])
        )

    const messageStore = !isLoaded(this.props.message)
      ? 'Loading'
      : isEmpty(this.props.message)
        ? 'Message list is empty'
        : this.props.message
    let x = 0;
    while (arr[x] != null) {

      if (arr[x].email === email) {

        if (arr[x].email === arr[x].isChattingWith) {

          var input = this.props.input;
          var fb = this.props.firebase;

          console.log("oook" + input)
          if (input != null) {

            console.log("oh well");

            fb.push(`message/${emailName[0]}_`, { [name]: `${input}`, isImage: false });


          }

        }
        else {

          var input = this.props.input;
          var fb = this.props.firebase;


          var path1 = `message/${emailName[0]}_${arr[x].isChattingWith.split('@gmail.com')[0]}`;

          if (input != null) {



            console.log("oh well");


            fb.push(path1, { [name]: `${input}`, isImage: false });



          }




        }
      }
      x++;
    }

    this.props.onUpdateInput(null)

  }


  scrollToBottom = (options) => {
    this.messageEnd.scrollIntoView(options);
  }


  componentDidMount() {
    this.scrollToBottom(false);
  }

  componentDidUpdate() {
    this.scrollToBottom({ block: 'end', behavior: "smooth" });
  }

  render() {
    if (this.props.userlist === null) {
      this.props.onUpdateUserList('');
    }
    var user = firebaseAuth.currentUser;
    var email, emailName;

    if (user != null) {
      email = user.email;
      emailName = email.split('@gmail.com');
    }

    const swapList = !isLoaded(this.props.user)
      ? 'Loading'
      : isEmpty(this.props.user)
        ? 'User list is empty'
        : this.props.user



    const userList = Object.keys(swapList).map(
      (key, id) => (
        String(swapList[key].name).toLowerCase().includes(this.props.userlist) ?
          (<li key={key} id={id} class="clearfix li-cursor no-bullets" onClick={() => this.clickToChat(swapList[key].email)}>
            <img class="user-profile" src={swapList[key].photoUrl} alt="avatar" />
            <div class="about">
              <div class="name">{swapList[key].name}</div>

              {swapList[key].online == true ? (<div class="online-stt">online</div>) : <div class="status">offline</div>}
            </div>

          </li>) : null)

    )

    var chatControl;
    const arr = !isLoaded(this.props.user)
      ? 'Loading'
      : isEmpty(this.props.user)
        ? 'User list is empty'
        : Object.keys(this.props.user).map(
          (key, id) => (this.props.user[key])
        )
    let x = 0;
    let y = 0;
    var head;
    const starStyle = {
      color: 'red',
    };
    while (arr[x] != null) {

      if (arr[x].email === email) {
        while (arr[y] != null) {
          if (arr[x].isChattingWith != null) {
            if (arr[x].isChattingWith === arr[y].email) {
              head = (<div class="chat-header clearfix">
                <img class="user-profile" src={arr[y].photoUrl} alt="avatar" />

                <div class="chat-about">
                  <div class="chat-with">{arr[y].name}</div>
                </div>

              </div>)
            }

          }
          else {
            head = null;
            chatControl = null;
            break;
          }
          y++;
        }
      }
      x++;
    }
    let i = 0;
    var chatHistory;
    const arr2 = !isLoaded(this.props.message)
      ? 'Loading'
      : isEmpty(this.props.message)
        ? 'Message list is empty'
        : Object.keys(this.props.message).map(
          (key, id) => (this.props.message[key])
        )

    const messageStore = !isLoaded(this.props.message)
      ? 'Loading'
      : isEmpty(this.props.message)
        ? 'Message list is empty'
        : this.props.message

    while (arr[i] != null) {
      if (arr[i].email === email) {
        if (arr[i].isChattingWith != null) {
          var chatWith = arr[i].isChattingWith.split('@gmail.com')[0];
          if (arr[i].email === arr[i].isChattingWith) {
            let k = 0;
            while (Object.keys(messageStore)[k] != null) {
              if (Object.keys(messageStore)[k] === `${emailName[0]}_`) {
                chatHistory = Object.keys(arr2[k]).map(
                  (key, id) => (

                    <li key={key} id={id} class="clearfix no-bullets">
                      <div class="message-data align-right">
                        <span class="message-data-name" >{arr[i].name}</span>

                      </div>
                      <div class="message other-message float-right">
                        {String(arr2[k][key][arr[i].name]).includes("data:image") ? <img class="img-link" src={arr2[k][key][arr[i].name]} alt="image" />
                          :
                          (arr2[k][key].isImage === true ? <div><Linkify>{arr2[k][key][arr[i].name]}</Linkify>
                            <div><img class="img-link" src={arr2[k][key][arr[i].name]} alt="image" /></div></div>
                            : <div>{arr2[k][key][arr[i].name]}</div>)}
                      </div>
                    </li>
                  )
                )
              }
              k++;
            }
          } else {
            let k = 0;

            while (Object.keys(messageStore)[k] != null) {

              if (Object.keys(messageStore)[k] === `${emailName[0]}_${chatWith}`) {
                chatHistory = Object.keys(arr2[k]).map(
                  (key, id) => (
                    Object.keys(arr2[k][key])[0] === arr[i].name ?
                      (<li key={key} id={id} class="clearfix">
                        <div class="message-data align-right">
                          <span class="message-data-name" >Me</span>

                        </div>
                        <div class="message other-message float-right">
                          {String(arr2[k][key][arr[i].name]).includes("data:image") ? <img class="img-link" src={arr2[k][key][arr[i].name]} alt="image" />
                            :
                            (arr2[k][key].isImage === true ? <div><Linkify>{arr2[k][key][arr[i].name]}</Linkify>
                              <div><img class="img-link" src={arr2[k][key][arr[i].name]} alt="image" /></div></div>
                              : <div>{arr2[k][key][arr[i].name]}</div>)}
                        </div>
                      </li>) : (<li key={key} id={id}>
                        <div class="message-data">
                          <span class="message-data-name">{Object.keys(arr2[k][key])[0]}</span>
                        </div>
                        <div class="message my-message">
                          {String(arr2[k][key][Object.keys(arr2[k][key])[0]]).includes("data:image") ? <img class="img-link" src={arr2[k][key][Object.keys(arr2[k][key])[0]]} alt="image" />
                            :
                            (arr2[k][key].isImage === true ? <div><Linkify>{arr2[k][key][Object.keys(arr2[k][key])[0]]}</Linkify>
                              <div><img class="img-link" src={arr2[k][key][Object.keys(arr2[k][key])[0]]} alt="image" /></div></div>
                              : <div>{arr2[k][key][Object.keys(arr2[k][key])[0]]}</div>)}
                        </div>
                      </li>)
                  )
                )
              }
              if (Object.keys(messageStore)[k] === `${chatWith}_${emailName[0]}`) {
                chatHistory = Object.keys(arr2[k]).map(
                  (key, id) => (
                    Object.keys(arr2[k][key])[0] === arr[i].name ?
                      (<li key={key} id={id} class="clearfix">
                        <div class="message-data align-right">
                          <span class="message-data-name" >Me</span>

                        </div>
                        <div class="message other-message float-right">
                          {String(arr2[k][key][arr[i].name]).includes("data:image") ? <img class="img-link" src={arr2[k][key][arr[i].name]} alt="image" />
                            :
                            (arr2[k][key].isImage === true ? <div><Linkify>{arr2[k][key][arr[i].name]}</Linkify>
                              <div><img class="img-link" src={arr2[k][key][arr[i].name]} alt="image" /></div></div>
                              : <div>{arr2[k][key][arr[i].name]}</div>)}
                        </div>
                      </li>) : (<li key={key} id={id}>
                        <div class="message-data">
                          <span class="message-data-name">{Object.keys(arr2[k][key])[0]}</span>
                        </div>
                        <div class="message my-message">
                          {String(arr2[k][key][Object.keys(arr2[k][key])[0]]).includes("data:image") ? <img class="img-link" src={arr2[k][key][Object.keys(arr2[k][key])[0]]} alt="image" />
                            :
                            (arr2[k][key].isImage === true ? <div><Linkify>{arr2[k][key][Object.keys(arr2[k][key])[0]]}</Linkify>
                              <div><img class="img-link" src={arr2[k][key][Object.keys(arr2[k][key])[0]]} alt="image" /></div></div>
                              : <div>{arr2[k][key][Object.keys(arr2[k][key])[0]]}</div>)}
                        </div>
                      </li>))
                )
              }
              //
              k++;
            }

          }

          chatControl = (<div class="chat-message clearfix">
            <textarea onChange={(e) => this.handleChange(e)} name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>

            <button onClick={() => this.onSend()}>Send</button>
          </div>)
        } else {
          chatHistory = null;
          chatControl = null;
          break;
        }
      }
      i++;
    }
    return (
      <div>
        <div class="container1 clearfix">
          <div class="people-list" id="people-list">
            <div class="search">
              <input type="text" placeholder="search" onChange={(e) => this.userList(e)} />
              <i class="fa fa-search"></i>
            </div>
            <ul class="list">
              {userList}
            </ul>
          </div>

          <div class="chat">
            {head}
            <div class="chat-history">
              <ul class="no-bullets">
                {chatHistory}
                <li ref={(el) => { this.messageEnd = el; }}></li>
              </ul>
            </div>
            {chatControl}
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onUpdateInput: updateInput,
    onUpdateUserList: UpdateUserList,
    onUpdateLastMessage: UpdateMessage,

  }, dispatch);
}
export default compose(
  firebaseConnect([
    'user', 'message' // { path: '/user' } // object notation
  ]),
  connect(((state) => ({
    user: state.firebase.data.user,
    message: state.firebase.data.message,
    input: state.input,
    userlist: state.userlist,
    lastMessage: state.lastMessage,

  })), mapDispatchToProps)
)(ChatForm)
