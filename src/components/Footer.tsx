"use client";

import React, { useState } from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter a valid email");
      return;
    }
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer>
  <div className="footer-inner">
    <div className="footer-grid">
      <div>
        <div className="f-brand-name"><div className="logo-mk" style={{width:'32px',height:'32px',fontSize:'.85rem',borderRadius:'8px',}}><img src="img/logo.png" alt=""/></div><span className="logo-gb">Softmax</span>&nbsp;Nexus</div>
        <p className="footer-p">Empowering Trainees, Interns, Consultants, and Employees with one unified platform for learning, working, and growing together.</p>
        <div className="f-soc">
          <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
        </div>
      </div>
      <div className="footer-col"><h5>Company</h5><ul><li><a href="#about">About Us</a></li><li><a href="#team">Our Team</a></li><li><a href="#">Case Studies</a></li><li><a href="#">Newsroom</a></li><li><a href="#">Careers</a></li></ul></div>
      <div className="footer-col"><h5>Platform</h5><ul><li><a href="#services">Services</a></li><li><a href="#how">For Companies</a></li><li><a href="#how">For Consultants</a></li><li><a href="#pricing">Pricing</a></li><li><a href="#">API Docs</a></li></ul></div>
      <div className="footer-col">
        <h5>Stay Updated</h5>
        <p className="nl-sub">Get the latest insights on AI-driven consulting and platform innovations.</p>
        <div className="nl-form"><input type="email" placeholder="your@email.com" id="nlEmail"/><button onClick={()=>{handleSubscribe()}}>Subscribe</button></div>
        <p className="muted" style={{fontSize:'.7rem', marginTop:'.45rem'}}>No spam. Unsubscribe anytime.</p>
        <div className="f-contact">
          {/* <span><i className="fas fa-map-marker-alt"></i>Bhopal, Madhya Pradesh, India</span> */}
          <span><i className="fas fa-envelope"></i>support.softmax@gmail.com</span>
          <span><i className="fas fa-phone-alt"></i>+91 **********</span>
        </div>
      </div>
    </div>
    <div className="footer-btm">
      <p>© 2026 Softmax Nexus. All rights reserved.</p>
      <div className="footer-btm-links"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Cookie Policy</a><a href="#">Accessibility</a></div>
    </div>
  </div>
</footer>
  );
};

export default Footer;