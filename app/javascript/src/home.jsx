// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout'
import { handleErrors } from '@src/utils/fetchHelper';
import './home.scss';

class Home extends React.Component {

  state = {
    properties: [],
    total_pages: null,
    next_page: null,
    loading: true
  }

  componentDidMount() {
    fetch('/api/properties?page=1')
    .then(handleErrors)
    .then(data => [
      this.setState({
        properties: data.properties,
        total_pages: data.total_pages,
        next_page: data.next_page,
        loading: false
      })
    ])
  }

  render() {
     const { properties, next_page, loading } = this.state;



    return(
      <Layout>
        <div className = "container p-4">
          <h4 className = "mb-1">Top-rated places to stay</h4>
            <p className = "text-secondary mb-3">Explore some of the best-reviewd stays in the world</p>
            <div className = "row">
              {properties.map (item => {
                  return(
                    <div key={item.id} className="col-6 col-lg-4 mb-4 property">
                  <a href={`/property/${item.id}`} className="text-body text-decoration-none">
                    <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${item.image_url})` }} />
                    <p className="text-uppercase mb-0 text-secondary"><small><b>{item.city}</b></small></p>
                    <h6 className="mb-0">{item.title}</h6>
                    <p className="mb-0"><small>${item.price_per_night} USD/night</small></p>
                  </a>
                </div>
                  )
              })}
            </div>
            {loading && <p>loading...</p>}
        </div>
      </Layout>
    )
  }




}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
