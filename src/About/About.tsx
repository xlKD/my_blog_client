import React from 'react';
import styled from 'styled-components';
import Bio from '../Middle/Bio';

const BioWrapper = styled.div`
  padding-top: 5em;
  padding-bottom: 5em;
  width: 80%;
  margin-left: 10%;
`;

export default function About() {
  return (
    <BioWrapper>
      <Bio />
    </BioWrapper>
  );
}
