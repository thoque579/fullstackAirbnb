import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from '@src/layoutAuthen';
import {safeCredentials, safeCredentialsFormData, handleErrors} from "@utils/fetchHelper";
import './bookingList.scss'

class BookingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: '',
      bookings: [],
      headers: [],
      currentUser: ''
    }
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
          currentUser: data.username
        })
      })

      fetch("/api/properties_index/host_bookings")
      .then(handleErrors)
      .then(res => {
        this.setState({
          bookings: res.bookings,
        })
      })
  }

  logout = (e) => {
    if (e) {
      e.preventDefault();
    }
    fetch('/api/sessions/destroy', safeCredentials({method: "DELETE"})).then(handleErrors).then(res => {
      if (res.success) {
        window.location.href = "/"
      } else {
        console.log('fail');
      }
    })
  }
  render() {

    const { authenticated, headers, bookings, currentUser } = this.state;

    console.log(bookings);
    // console.log(Object.keys(headers));
    console.log(bookings);
    console.log(bookings.length);

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let startDate = new Date();


    if (!authenticated) {
      return (<Layout>
        <div>
          <p>Please log in to access your bookings
            <a href="/login">Login</a>
          </p>
        </div>
      </Layout>)
    }



    return (

      <LayoutAuthen logout = {this.logout} username = {currentUser}>
        <div className = "fade-in d-flex justify-content-center">
          <div className = "container m-4">
            <div className="row justify-content-around">
              <button className="page-tab col-6 btn btn-outline-dark active" onClick = {() => {
                  window.location = '/guestIndex'
                }}>
                <h4 className="text-center mb-1">Your Properties</h4>
              </button>
              <button className="page-tab col-6 btn-danger" onClick = {() => {
                  window.location = '/guestIndex'
                }}>
                <h4 className="text-center mb-1">Your Trips</h4>
              </button>
            </div>
            <div className = "row content">
              <div className = "bg-dark main-content px-4 py-3 d-flex fade-in">
                <div className = "container property-content">
                  <div className="container">
                      {bookings.length === 0? <div className="alert alert-info" role="alert">
                          You have no guests listings for your properties
                        </div> :
                    <div className="row p-4">
                      <table className="table table-dark table-striped table-hover">
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
                            <td>{item.start_date.toLocaleString()}</td>
                            <td>{item.end_date}</td>
                          {item.paid? <td>true</td>: <td>false</td>}
                          </tr>
                        )
                      })}
                        </tbody>
                      </table>
                    </div> }
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
    </LayoutAuthen>)

  }
}


ReactDOM.render(
  <BookingList />,
  document.body.appendChild(document.createElement('div')),
)
