// layout.js
import React from 'react';
import { FaAirbnb } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import './layoutAuthen.scss'
import { GrFacebookOption } from 'react-icons/gr'
import { AiOutlineTwitter } from 'react-icons/ai'
import { AiFillInstagram } from 'react-icons/ai'

const LayoutAuthen = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a href="/"><span className="navbar-brand mb-0 h1 text-danger"><FaAirbnb/> airbnb</span></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
             </button>
        <div className="collapse navbar-collapse" id = "navbarNav">
          <ul className="navbar-nav ml-auto" style = {{cursor: "Pointer"}}>
            <li className="nav-item active ">
              <button className="btn btn-light rounded-pill btn-sm">
                <a className="nav-link" href="/">Home</a>
              </button>
            </li>
            <li className = "nav-item">
              <button className="btn btn-light rounded-pill btn-sm">
                <a href = "/hostMain" className = "nav-link"><span className = "font-weight-normal">Want to host</span></a>
              </button>
            </li>
            <button type="button" className = "btn btn-light btn-sm rounded-pill">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <FaUserCircle />
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a href="" className = "dropdown-item">{props.username}</a>
                  <a className = "dropdown-item" href="/host">Host your Property</a>
                  <a className = "dropdown-item" href="/guestIndex">Your bookings</a>
                  <a className = "dropdown-item" href="/bookingsList">Your listings</a>
                  <div className ="dropdown-divider"></div>
                  <a href="" className = "dropdown-item">Help</a>
                  <a className="dropdown-item" onClick = {props.logout} style = {{cursor: "pointer"}}>Log out</a>
                </div>
              </li>
            </button>
          </ul>
        </div>
      </nav>
      {props.children}
      <footer className="p-3 bg-light footer-contain">
        <div className = "container-fluid">
          <div className = "row pt-5 d-md-flex footer-nav">
            <div className = " col-md-3 col-12">
            <ul className = "list-unstyled mb-1">
                <hr className = "d-lg-none"/>
                <h6 className = "mb-3">Support</h6>
                <li><a href="" className = "text-dark link-item">Help Center</a></li>
                <li><a href="" className = "text-dark link-item">Safety Information</a></li>
                <li><a href="" className = "text-dark link-item">Cancellation options</a></li>
                <li><a href="" className = "text-dark link-item">Our COVID-19 Response</a></li>
                <li><a href="" className = "text-dark link-item">Supporting people with disablities</a></li>
                <li><a href="" className = "text-dark link-item">Report a neighborhood concern</a></li>
              </ul>
              </div>
              <div className = " col-md-3 col-12">
                <hr className = "d-lg-none"/>
                <ul className = "list-unstyled mb-1">
                  <h6 className = "mb-3">Community</h6>
                  <li><a href="" className = "text-dark">Airbnb.org: disaster relief housing</a></li>
                  <li><a href="" className = "text-dark">Support Afghan refugees</a></li>
                  <li><a href="" className =  "text-dark">Celebrating diversity & belonging</a></li>
                  <li><a href="" className = "text-dark">Combating discrimination</a></li>
                </ul>
              </div>
              <div className = " col-md-3 col-12">
                <hr className = "d-lg-none"/>
                <ul className = "list-unstyled mb-1">
                  <h6 className = "mb-3">Hosting</h6>
                  <li><a href="" className = "text-dark">AirCover: protection for Hosts</a></li>
                  <li><a href="" className = "text-dark">Explore hosting resouces</a></li>
                  <li><a href="" className = "text-dark">Visit our community forum</a></li>
                  <li><a href="" className = "text-dark">How to host responisbly</a></li>
                </ul>
              </div>
              <div className = "col-12 col-md-3">
                <hr className = "d-lg-none"/>
                <ul className = "list-unstyled mb-1">
                  <h6 className = "mb-3 mt-3">About</h6>
                  <li><a href="" className = "text-dark">Learn about new features</a></li>
                  <li><a href="" className = "text-dark">Letters from out founders</a></li>
                  <li><a href="" className = "text-dark">Careers</a></li>
                  <li><a href="" className = "text-dark">Investors</a></li>
                  <li><a href="" className = "text-dark">Airbnb Luxe</a></li>
                </ul>
              </div>

          </div>
        </div>
        <hr />
        <div className = "container-fluid">
          <div className = "row d-flex">
            <div className = "col-6">
              <p className="mr-3 mb-0 text-dark">© 2021 Airbnb, Inc   <span> <a href="#" className = "text-dark ml-3 mr-2">Privacy</a></span><span className = "mr-2">·</span><span><a href="" className = "text-dark mr-2">Terms</a></span><span className = "mr-2">·</span><span><a href = "#" className = "text-dark mr-2">Sitemap</a></span></p>
            </div>
            <div className = "col-6 social-part">
              <span className = "mr-3 mb-0"><GrFacebookOption /></span>
              <span className = "mr-3 mb-0"><AiOutlineTwitter /></span>
              <span className = "mr-3 mb-0"><AiFillInstagram /></span>

            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default LayoutAuthen;
