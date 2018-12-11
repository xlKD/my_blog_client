import React from 'react';
import styled from 'styled-components';

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
    float: left;
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
        <img src="http://localhost:3000/images/person_1.jpg" className="img-fluid" alt="" />
        <div className="bio-body">
          <h2>NGUYEN QUOC HUNG</h2>
          <p>Husband, Web developer, PC gamer, Figure Collector and Noodle Lover</p>
          <p className="social">
            <a href="https://twitter.com/hung_xlkd" className="p-2"><span className="fa fa-facebook"></span></a>
            <a href="https://www.instagram.com/hungxlkd" className="p-2"><span className="fa fa-twitter"></span></a>
            <a href="https://twitter.com/hung_xlkd" className="p-2"><span className="fa fa-instagram"></span></a>
          </p>
        </div>
      </Bio>
    </BioBox>
  );
}

export default Bio;
