// layout.js
import React from 'react';
import { FaAirbnb } from 'react-icons/fa';

const LayoutAuthen = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <a href="/"><span className="navbar-brand mb-0 h1 text-danger"><FaAirbnb/> airbnb</span></a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav" style = {{cursor: "Pointer"}}>
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className = "nav-item"><a href = "/host" className = "nav-link">My Bookings</a></li>
            <li className="nav-item">
              <a className="nav-link text-danger" onClick = {props.logout} style = {{cursor: "pointer"}}>Log out</a>
            </li>
          </ul>
        </div>
      </nav>
      {props.children}
      <footer className="p-3 bg-light">
        <div className = "d-flex justify-content-around">
          <section>
            
          </section>
        </div>
        <hr />
        <div className = "d-flex justify-content-around">
          <p className="mr-3 mb-0 text-secondary">© 2021 Airbnb, Inc</p>
          <a href="" className = "text-secondary">Privacy</a>
          <span>·</span>
          <a href="" className = "text-secondary">Terms</a>
          <span>·</span>
          <a href="" className = "text-secondary">Sitemap</a>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default LayoutAuthen;
