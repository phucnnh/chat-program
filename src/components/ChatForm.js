import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { firebaseAuth } from "../config/Config";
import { bindActionCreators, compose } from 'redux';
import { Textbox } from '../actions/Textbox';
import { UpdateUserList } from '../actions/UpdateUserList';
import imageExists from 'image-exists';
import { NewMessage } from '../actions/NewMessage';
import Linkify from 'react-linkify';
import { LoadImage } from '../actions/LoadImage';
class ChatForm extends React.Component {

  handleChange = (e) => {
    var value = e.target.value;
    this.props.onUpdateTextbox(value);
  }

  update_userlist = (e) => {
    var value = e.target.value;
    this.props.onUpdateUserList(value);
  }
  
  clickUser(userClicked) {
      var user = firebaseAuth.currentUser;
      var email, emailName;
      
      if (user != null) {
      email = user.email;
      emailName = email.split('@gmail.com');
      }
      if (userClicked!=null) {
        
        this.props.firebase.update(`user/${emailName[0]}`, 
            {   
                isChattingWith: userClicked});
            }

  }

  isExistPath(path, messageStore) {
    let i = 0;
    while(Object.keys(messageStore)[i] != null){
      if(Object.keys(messageStore)[i] === path) {
        return true;
      }
      i++;
    }
    return false;
  }

  onStar = () => {
    var user = firebaseAuth.currentUser;
      var email, emailName;
      
      if (user != null) {
      email = user.email;
      emailName = email.split('@gmail.com');
      }
      const arr  = !isLoaded(this.props.user)
        ? 'Loading'
        : isEmpty(this.props.user)
          ? 'User list is empty'
          : Object.keys(this.props.user).map(
            (key, id) => ( this.props.user[key])
          )
      let i = 0;
      while(arr[i] != null) {
        if(arr[i].email === email) {
          if(arr[i].isStar === arr[i].isChattingWith) {
            this.props.firebase.update(`user/${emailName[0]}`, 
            {   
                isStar: ""});
          } else {
            this.props.firebase.update(`user/${emailName[0]}`, 
            {   
                isStar: arr[i].isChattingWith});
          }
        }
        i++;
      }
  }
    onSend = () => {
      document.getElementById('message-to-send').value = '';
      document.getElementById('btnFile').value = null;
      var user = firebaseAuth.currentUser;
      var name, email, emailName;
      
      if (user != null) {
      name =  user.displayName;
      email = user.email;
      emailName = email.split('@gmail.com');
      }
      const arr  = !isLoaded(this.props.user)
        ? 'Loading'
        : isEmpty(this.props.user)
          ? 'User list is empty'
          : Object.keys(this.props.user).map(
            (key, id) => ( this.props.user[key])
          )

          const messageStore  = !isLoaded(this.props.message)
        ? 'Loading'
        : isEmpty(this.props.message)
          ? 'Message list is empty'
          : this.props.message
          let x = 0;
          while(arr[x] != null) {
            
            if(arr[x].email === email) {
              
              if(arr[x].email === arr[x].isChattingWith) {
                var isImage = false;
                var input = this.props.textbox;
                var fb = this.props.firebase;
                var img = this.props.image;
                console.log("oook" + input)
                if(input != null) {
                {imageExists(input, function(exists) {
                  if (exists) {
                    console.log("it's alive!");
                    isImage = true;
                    fb.push(`message/${emailName[0]}_`, {[name]: `${input}`, isImage: isImage});
                  }
                  else {
                    console.log("oh well");
                    isImage = false;
                    fb.push(`message/${emailName[0]}_`, {[name]: `${input}`, isImage: isImage});
                  }
                })}
              }
                if(img !=null) {
                  fb.push(`message/${emailName[0]}_`, {[name]: `${img}`, isImage: true});
                }
              }
              else {
                var isImage = false;
                var input = this.props.textbox;
                var fb = this.props.firebase;
                var img = this.props.image;
                var isPathExist = this.isExistPath(`${emailName[0]}_${arr[x].isChattingWith.split('@gmail.com')[0]}`, messageStore);
                var path1 = `message/${emailName[0]}_${arr[x].isChattingWith.split('@gmail.com')[0]}`;
                var path2 = `message/${arr[x].isChattingWith.split('@gmail.com')[0]}_${emailName[0]}`;
                if(input != null) {
                {imageExists(input, function(exists) {
                  if (exists) {
                    console.log("it's alive!");
                    isImage = true;
                    if (isPathExist){
                      fb.push(path1,{[name]: `${input}`, isImage: isImage});
                    }
                    else {
                      fb.push(path2,{[name]: `${input}`, isImage: isImage});
                    }
                  }
                  else {
                    console.log("oh well");
                    isImage = false;
                    if (isPathExist){
                      fb.push(path1,{[name]: `${input}`, isImage: isImage});
                    }
                    else {
                      fb.push(path2,{[name]: `${input}`, isImage: isImage});
                    }
                  }
                })}
              }
                if (isPathExist){
                  if(img !=null) {
                    fb.push(path1,{[name]: `${img}`, isImage: true});
                  }
                }
                else {
                  if(img !=null) {
                    fb.push(path2,{[name]: `${img}`, isImage: true});
                  }
                }
                
              }
            }
            x++;
          }
        
        this.props.onUpdateTextbox(null)
        this.props.onLoadImage(null)
    }

