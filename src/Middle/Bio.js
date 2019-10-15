import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';

config.autoAddCss = false;

function Bio() {
  const Bio = styled.div`
    padding: 15px;
    background: #fff;
    border: 1px solid #e6e6e6;
    font-weight: 400;

    img {
	  max-width: 100px;
      margin-top: -4em;
      border-radius: 50%;
      position: relative;
      margin-bottom: 30px;
    }
  `;

  const BioBox = styled.div`
    margin-bottom: 4em;
    font-size: 15px;
    width: 100%;
    background: #fff;

    .heading {
	  font-size: 18px;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e6e6e6;
    }
  `;

  return (
    <BioBox>
      <Bio className="text-center">
        <img src="/ava.jpg" className="img-fluid" alt="" />
        <div className="bio-body">
          <h2>NGUYEN QUOC HUNG</h2>
          <p>Husband, Web developer, Gamer, Figure Collector and Noodle Lover</p>
          <p className="social">
            <a className="p-2" href="https://twitter.com/hung_xlkd" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
            <a className="p-2" href="https://www.facebook.com/marc0.zeus" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a className="p-2" href="https://www.instagram.com/hungxlkd" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
          </p>
        </div>
      </Bio>
    </BioBox>
  );
}

export default Bio;
