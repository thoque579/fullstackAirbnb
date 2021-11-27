import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from '@src/layoutAuthen';
import { handleErrors, safeCredentials } from "@utils/fetchHelper"
import IndexProperties from '@property/indexProperties';

import './guestIndex.scss'

class GuestIndex extends React.Component {
  state = {
    authenticated: "",
    bookings: [],
    currentUser: ''
  }


  componentDidMount() {
    fetch('/api/authenticated')
    .then(handleErrors)
    .then(res => {
      this.setState({
        authenticated: res.authenticated,
        currentUser: res.username
      })
    })

    fetch('/api/properties_index/guest_bookings')
    .then(handleErrors)
    .then(res => {
      this.setState({
        bookings: res.bookings
      })
    })

  }

  initiateStripeCheckout = (booking_id) => {
    return fetch(`/api/charges?booking_id=${booking_id}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: "POST",
    }))
    .then(handleErrors)
    .then(response => {
      const stripe = Stripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);

      stripe.redirectToCheckout({
        sessionId: response.charge.checkout_session_id,
      }).then((result) => {});
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


    render() {

      const { authenticated, bookings, currentUser } = this.state

      console.log(bookings);
      console.log(bookings);
      bookings.map(item => {
        console.log(item)
      })
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
              <button className="page-tab col-6 btn btn-danger" onClick={() => {
                  window.location = '/bookingsList'
                }}>
                <h4 className="text-center mb-1">Your Properties</h4>
              </button>
              <button className="page-tab col-6 btn-outline-dark active ">
                <h4 className="text-center mb-1">Your Trips</h4>
              </button>
            </div>
            <div className = "row content">
              <div className = "bg-dark main-content px-4 py-3 d-flex fade-in">
                <div className = "container property-content">
                  <div className="container">
                    <div className="row p-4">
                      <table className="table table-dark table-hover table-contain">
                        <thead className = "thead-dark table table-head">
                            <tr>
                              <th>Property Title</th>
                              <th>City</th>
                              <th>Country</th>
                              <th>Guest</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                        {bookings.map(item => {
                        return(
                          <tr scope = "col" key = {item.id}><td>{item.property}</td>
                          <td>{item.city}</td>
                          <td>{item.country}</td>
                          <td>{item.guest}</td>
                          <td>{item.start_date}</td>
                          <td>{item.end_date}</td>

                        {item.paid? <td><button type="button" className = "btn btn-danger" disabled>paid</button></td>: <td><button type="button" className = "btn btn-danger" onClick = {() => this.initiateStripeCheckout(item.id)}>pay</button></td>}

                        </tr>
                      )
                        })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                </div>
                <div className = "container">
                  <div className = "row bg-dark button-contain">
                    <div className = "row">
                      <button type="button" className = "btn btn-light mr-2" onClick = {() => { window.location.href = "/host" }}>Add new Property</button>
                      <button type="button" className = "btn btn-danger ml-2" onClick = {() => {window.location.href = "/hostMain"}}>return to property</button>
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
  <GuestIndex />,
  document.body.appendChild(document.createElement('div')),
)
