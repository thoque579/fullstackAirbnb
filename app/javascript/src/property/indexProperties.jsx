import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from '@src/layoutAuthen';
import {safeCredentials, handleErrors} from '@utils/fetchHelper';
import './indexProperties.scss'
import {FaBath} from 'react-icons/fa';
import {MdBedroomParent} from 'react-icons/md';
import {FaBed} from 'react-icons/fa';
import {BsPeople} from 'react-icons/bs';

class IndexProperties extends React.Component {

  state = {
    authenticated: false,
    property: []
  }

  componentDidMount() {
    fetch('/api/authenticated').then(handleErrors).then(data => {
      this.setState({authenticated: data.authenticated})
    })

    fetch('/api/properties_index/userProperties').then(handleErrors).then(response => {
      console.log(response);
      this.setState({property: response.properties})
    }).catch(error => {
      console.log(error);
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
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

    const {authenticated, property} = this.state;

    if (authenticated) {
      return (<div>
        {
          property.map(item => {
            return (<div className="container" key={item.id}>
              <div className="row justify-content-center mt-3">
                <div className="col-9">
                  <div className="card mb-3">
                    <img className="card-img-top" src={item.image_url} alt="Card image cap"/>
                    <div className="card-body">
                      <div className="container d-flex justify-content-end">
                        <button type="button" className="btn btn-dark mr-2" onClick = {() => {
                            window.location = '/editProperty/' + item.id
                          }}>edit</button>
                        <button type="button" className="btn btn-danger mr-2">Delete</button>
                      </div>
                      <h5 className="card-title">{item.title}</h5>
                      <h6 className="card-text">${item.price_per_night} per night</h6>
                      <p className="text-muted">
                        <small>{item.location}</small>
                      </p>
                      <p className="text-muted">
                        <small>{item.city}</small>
                        <small>{item.country}</small>
                      </p>
                      <p className="card-text">
                        <small>{item.property_type}</small>
                      </p>
                      <p className="card-text">{item.description}</p>
                      <div className="container d-flex flex-wrap">
                        <div className="row">
                          <div className="col-6">
                            <p className="card-text text-unwrap"><BsPeople/> {item.max_guests}
                              guests maximum</p>
                          </div>
                          <div className="col-6">
                            <p className="card-text"><FaBath/> {item.baths}
                              bathrooms</p>
                          </div>
                          <div className="col-6">
                            <p className="card-text"><MdBedroomParent/> {item.bedrooms}
                              bedrooms</p>
                          </div>
                          <div className="col-6">
                            <p className="card-text"><FaBed/> {item.beds}
                              beds</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>)
          })
        }
      </div>)
    }

    return (<Layout>
      <p>Please log in to view this part of the site
        <a href="/login"></a>
      </p>
    </Layout>)

  }

}

export default IndexProperties
