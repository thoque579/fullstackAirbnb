// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from '@src/layoutAuthen';
import { handleErrors, safeCredentials } from '@src/utils/fetchHelper';
import './home.scss';

class Home extends React.Component {

  state = {
    properties: [],
    total_pages: null,
    next_page: null,
    loading: true,
    authenticated: false
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

    fetch('/api/authenticated')
    .then(handleErrors)
    .then(data => {
      this.setState({
        authenticated: data.authenticated
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

  loadMore = () => {
  if (this.state.next_page === null) {
    return;
  }
  this.setState({ loading: true });
  fetch(`/api/properties?page=${this.state.next_page}`)
    .then(handleErrors)
    .then(data => {
      this.setState({
        properties: this.state.properties.concat(data.properties),
        total_pages: data.total_pages,
        next_page: data.next_page,
        loading: false,
      })
    })
}

  render() {
     const { properties, next_page, loading, authenticated } = this.state;


     if (authenticated) {
        return(
          <LayoutAuthen logout = {this.logout}>
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
               {loading && <p className = "text-danger">loading...</p>}
               {(loading || next_page === null) ||
               <div className="text-center">
                 <button
                   className="btn btn-outline-danger mb-4"
                   onClick={this.loadMore}
                 >load more</button>
               </div>
             }
           </div>
         </LayoutAuthen>
       )
     }


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
            {(loading || next_page === null) ||
            <div className="text-center">
              <button
                className="btn btn-outline-danger mb-4"
                onClick={this.loadMore}
              >load more</button>
            </div>
          }
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
