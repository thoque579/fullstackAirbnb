import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from "@src/layoutAuthen";
import { handleErrors, safeCredentials, safeCredentialsFormData } from '@src/utils/fetchHelper';
import { AiFillPlusCircle } from 'react-icons/ai'
import { AiFillMinusCircle } from 'react-icons/ai'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import "./host.scss"

    class Host extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          authenticated: '',
          handleChange: '',
          title: '',
          property_type: '',
          city: '',
          price_per_night: 50,
          description: '',
          bedrooms: 1,
          beds: 1,
          baths: 1,
          max_guests: 1,
          loading: true,
          country: '',
          region: '',
          currentUser: ''
        }
      }

      componentDidMount() {
        fetch('/api/authenticated')
          .then(handleErrors)
          .then(data => {
            this.setState({
              authenticated: data.authenticated,
              currentUser: data.username,
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

          changePropertyType = (e) => {
            this.setState({
              property_type: e.target.value,
            })
          }

          changeCountry = (e) => {
            this.setState({
              country: e.target.value,
            })
          }

          onImageChange = (e) => {
            this.setState({image_url: e.target.files[0]})
          }


          selectCountry (val) {
              this.setState({ country: val });
            }

          selectRegion (val) {
            this.setState({ city: val });
          }

          propertySubmit = (e) => {
              if (e) {
                e.preventDefault();
              }

              const { title, description, property_type, price_per_night ,country, city, max_guests, bedrooms, beds, baths} = this.state;

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

            fetch('/api/properties/create', safeCredentialsFormData({
              method: "POST",
              body: formData,
            }))
            .then(handleErrors)
            .then(res => {
              window.location = `/property/${res.property.id}`
              console.log(res);
            })
            .catch(error => {
              console.log(error);
            })
          }


        render() {

          const { authenticated, currentUser } = this.state;


          if (!authenticated) {
            return(
              <Layout>
                Please login to host a property <a href="/login">login</a>
              </Layout>
            )
          }



          return(
            <LayoutAuthen logout = {this.logout} username = {currentUser}>
                  <div className = "row blue">
                    <div className = "border p-4 m-5" id = "form-container">
                      <h6>
                        Want to host a property?
                      </h6>
                      <p>please enter your property details</p>
                      <form onSubmit = {this.propertySubmit} id = "property-form">
                        <label htmlFor = "title">Property Name: </label>
                          <input type="text" name="title" value={this.state.title} placeholder = "Enter your property title" onChange = {this.onChange} id = "title" required/>
                        <label>Choose a property type: </label>
                            <select value = {this.state.property_type} onChange = {this.changePropertyType}>
                              <optgroup label = "Apartments">
                                <option>Entire Apartments</option>
                                <option>Private Room in Apartment</option>
                                <option>Private studio Apartment</option>
                              </optgroup>
                              <optgroup label = "Condominium">
                                <option>Entire Condo</option>
                                <option>Private Room in condo</option>
                              </optgroup>
                              <optgroup label = "Houses">
                                <option>Entire House</option>
                                <option>Private room in House</option>
                              </optgroup>
                            </select>
                          <label>Description: </label>
                          <textarea name="description" placeholder = "enter your description here" value = {this.state.description} onChange = {this.onChange}></textarea>
                        <label>Price: </label>
                          <input type="number" name="price_per_night" value={this.state.price_per_night} onChange = {this.onChange} min = "0"/>
                        <label>Number of guests: </label>
                          <input type="number" name="max_guests" value={this.state.max_guests} onChange = {this.onChange} min = "0" max = "16"/>
                        <fieldset>
                          <legend>Location:</legend>
                      <div>
                        <CountryDropdown
                          value={this.state.country}
                          onChange={(val) => this.selectCountry(val)}
                          priorityOptions={["US", "CA", "GB"]} />
                        <RegionDropdown
                          country={this.state.country}
                          value={this.state.city}
                          onChange={(val) => this.selectRegion(val)} />
                      </div>
                      </fieldset>
                      <hr />
                      <label>Bedrooms: </label>
                      <input type="number" name="bedrooms" value={this.state.bedrooms} onChange = {this.onChange} id = "numberOfBedRooms" required min = "0" max = "10"/>
                      <hr />
                        <label>Beds: </label>
                      <input type="number" name="beds" value={this.state.beds} onChange = {this.onChange} id = "numberOfBeds" required min = "0" max = "10"/>
                        <label>Baths: </label>
                      <input type="number" name="baths" value={this.state.baths} onChange = {this.onChange}  id = "numberOfBaths" required min  max = "10"/>
                        <label>Add Property Photo</label>
                          <input type="file" className="image" id="photo-add" accept="image/*" onChange ={this.onImageChange}/>
                          <button type="submit" className = "btn btn-danger mt-3">Submit</button>
                      </form>
                    </div>
                  </div>
              </LayoutAuthen>
          )
        }
    }


      ReactDOM.render(
        <Host />,
        document.body.appendChild(document.createElement('div')),
      )
