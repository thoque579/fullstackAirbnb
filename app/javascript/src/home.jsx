// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';

const Home = () => (
  <div>
    <h1>test</h1>
  </div>

)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
