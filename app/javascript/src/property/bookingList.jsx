import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from '@src/layoutAuthen';
import {safeCredentials, safeCredentialsFormData, handleErrors} from "@utils/fetchHelper";
import './bookingList'

class BookingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: '',
      bookings: [],
      headers: [],
    }
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })

      fetch("/api/properties_index/host_bookings")
      .then(handleErrors)
      .then(res => {
        this.setState({
          bookings: res.bookings,
          headers: Object.keys(res.bookings[0])
        })
      })
  }

  render() {

    const { authenticated, headers, bookings } = this.state;

    console.log(bookings);
    // console.log(Object.keys(headers));
    console.log(bookings);

    if (!authenticated) {
      return (<Layout>
        <div>
          <p>Please log in to access your bookings
            <a href="/login">Login</a>
          </p>
        </div>
      </Layout>)
    }

    return (<LayoutAuthen>
      <div className="container">
        <div className="row p-4">
          <table className="table table-striped table-hover">
            <thead className = "thead-dark">
                <tr>
                  <th>Property Title</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Guests</th>
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
    </LayoutAuthen>)

  }
}


ReactDOM.render(
  <BookingList />,
  document.body.appendChild(document.createElement('div')),
)
