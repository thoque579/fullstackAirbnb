import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from '@src/layoutAuthen';
import { handleErrors, safeCredentials } from "@utils/fetchHelper"
import IndexProperties from '@property/indexProperties';

import './hostMain.scss'

class GuestIndex extends React.Component {
  state = {
    authenticated: "",
    bookings: [],
  }


  componentDidMount() {
    fetch('/api/authenticated')
    .then(handleErrors)
    .then(res => {
      this.setState({
        authenticated: res.authenticated,
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

      const { authenticated, bookings } = this.state

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
      <LayoutAuthen logout = {this.logout}>
      <div className="container">
        <div className="row p-4">
          <table className="table table-striped table-hover">
            <thead className = "thead-dark">
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

            {item.paid? <td>true</td>: <td>false</td>}

            </tr>
          )
            })}
            </tbody>
          </table>
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
