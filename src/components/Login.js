import React from 'react';
import {firebaseAuth, authProvider} from "../config/Config";
import { Grid, Row, Col} from 'react-bootstrap';

class Login extends React.Component {

    handleLogin = () => {
    firebaseAuth.signInWithPopup(authProvider);
    }

  render() {

    return (
        <Grid>
          <Row className="show-grid">
    <Col>
    <div class="welcome">
    <h1 class="text-center">Welcome to chat website</h1> 
  <p>
    Login now with Google account
  </p>
    <div class="div-center">
    <button class="btnLogin"  onClick={this.handleLogin}>Login</button>
  </div>
  </div>
    </Col>
  </Row>
</Grid>
    )
  
    }
}
 export default (Login);