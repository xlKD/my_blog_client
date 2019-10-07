import React, { Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import Nav from './Nav';

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
  const TopBar = styled.div`
    background: #000;
    padding: 10px 0;

    .social {
      text-align:left;

      a {
        color: #fff;
        opacity: .5;
        padding: 6px;
      }
    }
  `;

  return (
    <Header role="banner">
      <TopBar>
        <div className="container">
          <div className="row">
            <div className="col-9 social">
              <a href="https://twitter.com/hung_xlkd" target="_brank"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="https://www.facebook.com/marc0.zeus" target="_brank"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="https://www.instagram.com/hungxlkd" target="_brank"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
            <SearchForm />
          </div>
        </div>
      </TopBar>

      <Nav />
    </Header>
  );
}

export default Header;
