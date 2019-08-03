import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Slider from "react-slick";

const API_SERVER = require('../APIServer.js');

const SlideWrapper = styled.div`
  margin-bottom: 70px;
`;

const Image = styled.img`
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  max-width: 90%;
  max-height: 500px;
`;

const NaviImg = styled.img`
  border-radius: 4px;
  width: 50px;
`

const Caption = styled.p`
  padding-top: 7px;
  padding-bottom: 7px;
  font-size: 15px;
  line-height: 1.6;
  font-style: italic;
  color: #007bffa6;
  text-align: center;
  width: 80%;
  margin-left: 10%;
  margin-bottom: 0;
`;

const SlideCounter = styled.p`
  font-size: 15px;
  text-align: center;
  color: darkgray;
`;

class ImageSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: null,
      isShowDots: null,
      currentSlide: 1
    };
  }

  async componentDidMount() {
    const postId = this.props.postId;
    const slide = (await axios.get(API_SERVER + '/api/slides/by_post/' + postId)).data;
    const isShowDots = window.innerWidth < 768 ? false : true;

    this.setState({
      slide,
      isShowDots
    });
  }

  render() {
    const _this = this;
    const {slide, isShowDots, currentSlide} = this.state;

    if (slide === null) return <div>...</div>;

    const slideCount = slide.imgUrls.length;
	const settings = {
      customPaging: function(i) {
        return (
		  <a>
			<NaviImg src={slide.imgUrls[i]}/>
          </a>
		);
      },
      afterChange: function(i) {
        _this.setState({
          currentSlide: i + 1
        })
      },
      dots: isShowDots,
	  dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      lazyLoad: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
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
        {isShowDots === false ?
          <SlideCounter>--- {currentSlide + ' out of ' + slideCount} ---</SlideCounter>
        :
          ''
        }
      </SlideWrapper>
    )
  }
}

export default ImageSlide;