  onImageChange(event) {
      if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            
              
              this.props.onLoadImage(e.target.result)
              console.log("data:" +this.props.image)
              
          };
          reader.readAsDataURL(event.target.files[0]);
      }
      else {
        
        this.props.onLoadImage(null)
        console.log("data:" +this.props.image)
      }
  }

  scrollToBottom = (options) => {
    this.messageEnd.scrollIntoView(options);
  }


  componentDidMount(){
    this.scrollToBottom(false);
  }

  componentDidUpdate(){
    this.scrollToBottom({block: 'end', behavior: "smooth"});
  }

    render() {
      if(this.props.userlist === null) {
        this.props.onUpdateUserList('');
      }
      var user = firebaseAuth.currentUser;
      var email, emailName;
      
      if (user != null) {
      email = user.email;
      emailName = email.split('@gmail.com');
      }
      
      const swapList  = !isLoaded(this.props.user)
      ? 'Loading'
      : isEmpty(this.props.user)
        ? 'User list is empty'
        : this.props.user

        let j = 0;
        while(Object.keys(swapList)[j] != null) {
          if(swapList[Object.keys(swapList)[j]].email === email) {
            if(swapList[Object.keys(swapList)[j]].isStar != null && swapList[Object.keys(swapList)[j]].isStar != "") {
              let m = 0;
              while(Object.keys(swapList)[m] != null) {
                if(swapList[Object.keys(swapList)[m]].email === swapList[Object.keys(swapList)[j]].isStar 
              && swapList[Object.keys(swapList)[m]].online === true) {
                  var temp = swapList[Object.keys(swapList)[0]];
                  swapList[Object.keys(swapList)[0]] = swapList[Object.keys(swapList)[m]];
                  swapList[Object.keys(swapList)[m]] = temp;
                  break;
                }
                m++;
              }
            } else break;
          }
          j++;
        }

        const onlineStyle = {
          color: 'greenyellow',
        };
        const offlineStyle = {
          color: 'lightslategrey',
        };
      const userList  = Object.keys(swapList).map(
          (key, id) => (
            String(swapList[key].name).toLowerCase().includes(this.props.userlist) ?
            (<li key={key} id={id} class="clearfix li-cursor no-bullets" onClick={() => this.clickUser(swapList[key].email)}>
                  <img class="user-profile" src={swapList[key].photoUrl} alt="avatar" />
                  <div class="about">
                    <div class="name">{swapList[key].name}</div>
                    
                      {swapList[key].online == true ? (<div class="fa fa-circle" style={onlineStyle}></div>)
                      :<div class="fa fa-circle" style={offlineStyle}></div>}
                    </div>
                  
            </li>) : null)
            
        )

        var chatControl;
        const arr  = !isLoaded(this.props.user)
        ? 'Loading'
        : isEmpty(this.props.user)
          ? 'User list is empty'
          : Object.keys(this.props.user).map(
            (key, id) => ( this.props.user[key])
          )
          let x = 0;
          let y = 0;
          var head;
          const starStyle = {
            color: 'sandybrown',
          };
          while(arr[x] != null) {

            if(arr[x].email === email) {
            while(arr[y] != null){
              if(arr[x].isChattingWith != null) {
              if(arr[x].isChattingWith === arr[y].email) {
                head = (<div class="chat-header clearfix">
                <img class="user-profile" src={arr[y].photoUrl} alt="avatar" />
                
                <div class="chat-about">
                  <div class="chat-with">{arr[y].name}</div>
                </div>
                {arr[x].isStar === arr[y].email ? <i style={starStyle} class="fa fa-star li-cursor" onClick={() => this.onStar()}></i>
                : <i class="fa fa-star li-cursor" onClick={() => this.onStar()}></i>}
              </div>)
              }
              
            }
            else {
              head =null;
              chatControl = null;
              break;
            }
              y++;
            } }
            x++;
          }
          let i = 0;
          var chatArea;
          const arr2  = !isLoaded(this.props.message)
        ? 'Loading'
        : isEmpty(this.props.message)
          ? 'Message list is empty'
          : Object.keys(this.props.message).map(
            (key, id) => ( this.props.message[key])
          )

          const messageStore  = !isLoaded(this.props.message)
        ? 'Loading'
        : isEmpty(this.props.message)
          ? 'Message list is empty'
          : this.props.message

          while(arr[i] != null) {
            if(arr[i].email === email) {
              if(arr[i].isChattingWith != null) {
              var chatWith = arr[i].isChattingWith.split('@gmail.com')[0];
              if(arr[i].email === arr[i].isChattingWith) {
                let k = 0;
                while(Object.keys(messageStore)[k] != null) {
                  if(Object.keys(messageStore)[k] === `${emailName[0]}_`){
                    chatArea = Object.keys(arr2[k]).map(
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
                
                while(Object.keys(messageStore)[k] != null) {
                  
                  if(Object.keys(messageStore)[k] === `${emailName[0]}_${chatWith}`){
                    chatArea = Object.keys(arr2[k]).map(
                      (key, id) => (
                        Object.keys(arr2[k][key])[0] === arr[i].name ?
                    (<li key={key} id={id} class="clearfix">
                      <div class="message-data align-right">
                        <span class="message-data-name" ></span>
                        
                      </div>
                      <div class="message other-message float-right">
                      {String(arr2[k][key][arr[i].name]).includes("data:image") ? <img class="img-link" src={arr2[k][key][arr[i].name]} alt="image" />
                      :
                      (arr2[k][key].isImage === true ? <div><Linkify>{arr2[k][key][arr[i].name]}</Linkify>
                      <div><img class="img-link" src={arr2[k][key][arr[i].name]} alt="image" /></div></div>
                      : <div>{arr2[k][key][arr[i].name]}</div>)}
                      </div>
                    </li>):(<li key={key} id={id}> 
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
                  if(Object.keys(messageStore)[k] === `${chatWith}_${emailName[0]}`){

                    chatArea = Object.keys(arr2[k]).map(
                      (key, id) => (
                        Object.keys(arr2[k][key])[0] === arr[i].name ?
                    (<li key={key} id={id} class="clearfix">
                      <div class="message-data align-right">
                        <span class="message-data-name" ></span>
                        
                      </div>
                      <div class="message other-message float-right">
                      {String(arr2[k][key][arr[i].name]).includes("data:image") ? <img class="img-link" src={arr2[k][key][arr[i].name]} alt="image" />
                      :
                      (arr2[k][key].isImage === true ? <div><Linkify>{arr2[k][key][arr[i].name]}</Linkify>
                      <div><img class="img-link" src={arr2[k][key][arr[i].name]} alt="image" /></div></div>
                    : <div>{arr2[k][key][arr[i].name]}</div>)}
                      </div>
                    </li>):(<li key={key} id={id}> 
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
                  
                  k++;
                }
                
              }

              

            chatControl = (<div class="chat-message clearfix">
              <textarea onChange={(e)=> this.handleChange(e)} name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea>
              <button class="fa fa-send" onClick={() => this.onSend()}></button>
              <input id="btnFile" type='file'
              accept="image/png, image/jpeg, image/gif" onChange={(e) => this.onImageChange(e)}/>
            
              </div>)
            } else {
              chatArea = null;
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
                <input type="text" placeholder="search" onChange={(e)=> this.update_userlist(e)}/>
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
                  {chatArea}
                  <li ref={(el) => {this.messageEnd = el;}}></li>
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
    onUpdateTextbox: Textbox,
    onUpdateUserList: UpdateUserList,
    onUpdateNewMessage: NewMessage,
    onLoadImage: LoadImage
  }, dispatch);
}
export default compose(
  firebaseConnect([
    'user', 'message' // { path: '/user' } // object notation
  ],),
  connect(((state) => ({
    user: state.firebase.data.user,
    message: state.firebase.data.message,
    textbox: state.textbox,
    userlist: state.userlist,
    newMessage: state.newMessage,
    image: state.image
  })),mapDispatchToProps)
)(ChatForm)