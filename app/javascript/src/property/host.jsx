import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LayoutAuthen from "@src/layoutAuthen";
import { handleErrors, safeCredentials } from '@utils/fetchHelper';

class Host extends React.Component {
  state = {
    newProperty = {},
    image: '',
    authenticated: '',
    handleChange: '',
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



      return(
        <Layout>
          <div>test</div>
        </Layout>
      )
    }
}
