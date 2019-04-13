import React, {Component} from 'react';
import styled, {ThemeProvider} from 'styled-components';

class PostListPlaceholder extends Component {
  render() {
    const background = 'lightgray';

    const TitlePlaceholder = styled.div`
      background: ${background};
      width: 50%;
      height: 15px;
    `;

    const CategoryPlaceholder = styled.div`
      width: 10%;
      height: 15px;
      margin-top: 10px;
      background: ${background};
      display: inline-block;
    `;

    const DatePlaceholder = styled.div`
      width: 10%;
      height: 15px;
      margin-top: 10px;
      margin-left: 10px;
      background: ${background};
      display: inline-block;
    `;

    return (
      <div>
        <TitlePlaceholder/>
        <div>
          <CategoryPlaceholder/>
          <DatePlaceholder/>
        </div>
      </div>
    )
  };
}

export default PostListPlaceholder;