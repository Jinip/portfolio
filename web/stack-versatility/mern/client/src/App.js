import React, { Component } from 'react'
import { Grid, Row, Col, Panel, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
//import 'bootstrap-css'
//import './App.css'
//import './Navbar.css'

import axios from 'axios'

//import Navbar from './components/Navbar/Navbar'
import Navbar from './Navbar'

class App extends Component {
  state = {
    isSignedIn: false,
    user: "",
    items: [],
    newTitle: "",
    newBody: ""
  };

  signIn = () => {
    this.setState({ isSignedIn: true });
    this.setState({ user: localStorage.getItem("todoUser") });

    axios.get("http://localhost:3001/todos/?author=" + this.state.user)
      .then(res => {
        this.setState({items: res.data})
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  signOut = () => {
    this.setState({ isSignedIn: false });
    this.setState({user: ""});
    this.setState({items: []});
    localStorage.removeItem("todoUser");
  }

  newTitleOnChange = (e) => {
    this.setState({newTitle: e.target.value});
  }

  newBodyOnChange = (e) => {
    this.setState({newBody: e.target.value});
  }

  submitTodo = (e) => {
    e.preventDefault()
    let todo = {
      author: this.state.user,
      title: this.state.newTitle,
      body: this.state.newBody
    }
    axios.post("http://localhost:3001/todos/", todo)
      .then(res => {
        console.log(res.data)
        this.setState({items: [...this.state.items, res.data]})
        this.setState({newTitle: ""});
        this.setState({newBody: ""});
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteTodo = (e) => {
    e.preventDefault();
    let id = e.target.value;
    axios.delete("http://localhost:3001/todos/" + id)
      .then(res => {
        this.setState({items: this.state.items.filter((item) => {
          return item._id !== id;
        })})
      })
  }


  componentDidMount() {
    let user = localStorage.getItem("todoUser");

    if (user) {
      this.signIn();
    }
  }

  render() {
    return (
      <Grid className="show-grid">
        <Row >
          <Navbar signIn={this.signIn} signOut={this.signOut} {...this.state} />
        </Row>
        <Row>
          <Col xs={1} />
          <Col xs={10} >
          {this.state.user ? 
            <div>
              <Form >
                <h2>New To-Do</h2>
                <FormGroup>
                  <ControlLabel className="mongoGreen">Title</ControlLabel>
                  <FormControl type="text" value={this.state.newTitle} onChange={this.newTitleOnChange}/>
                  <ControlLabel>Description</ControlLabel>
                  <FormControl type="text" value={this.state.newBody} onChange={this.newBodyOnChange}/>
                </FormGroup>
                <Button disabled={!this.state.newTitle} onClick={this.submitTodo}>Submit</Button>
              </Form>
              <Panel >
                <Panel.Body className="panel-container" >
                  <h2>Things To Do</h2>
                      {this.state.items.map(todo => {
                        return (
                          <Panel key={todo._id} defaultExpanded>
                              <Panel.Heading>
                                {todo.title}
                                <Panel.Toggle componentClass="p" />
                              </Panel.Heading>
                              <Panel.Collapse>
                              <Panel.Body >
                                {todo.body}
                              </Panel.Body>
                            </Panel.Collapse>
                            <Button value={todo._id} onClick={this.deleteTodo}>Delete</Button>
                          </Panel>
                        )
                      })}
                </Panel.Body>
              </Panel >
            </div>
            : <div></div>
          }
          </Col>
          <Col xs={1} />
        </Row>
      </Grid>
    )
  }
}

export default App;
