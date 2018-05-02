import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Grid, Row } from 'react-bootstrap'
import 'bootstrap-css'
import './App.css'

import Navbar from './components/Navbar/Navbar'

class App extends Component {
  state = {
    isSignedIn: false,
    user: ""
  };

  signIn = () => {
    this.setState({ isSignedIn: true });
    this.setState({ user: localStorage.getItem("todoUser") });
  }

  signOut = () => {
    this.setState({ isSignedIn: false });
    localStorage.removeItem("todoUser");
  }


  componentDidMount() {
    let user = localStorage.getItem("todoUser");

    if (user) {
      this.setState({ isSignedIn: true });
      this.setState({ user: user });
    }
  }

  render() {
    return (
      <Grid className="show-grid">
        <Row >
          <Navbar signIn={this.signIn} signOut={this.signOut} {...this.state} />
        </Row>
        <Row>
        </Row>
      </Grid>
    )
  }
}

export default App;
