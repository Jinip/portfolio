import React, { Component } from 'react';
import { Navbar, Button, FormGroup, FormControl, Alert } from 'react-bootstrap';
import axios from 'axios'

class NavbarComponent extends Component {
    state = {
        signIn: true,
        username: "",
        password: "",
        passwordRepeat: "",
        submitDisabled: true,
        alert: ""
    }

    componentDidMount() {
        
    }

    toggleFormContext = () => {
        this.setState({signIn: !this.state.signIn});
    }

    usernameOnChange = (e) => {
        this.setState({username: e.target.value}, this.validate);
    }

    passwordOnChange = (e) => {
        this.setState({password: e.target.value}, this.validate)
    }

    passwordRepeatOnChange = (e) => {
        this.setState({passwordRepeat: e.target.value}, this.validate)
    }

    validate = () => {
        this.setState({alert: ""});
        this.setState({submitDisabled: true});

        if (this.state.signIn){
            if (this.state.username && this.state.password){
                this.setState({submitDisabled: false});
            }
        } else {
            if (this.state.username) {
                if (this.state.password === this.state.passwordRepeat){
                    this.setState({submitDisabled: false});
                } else {
                    this.setState({alert: "Passwords do not match"});
                }
            }
        }
    }

    getUser = (e) => {
        e.preventDefault()
        
        let url = "http://localhost:3001/auth/"

        e.target.id === "signin"
            ? url += "signin/"
            : url += "signup/"

        axios.post(url, {username: this.state.username, password: this.state.password})
            .then(res => {
                console.log(res.data)
                if (res.data.message) return this.setState({alert: res.data.message});

                localStorage.setItem("todoUser", res.data.username);
                this.props.signIn();
            })
            .catch(err => {
                return console.log(err);
            })
    }
    

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            MERN To-Do
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        { this.props.isSignedIn ? <Navbar.Text pullLeft> Welcome, {this.props.user} </Navbar.Text> : <div></div> }
                    </Navbar.Header>
                    
                    <Navbar.Collapse>
                        <Navbar.Form pullRight>
                            { !this.props.isSignedIn 
                                ? (
                                    <div>
                                        <FormGroup>
                                            <FormControl type="text" placeholder="username" onChange={this.usernameOnChange} value={this.state.username}/>
                                            <FormControl type="text" placeholder="password" onChange={this.passwordOnChange} value={this.state.password}/>
                                            { !this.state.signIn 
                                                ? <FormControl type="text" placeholder="repeat password" onChange={this.passwordRepeatOnChange} value={this.state.passwordRepeat}/>
                                                : <div></div>
                                            }
                                        </FormGroup>
                                        { this.state.signIn
                                            ? <Button id="signin" disabled={this.state.submitDisabled} onClick={this.getUser}>Sign In</Button>
                                            : <Button id="signup" disabled={this.state.submitDisabled} onClick={this.getUser}>Sign Up</Button>
                                        }
                                        { this.state.signIn
                                            ? <a onClick={this.toggleFormContext}> Switch to Sign Up </a>
                                            : <a onClick={this.toggleFormContext}> Switch to Sign In </a>
                                        }
                                    </div>
                                ) : <Button onClick={this.props.signOut}>Sign Out</Button>
                            }
                        </Navbar.Form>
                    </Navbar.Collapse>
                    { this.state.alert 
                        ? <Alert type="warning"> {this.state.alert}</Alert>
                        : <div></div>
                    }
                </Navbar>
            </div>
        );
    }
}

export default NavbarComponent;