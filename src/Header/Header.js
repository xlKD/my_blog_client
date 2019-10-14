import React, { Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import Nav from './Nav';

config.autoAddCss = false;

function Header() {
  const Header = styled.header`
	position: relative;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    font-weight: 400;
    background: #fff !important;

	.navbar {
	  padding-top: 0;
      padding-bottom: 0;
      background: transparent !important;

	  .container {
	    border-bottom: 1px solid #e6e6e6;
	  }

      .nav-link {
        padding: 1.7rem 1rem;
        font-size: 13px;
        outline: none !important;
        text-transform: uppercase;
        letter-spacing: .05em;
      }

	  @media (max-width: 991.98px) {
		header .navbar .nav-link {
		  padding: 1.7rem 1rem;
		}
	  }

	  @media (max-width: 767.98px) {
		header .navbar .nav-link {
		  padding: .5rem 0rem;
		}
	  }
	}
  `;

  return (
    <Header role="banner">
      <div className="top-bar">
        <div className="container">
          <div className="row">
            <div className="col-9 d-none d-sm-block">
              <a className="icon-sns" href="https://twitter.com/hung_xlkd" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
              <a className="icon-sns" href="https://www.facebook.com/marc0.zeus" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a className="icon-sns" href="https://www.instagram.com/hungxlkd" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
            <SearchForm />
          </div>
        </div>
      </div>

      <Nav />
    </Header>
  );
}

export default Header;
