import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from '@src/layoutAuthen';
import {safeCredentials, safeCredentialsFormData, handleErrors} from "@utils/fetchHelper";
import {CountryDropdown, RegionDropdown, CountryRegionData} from 'react-country-region-selector';
import './edit.scss'

class EditProperty extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      authenticated: '',
      title: '',
      property_type: '',
      price_per_night: '',
      max_guests: '',
      image: '',
      description: '',
      country: '',
      city: '',
      beds: '',
      bedrooms: '',
      baths: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.changePropertyType = this.changePropertyType.bind(this);
  }

  componentDidMount() {
    fetch('/api/authenticated').then(handleErrors).then(data => {
      this.setState({authenticated: data.authenticated})
    })

    fetch(`/api/properties/${this.props.property_id}`).then(handleErrors).then(data => {
      console.log(data.property);
      this.setState({
        title: data.property.title,
        property_type: data.property.property_type,
        price_per_night: data.property.price_per_night,
        max_guests: data.property.max_guests,
        image: data.property.image_url,
        description: data.property.description,
        country: data.property.country,
        city: data.property.city,
        beds: data.property.beds,
        bedrooms: data.property.bedrooms,
        baths: data.property.baths
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  selectCountry(val) {
    this.setState({country: val});
  }

  selectRegion(val) {
    this.setState({city: val});
  }

  onImageChange = (e) => {
    this.setState({image_url: e.target.files[0]})
  }

  changePropertyType = (e) => {
    this.setState({
      property_type: e.target.value,
    })
  }

  render() {
    const { authenticated, title, property_type, price_per_night, max_guests, description, image, country, city, bedrooms, beds, baths } = this.state;

    if (!authenticated) {
      return (<Layout>
        <div>
          <h1>please log in to view this section
            <a href="/login">Login</a>
          </h1>
        </div>
      </Layout>)
    }

    return (<LayoutAuthen>
      <div className="container test">
        <div className="row">
          <div className="border p-4 m-5" id="form-container">
            <p>please make your changes</p>
            <form id="property-form">
              <label htmlFor="title">Property Name:
              </label>
              <input type="text" name="title" placeholder="Enter your property title" id="title" value = {title} onChange = {this.handleChange} required="required"/>
              <label>Choose a property type:
              </label>
              <select value = {property_type} onChange = {this.changePropertyType}>
                <optgroup label="Apartments">
                  <option>Entire Apartments</option>
                  <option>Private Room in Apartment</option>
                  <option>Private studio Apartment</option>
                </optgroup>
                <optgroup label="Condominium">
                  <option>Entire Condo</option>
                  <option>Private Room in condo</option>
                </optgroup>
                <optgroup label="Houses">
                  <option>Entire House</option>
                  <option>Private room in House</option>
                </optgroup>
              </select>
              <label>Description:
              </label>
              <textarea name="description" placeholder="enter your description here" value = {description} onChange = {this.handleChange}></textarea>
              <label>Price:
              </label>
              <input type="number" name="price_per_night" value = {price_per_night} onChange = {this.handleChange} min="0"/>
              <label>Number of guests:
              </label>
              <input type="number" name="max_guests" value = {max_guests} onChange = {this.handleChange} min="0" max="16"/>
              <fieldset>
                <legend>Location:</legend>
                <div>
                  <CountryDropdown value={country} onChange={(val) => this.selectCountry(val)} priorityOptions={["US", "CA", "GB"]}/>
                  <RegionDropdown country={country} value={city} onChange={(val) => this.selectRegion(val)}/>
                </div>
              </fieldset>
              <hr/>
              <label>Bedrooms:
              </label>
              <input type="number" name="bedrooms" id="numberOfBedRooms" value = {bedrooms} onChange = {this.handleChange} required="required" min="0" max="10"/>
              <hr/>
              <label>Beds:</label>
              <input type="number" name="beds" id="numberOfBeds" value = {beds} onChange = {this.handleChange} required="required" min="0" max="10"/>
              <label>Baths:
              </label>
              <input type="number" name="baths" id="numberOfBaths" required="required" min="min" max="10" onChange = {this.handleChange} value = {baths}/>
              <label>Add Property Photo</label>
              <input type="file" className="image" id="photo-add" accept="image/*" onChange = {this.onImageChange}/>
              <img src={image} alt="" height = "50px" width = "50px" />
              <button type="submit" className="btn btn-danger mt-3">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </LayoutAuthen>)

  }

}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));
  ReactDOM.render(<EditProperty property_id={data.property_id}/>, document.body.appendChild(document.createElement('div')),)

})
