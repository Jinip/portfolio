import React, { Component } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import SignInForm from './SignInForm/SignInForm';
import SignUpForm from './SignUpForm/SignUpForm';
import axios from 'axios';
import 'bootstrap-css';

class UserAuthLightbox extends Component {
    state = {
        displaySignIn: true,
        username: "",
        password: "",
        passwordRepeat: "",
        alert: "",
        submitDisabled: true
    }

    usernameOnChange = (e) => {
        this.setState({username: e.target.value}, this.validate);
    }

    passwordOnChange = (e) => {
        this.setState({password: e.target.value}, this.validate);
    }

    passwordRepeatOnChange = (e) => {
        this.setState({passwordRepeat: e.target.value}, this.validate);
    }
    
    validate = () => {
        this.setState({submitDisabled: true});
        this.setState({alert: ""});

        if (this.state.displaySignIn){
            if (this.state.username !== "" && this.state.password !== ""){
                this.setState({submitDisabled: false})
            } 
        } else {
            if (this.state.username !== "" && this.state.password !== "" && this.state.password == this.state.passwordRepeat){
                this.setState({submitDisabled: false})
            } 
        }
        
    }

    toggleFormContext = () => {
        this.setState({displaySignIn: !this.state.displaySignIn});
    }

    postData = (e) => {
        e.preventDefault()
        console.log(e.target.innerHTML);
        let url = "http://localhost:3001/auth/"

        e.target.innerHTML == "Sign In"
            ? url += "signin/"
            : url += "signup/"

        axios.post(url, {
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            if (res.data.message) {
                return this.setState({alert: res.data.message});
            } else {
                localStorage.setItem("danceUser", res.data.username);
                this.props.toggleSigning();
            }
        })
        .catch(err => {
            return console.log(err);
        })
    }

    render() {
        const signIn = this.state.displaySignIn;
        return (
            <Modal show={true}>
               <Modal.Header>
                    <Modal.Title>{ signIn ? "Sign In" : "Sign Up"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label>
                            Username: 
                            <input type="text" value={this.state.username} onChange={this.usernameOnChange} />
                        </label>
                        <label>
                            Password: 
                            <input type="password" value={this.state.password} onChange={this.passwordOnChange} />
                        </label>
                        { !signIn 
                            ?   <label>
                                    Repeat Password: 
                                    <input type="password" value={this.state.passwordRepeat} onChange={this.passwordRepeatOnChange} />
                                </label> 
                            : <div></div>
                        }
                        { signIn
                            ?   <Button disabled={this.state.submitDisabled} onClick={this.postData}>Sign In</Button>
                            :   <Button disabled={this.state.submitDisabled} onClick={this.postData}>Sign Up</Button>
                        }
                    </form>
                    {this.state.alert ? (<Alert bsStyle="warning">{this.state.alert}</Alert>) : (<div></div>)}
                    { signIn
                        ? <span>Not a member? <a onClick={this.toggleFormContext}>Sign In!</a></span>
                        : <span>Already a member? <a onClick={this.toggleFormContext}>Sign Up!</a></span>
                    }
            <Button onClick={this.props.toggleSigning}>Close</Button>
            </Modal.Body>
        </Modal>
        )
    }
}

export default UserAuthLightbox;