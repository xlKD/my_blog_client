import React from 'react';
import styled from 'styled-components';

function Footer() {
  const Footer = styled.div`
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    padding: 1em 0;
    background: #000;
    font-size: 1rem;
    margin-top: 4em;
  `;

  return (
    <Footer>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            ©{new Date().getFullYear()} HungNQ All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default Footer;
