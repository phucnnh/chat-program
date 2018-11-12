import React from 'react';
import { firebaseAuth, authProvider } from "../config/Config";
import { Grid, Row, Col } from 'react-bootstrap';

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
              <h1 class="text-center">Hello! Chat For Fun</h1>
              <div class="div-center">
                <button class="loginBtn loginBtn--google" onClick={this.handleLogin}>
                  Login with Google
                </button>
              </div>
              <img class="img-welcome"
                src="https://d38v16rqg5mb6e.cloudfront.net/wp-content/uploads/2013/09/FC_chrctr_02.png" />
            </div>
          </Col>
        </Row>
      </Grid>
    )

  }
}
export default (Login);