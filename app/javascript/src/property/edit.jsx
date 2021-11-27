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
      baths: '',
      currentUser: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.changePropertyType = this.changePropertyType.bind(this);
  }

  componentDidMount() {
    fetch('/api/authenticated').then(handleErrors).then(data => {
      this.setState({authenticated: data.authenticated, currentUser: data.username})
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

  updateProperty = (e) => {
    if (e) {
      e.preventDefault();
    }

    const { title, property_type, price_per_night, max_guests, description, country, city, bedrooms, beds, baths, currentUser } = this.state;

    let formData = new FormData();

    let image = document.getElementById("photo-add").files[0];
    formData.append("property[image]", image, image.name);

    formData.set("property[title]", title);
    formData.set("property[description]", description);
    formData.set("property[property_type]", property_type);
    formData.set("property[price_per_night]", price_per_night);
    formData.set("property[country]", country);
    formData.set("property[city]", city);
    formData.set("property[max_guests]", max_guests);
    formData.set("property[bedrooms]", bedrooms);
    formData.set("property[beds]", beds);
    formData.set("property[baths]", baths);

    fetch('/api/properties_index/edit', safeCredentialsFormData({
      method: 'PUT',
      body: formData,
    }))
    .then(handleErrors)
    .then(res => {
      console.log(this.props.property_id);
      window.location = `/property/${this.props.property_id}`
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    const { authenticated, title, property_type, price_per_night, max_guests, description, image, country, city, bedrooms, beds, baths, currentUser } = this.state;

    if (!authenticated) {
      return (<Layout>
        <div>
          <h1>please log in to view this section
            <a href="/login">Login</a>
          </h1>
        </div>
      </Layout>)
    }

    return (
      <LayoutAuthen username = {currentUser} logout = {this.logout}>
        <div className="row">
          <div className="border p-4 m-5" id="form-container">
            <p>please make your changes</p>
            <form id="property-form" onSubmit = {this.updateProperty}>
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
              <label className = "mt-2"><h3>Change property photo</h3></label>
              <input type="file" className="image" id="photo-add" accept="image/*" onChange = {this.onImageChange}/>
              <div className = "image-section">
                <img src={image} alt="" height = "300px"  className = "mt-3 image" />
              </div>
              <button type="submit" className="btn btn-danger mt-3">Submit</button>
            </form>
          </div>
        </div>

    </LayoutAuthen>
  )

  }

}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));
  ReactDOM.render(<EditProperty property_id={data.property_id}/>, document.body.appendChild(document.createElement('div')),)

})
