import React, {Component} from 'react';
import styled, {ThemeProvider} from 'styled-components';

class Category extends Component {
  render() {
    const theme = {
      'Web Development': '#007bff',
      'Noodles': '#dc3545',
      'Figures': '#1e7e34'
    };

    const Label = styled.span`
      display: inline-block;
      background: ${props => props.theme[this.props.label]};
      padding: 2px 8px;
      line-height: 1.5;
      font-size: 12px;
      border-radius: 4px;
      text-transform: uppercase;
      color: #fff !important;
      margin-right: 10px;
    `;

    return (
      <ThemeProvider theme={theme}>
        <Label>{this.props.label}</Label>
      </ThemeProvider>
    )
  };
}

export default Category;
