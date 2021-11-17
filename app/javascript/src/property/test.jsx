import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from '@src/layoutAuthen';
import { handleErrors, safeCredentials } from "@utils/fetchHelper"

import './test.scss';

class Test extends React.Component {

  state = {
    authenticated: "",
  }


  componentDidMount() {
    fetch('/api/authenticated')
    .then(handleErrors)
    .then(res => {
      this.setState({
        authenticated: res.authenticated,
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

    render() {



      return(
        <Layout>
          <div>
          
          </div>
        </Layout>

      )

    }





  }


ReactDOM.render(
  <Test />,
  document.body.appendChild(document.createElement('div')),
)
