import React from 'react';
import {firebaseAuth} from "../config/Config";
import { Grid, Row, Col } from 'react-bootstrap';
import ChatForm from './ChatForm';
import { withFirebase } from 'react-redux-firebase';

class Dashboards extends React.Component {

    logout = () => {
        var user = firebaseAuth.currentUser;
        var  email, emailName;
        
        if (user != null) {
        
        email = user.email;
      
        
      
        emailName = email.split('@gmail.com')

            this.props.firebase.update(`user/${emailName[0]}`, 
            {   
                online: false});
                this.props.firebase.logout();
        }
    }

    render() {

        var user = firebaseAuth.currentUser;
        var name, email, photoUrl,  emailVerified, emailName;
        
        if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
       
        emailName = email.split('@gmail.com')

            this.props.firebase.update(`user/${emailName[0]}`, 
            {   name: name,
                email: email,
                photoUrl: photoUrl,
                emailVerified: emailVerified,
                online: true});
        }
 
        return (
            <div>
                <Grid>
                <Row className="show-grid">
    <Col>
    <div class = "userinfo">
        <img class="user-profile" src={photoUrl} alt="avatar" />
        <button class="btnLogout" onClick={this.logout}>Logout</button>
    </div>
    <div class = "userinfo">{name} </div> 
    <div class = "userinfo">{email} </div>
    </Col>
    </Row>


    <div class="spacer"></div>
    <ChatForm/>
    </Grid>
    </div>
    
        )

    }

}

export default withFirebase(Dashboards);