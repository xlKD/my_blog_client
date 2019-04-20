import React, { Component } from 'react';
import styled from 'styled-components';
import Bio from '../Middle/Bio';

const BioWrapper = styled.div`
  padding-top: 5em;
  padding-bottom: 5em;
  width: 80%;
  margin-left: 10%;
`;

class About extends Component {
  render() {
    return (
      <BioWrapper>
        <Bio />
      </BioWrapper>
    )
  }
}

export default About;
