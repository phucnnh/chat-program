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
    <Col xs={6} md={4}>
    </Col>
    <Col xs={6} md={4}>
    <h1 class="text-center">Welcome</h1>
    </Col>
    <Col xsHidden md={4}>
    </Col>
  </Row>
  <Row className="show-grid">
    <Col xs={6} md={4}>
    </Col>
    <Col xs={6} md={6}>
  <p>
    This is Chat webpage. To continue, your have to sign in first!
  </p>
    </Col>
    <Col xsHidden md={4}>
    </Col>
  </Row>
  <Row className="show-grid">
    <Col xs={6} md={4}>
    </Col>
    <Col xs={6} md={4}>
    <div class="div-center">
    <button class="button button1"  onClick={this.handleLogin}>Sign in with Google</button>
  </div>
    </Col>
    <Col xsHidden md={4}>
    </Col>
  </Row>
</Grid>
    )
  
    }
}
 export default (Login);