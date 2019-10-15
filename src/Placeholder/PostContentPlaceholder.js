import React, {Component} from 'react';
import styled from 'styled-components';

class PostContentPlaceholder extends Component {
  render() {
    const background = 'lightgray';

    const TitlePlaceholder = styled.div`
      background: ${background};
      width: 70%;
      height: 40px;
      margin-top: 30px;
    `;

    const CategoryPlaceholder = styled.div`
      width: 10%;
      height: 20px;
      margin-top: 15px;
      background: ${background};
      display: inline-block;
    `;

    const DatePlaceholder = styled.div`
      width: 10%;
      height: 20px;
      margin-top: 15px;
      margin-left: 15px;
      background: ${background};
      display: inline-block;
    `;

    const ContentPlaceholder = styled.div`
      background: ${background};
      width: 100%;
      height: 150px;
      margin-top: 20px;
    `;

    return (
	  <div>
		<section className="site-section py-lg">
		  <div className="container">
			<div className="row blog-entries">
			  <div className="col-md-10 offset-md-1 main-content">
                <TitlePlaceholder/>
                <div>
                  <CategoryPlaceholder/>
                  <DatePlaceholder/>
                </div>
                <ContentPlaceholder/>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  };
}

export default PostContentPlaceholder;
