import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from "@src/layoutAuthen";
import { handleErrors, safeCredentials } from '@utils/fetchHelper';
import BookingWidget from '@src/property/bookingWidget';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaBed } from 'react-icons/fa';
import { BsFillDoorClosedFill } from 'react-icons/bs'
import { FaBath } from 'react-icons/fa'
import './property.scss';

class Property extends React.Component {
  state = {
    property: {},
    loading: true,
    authenticated: false,
    user: '',
    title: '',
    description: '',
    city: '',
    country: '',
    property_type: '',
    price_per_night: '',
    max_guests: '',
    bedrooms: '',
    beds: '',
    baths: '',
    images: '',
  }

  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`)
    .then(handleErrors)
    .then(res => {
      console.log(res);
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

  updateValues = (e) => {

    const { title, description, city, country, property_type, price_per_night, max_guests, bedrooms, beds, baths, image_url } = this.state

    if (e) {
      e.preventDefault();
    }

    this.setState({
      error: null,
    })

    let formData = new FormData();

    formData.set('property[title]', title);
    formData.set('property[description]', description);
    formData.set('property[city]', city);
    formData.set('property[country]', country);
    formData.set('property[property_type]', property_type);
    formData.set('property[price_per_night]', price_per_night);
    formData.set('property[max_guests]', max_guests);
    formData.set('property[bedrooms]',bedrooms);
    formData.set('property[beds]', beds);
    formData.set('property[baths]', baths);

    fetch('/api/property/update', safeCredentialsFormData ({
      method: "PUT",
      body: formData
    }))
    .then(handleErrors)
    .then(res => {
      window.location = `${res.property.id}`
    })
    .catch(error => {
      console.log(error);
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
      user
    } = property



    if (authenticated) {
      return (
        <LayoutAuthen logout = {this.logout}>

          <div className="property-image mb-3" style={{ backgroundImage: `url(${image_url})` }} />
            <div className="container">
              <div className="row">
                <div className="info col-12 col-lg-8">
                  <div className="mb-3">
                    <div className = "button-contain d-flex">
                      {/*current_user? <button className = "btn btn-success">Edit</button> : ""}
                      {current_user? <button className = "btn btn-danger">Delete</button> :  ""*/}
                    </div>
                    <h3 className="mb-0">{title}</h3>
                    <p className="text-uppercase mb-0 text-secondary"><small>{city}</small>, <small>{country}</small></p>
                    <p className="mb-0"><small>Hosted by <b>{user.username}</b></small></p>
                  </div>
                  <div>
                    <p className="mb-0 text-capitalize"><b>{property_type}</b></p>
                    <p>
                      <span className="mr-3"><BsFillPeopleFill /> {max_guests} guests</span>
                      <span className="mr-3"><FaBed /> {bedrooms} bedroom</span>
                      <span className="mr-3"><BsFillDoorClosedFill /> {beds} bed</span>
                      <span className="mr-3"><FaBath /> {baths} bath</span>
                    </p>
                  </div>
                  <hr />
                  <p>{description}</p>
                  <hr />
                  <p>{max_guests} - Max guests</p>
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


export default Property
