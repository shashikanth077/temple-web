import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable jsx-a11y/anchor-is-valid */
function Footer() {
    return (
        <section className="temple-footer-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-about-widget">
                            <div className="logo">
                                <a aria-label="Footer-logo" href="##">
                                    <img src="assets/images/logo/logo.jpg" alt="" />
                                </a>
                            </div>
                            <p>
                                Something about temple
                            </p>
                            <a href="##">
                                Read More <i className="fal fa-arrow-right" />
                            </a>
                            <div className="social mt-30">
                                <ul>
                                    <li>
                                        <a aria-label="fa-facebook" href="#">
                                            <i className="fab fa-facebook-f" />
                                        </a>
                                    </li>
                                    <li>
                                        <a aria-label="fa-facebook" href="#">
                                            <i className="fab fa-twitter" />
                                        </a>
                                    </li>
                                    <li>
                                        <a aria-label="fa-facebook" href="#">
                                            <i className="fab fa-pinterest-p" />
                                        </a>
                                    </li>
                                    <li>
                                        <a aria-label="fa-facebook" href="#">
                                            <i className="fab fa-linkedin-in" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                        <div className="footer-navigation">
                            <h4 className="title">Temple</h4>
                            <ul>
                                <li>
                                    <Link to="/about-us">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/Service">Services</Link>
                                </li>
                                <li>
                                    <a href="#">Bookings</a>
                                </li>
                                <li>
                                    <Link to="/news">Events</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-navigation">
                            <h4 className="title">Other Useful links</h4>
                            <ul>
                                <li>
                                    <Link to="/about-us">Community</Link>
                                </li>
                                <li>
                                    <a href="#">Resources</a>
                                </li>
                                <li>
                                    <a href="#">Faqs</a>
                                </li>
                                <li>
                                    <a href="#">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#">Voluteers</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget-info">
                            <h4 className="title">Get In Touch</h4>
                            <ul>
                                <li>
                                    <a href="#">
                                        <i className="fal fa-envelope" /> support@temple.com
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fal fa-phone" /> +(642) 342 762 44
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fal fa-map-marker-alt" /> 442 Belle Terre
                                        St Floor 7, San Francisco, AV 4206
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="footer-copyright d-flex align-items-center justify-content-between pt-10">

                            <div className="copyright-text">
                                <p>Copyright © 2023 Temple. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;
