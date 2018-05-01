import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Modal, Button } from 'react-bootstrap';
import UserAuthLightbox from '../UserAuthLightbox/UserAuthLightbox';
import 'bootstrap-css';

class NavbarComponent extends Component {
    state = {
        user: "",
        isSignIn: false
    }

    componentDidMount(){
        if (localStorage.getItem("danceUser")){
            this.setState({user: localStorage.getItem("danceUser")})
            this.setState({isSignedIn: true});
        }
    }

    navigateToAnchor = (y) => {
        return (e) => {
            e.preventDefault();
            window.scrollTo(0, y);
        }
    }

    signOut = () => {
        localStorage.removeItem("danceUser")
        this.setState({user: ""});
        this.setState({isSignedIn: false});
    }

    render() {
        console.log("nav render");
        const userToggleButton = this.state.isSignedIn ? (
            <Button onClick={this.signOut}>Sign Out</Button>
        ) : (
            <Button onClick={this.props.toggleSigning}>Sign In</Button>
        )

        return (
            <div>
                <Navbar fixedTop="true">
                    <Nav>
                        <NavItem eventKey={1} onClick={this.navigateToAnchor(this.props.homeY)}>
                            Home
                        </NavItem>
                        <NavItem eventKey={2} onClick={this.navigateToAnchor(this.props.aboutY)}>
                            About
                        </NavItem>
                        <NavItem eventKey={3} onClick={this.navigateToAnchor(this.props.contactY)}>
                            Contact
                        </NavItem>

                        <NavItem eventKey={4}>
                            {this.state.user && <p>Welcome, {this.state.user}</p>} {userToggleButton}
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default NavbarComponent;