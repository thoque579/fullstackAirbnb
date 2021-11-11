import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from '@src/layoutAuthen';
import { safeCredentials, handleErrors } from '@src/utils/fetchHelper'
import SignupWidget from '@src/login/signupWidget';
import LoginWidget from '@src/login/loginWidget';

import "./login.scss"

class Login extends React.Component {
  state = {
    authenticated: false,
    show_login: true,
  }
  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })
  }
  toggle = () => {
    this.setState({
      show_login: !this.state.show_login,
    })
  }


  render () {
    const { authenticated, show_login } = this.state;
    if (authenticated) {
      return (
        <LayoutAuthen>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <div className="border p-4">
                  <p className="mb-0">You are already logged in 🤑</p>
                    <button type="button" className = "btn btn-primary" className = "d-flex justify-content-end btn btn-outline-danger btn-sm mt-2">Home page</button>
                </div>
              </div>
            </div>
          </div>
        </LayoutAuthen>
      );
    };
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4">
                {show_login ? <LoginWidget toggle={this.toggle} /> : <SignupWidget toggle={this.toggle} />}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Login />,
    document.body.appendChild(document.createElement('div')),
  )
})
