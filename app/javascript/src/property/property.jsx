import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from "@src/layoutAuthen";
import { handleErrors, safeCredentials } from '@utils/fetchHelper';
import BookingWidget from '@src/property/bookingWidget';
import './property.scss';

class Property extends React.Component {
  state = {
    property: {},
    loading: true,
    authenticated: false
  }

  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`)
    .then(handleErrors)
    .then(res => {
      this.setState({
        property: res.property,
        loading: false,
      })
    })


    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })
  }

  logout = () => {
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


  render() {
    const { property, loading, authenticated } = this.state

    if (loading) {
      return <p>Loading....</p>
    };

    const {
      id,
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image_url,
      user,
    } = property

    if (authenticated) {
      return (
        <LayoutAuthen logout = {this.logout}>
          <div className="property-image mb-3" style={{ backgroundImage: `url(${image_url})` }} />
            <div className="container">
              <div className="row">
                <div className="info col-12 col-lg-8">
                  <div className="mb-3">
                    <h3 className="mb-0">{title}</h3>
                    <p className="text-uppercase mb-0 text-secondary"><small>{city}</small></p>
                    <p className="mb-0"><small>Hosted by <b>{user.username}</b></small></p>
                  </div>
                  <div>
                    <p className="mb-0 text-capitalize"><b>{property_type}</b></p>
                    <p>
                      <span className="mr-3">{max_guests} guests</span>
                      <span className="mr-3">{bedrooms} bedroom</span>
                      <span className="mr-3">{beds} bed</span>
                      <span className="mr-3">{baths} bath</span>
                    </p>
                  </div>
                  <hr />
                  <p>{description}</p>
                </div>
                <div className = "col-12 col-lg-5">
                <BookingWidget property_id={id} price_per_night={price_per_night} />
                </div>
              </div>
            </div>
        </LayoutAuthen>
      );
    };

    return(
      <Layout>
      <div className="property-image mb-3" style={{ backgroundImage: `url(${image_url})` }} />
        <div className="container">
          <div className="row">
            <div className="info col-12 col-lg-8">
              <div className="mb-3">
                <h3 className="mb-0">{title}</h3>
                <p className="text-uppercase mb-0 text-secondary"><small>{city}</small></p>
                <p className="mb-0"><small>Hosted by <b>{user.username}</b></small></p>
              </div>
              <div>
                <p className="mb-0 text-capitalize"><b>{property_type}</b></p>
                <p>
                  <span className="mr-3">{max_guests} guests</span>
                  <span className="mr-3">{bedrooms} bedroom</span>
                  <span className="mr-3">{beds} bed</span>
                  <span className="mr-3">{baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{description}</p>
            </div>
            <BookingWidget property_id={id} price_per_night={price_per_night} />
          </div>
        </div>
      </Layout>
    )
  }
}



document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));

  ReactDOM.render(
    <Property property_id ={data.property_id} />,
    document.body.appendChild(document.createElement('div')),
  )
})
