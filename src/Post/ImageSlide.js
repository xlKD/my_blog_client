import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Slider from "react-slick";

const SlideWrapper = styled.div`
  margin-bottom: 70px;
`;

const Image = styled.img`
  width: 80%;
  margin-left: 10%;
`;

const Caption = styled.p`
  padding-top: 7px;
  padding-bottom: 7px;
  background: #d3d3d385;
  font-size: 15px;
  text-align: center;
  width: 80%;
  margin-left: 10%;
`;

class ImageSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: null,
    };
  }

  async componentDidMount() {
    const postId = this.props.postId;
    const slide = (await axios.get('https://admin.hung-nq.tk/api/slides/by_post/' + postId)).data;
    this.setState({
      slide,
    });
  }

  render() {
    const {slide} = this.state;
    if (slide === null) return <div>...</div>;

	const settings = {
      customPaging: function(i) {
        return (
		  <a>
			<img src={slide.imgUrls[i]} width="50" />
          </a>
		);
      },
      adaptiveHeight: true,
      dots: true,
	  dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      lazyLoad: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <SlideWrapper>
	    <Slider {...settings}>
          {slide.imgUrls.map((imgUrl, index) => (
            <div key={index}>
              <Image src={imgUrl}></Image>
              <Caption>{slide.imgCaptions[index]}</Caption>
		    </div>
          ))}
	    </Slider> 
      </SlideWrapper>
    )
  }
}

export default ImageSlide;
