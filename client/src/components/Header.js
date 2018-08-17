import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return "STILL DECIDING"
            case false:
                return (<li><a> Login With Google</a></li>)
            default:
            return "LOGGED IN"
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">Emaily</a>
                    <ul className="right"> {this.renderContent()} </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);