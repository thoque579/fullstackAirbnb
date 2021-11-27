import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from "@src/layoutAuthen";
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class Success extends React.Component {

  state = {
    authenticated: false,
    loading: true,
    existingBookings: '',
    id: '',
    price: '',
    start_date: '',
    end_date: '',
    property_type: '',
    country: '',
    city: '',
    bookedUser: '',
    hostUser: '',
    paidStatus: '',

  }

  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}/bookingsSuccess`)
    .then(handleErrors)
    .then(res => {
      console.log(res);
      console.log(res.booking.paid);
      this.setState({
        id: res.booking.id,
        title: res.booking.title,
        city: res.booking.city,
        country: res.booking.country,
        property_type: res.booking.property_type,
        start_date: res.booking.start,
        end_date: res.booking.end,
        price: res.booking.price,
        hostUser: res.booking.hostUser,
        bookedUser: res.booking.bookedUser,
        paidStatus: res.booking.paid
      })
    })
  }


  render() {
    const { id, price, start_date, end_date, property_type, bookedUser, hostUser, title, city, country, type, paidStatus } = this.state
    
    return(
      <LayoutAuthen>
        <div className = "container">
          <div className = "row">
            <div className = "bg-danger justify-content-center">
              <h1>Property #{id} is hosted</h1>
              <h1>total paid: {price}</h1>
              <h1>start_date: {start_date}</h1>
              <h1>end_date: {end_date}</h1>
              <h1>property_type {property_type}</h1>
              <h1>user that booked {bookedUser}</h1>
              <h1>user that hosted {hostUser}</h1>
              <h1>type of property {title}</h1>
              <h1>country {country}</h1>
              <h1>city {city}</h1>
              <h1>type {property_type}</h1>
                {paidStatus?  <h1>payment status: paid</h1> : console.log('false')}
            </div>
          </div>
        </div>
      </LayoutAuthen>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));
  ReactDOM.render(
    <Success property_id={data.property_id}/>,
    document.body.appendChild(document.createElement('div')),
  )

})
