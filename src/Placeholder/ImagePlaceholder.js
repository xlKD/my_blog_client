import React, {Component} from 'react';
import styled, {ThemeProvider} from 'styled-components';

class ImagePlaceholder extends Component {
  render() {
    const background = 'lightgray';

    const Placeholder = styled.div`
      background: ${background};
      width: 100%;
      height: 150px;
    `;

    return (
      <div>
        <Placeholder/>
      </div>
    )
  };
}

export default ImagePlaceholder;
