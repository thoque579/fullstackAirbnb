import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from '@src/layoutAuthen';
import { handleErrors, safeCredentials } from "@utils/fetchHelper"
import IndexProperties from '@property/indexProperties';

import './hostMain.scss'

class HostMain extends React.Component {
  state = {
    authenticated: "",
    currentUser: "",
  }


  componentDidMount() {
    fetch('/api/authenticated')
    .then(handleErrors)
    .then(res => {
      this.setState({
        authenticated: res.authenticated,
        currentUser: res.username,
      })
    })
  }

    logout = (e) => {
      if (e) {
        e.preventDefault();
      }
      fetch('/api/sessions/destroy', safeCredentials({
        method: "DELETE"
      }))
      .then(handleErrors)
      .then(res => {
        if (res.success) {
          window.location.href = "/"
        } else {
          console.log('fail');
        }
      })
    }

    onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }

    clickButton = (e) => {
      this.setState({
        renderView: e.target.value
      })
    }

    render() {

      const { authenticated, currentUser } = this.state

      if (!authenticated) {
        return(
          <Layout>
            <div className = "container">
              <div className = "row">
                <p className = "ml-3 mt-3">Please Login to access this page <a href="/login">Login</a></p>
              </div>
            </div>
          </Layout>
        )
      }
      return(
      <LayoutAuthen logout = {this.logout} username = {currentUser}>
        <div className = "fade-in d-flex justify-content-center">
          <div className = "container m-4">
            <div className="row justify-content-around">
              <button className="page-tab col-6 btn btn-outline-dark active" onClick={() => {
                  window.location = '/hostMain'
                }}>
                <h4 className="text-center mb-1">Your Properties</h4>
              </button>
              <button className="page-tab col-6 btn-outline-dark " onClick={() => {
                  window.location = '/guestIndex'
                }}>
                <h4 className="text-center mb-1">Your Trips</h4>
              </button>
            </div>
            <div className = "row content">
              <div className = "bg-dark main-content px-4 py-3 d-flex fade-in">
                <div className = "container property-content">
                  <IndexProperties/>
                </div>
                </div>
                <div className = "container">
                  <div className = "row bg-dark button-contain">
                    <div className = "row">
                      <button type="button" className = "btn btn-light mr-2" onClick = {() => { window.location.href = "/host" }}>Add new Property</button>
                      <button type="button" className = "btn btn-danger ml-2" onClick = {() => {window.location.href = "/bookingsList"}}>Your Bookings</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </LayoutAuthen>
      )

    }
  }


ReactDOM.render(
  <HostMain />,
  document.body.appendChild(document.createElement('div')),
)
