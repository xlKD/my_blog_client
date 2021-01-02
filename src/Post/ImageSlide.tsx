import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Slider from 'react-slick';

import { ISlide } from '../interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

import API_SERVER from '../APIServer.js';

const SlideWrapper = styled.div`
  margin-bottom: 60px;
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
`;

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

interface IProps {
  postId: string;
}
interface IResponse {
  data: ISlide;
}

export default function ImageSlide(props: IProps) {
  const [slide, setSlide] = useState<ISlide>();
  const [isShowDots, setIsShowDots] = useState<boolean>();
  const [currentSlide, setCurrentSlide] = useState<number>();

  useEffect(() => {
    const slide = fetchSlide();
    const isShowDots = window.innerWidth < 768 ? false : true;

    setIsShowDots(isShowDots);
  }, []);

  async function fetchSlide() {
    const postId = props.postId;

    const response = (
      await axios.get<IResponse>(API_SERVER + '/api/slides/by_post/' + postId)
    ).data;
    setSlide(response.data);
  }

  if (slide) {
    const slideCount = slide.imgUrls.length;
    const settings = {
      customPaging: function (i: number) {
        return (
          <a>
            <NaviImg src={slide.imgUrls[i]} />
          </a>
        );
      },
      beforeChange: function (oldIndex: number, newIndex: number) {
        setCurrentSlide(newIndex + 1);
      },
      dots: isShowDots,
      dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      //lazyLoad: 'ondemand',
      adaptiveHeight: true,
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
        {isShowDots === false ? (
          <SlideCounter>
            <FontAwesomeIcon icon={faCaretLeft} />{' '}
            {'Image ' + currentSlide + ' of ' + slideCount}{' '}
            <FontAwesomeIcon icon={faCaretRight} />
          </SlideCounter>
        ) : (
          ''
        )}
      </SlideWrapper>
    );
  } else {
    return <div>...</div>;
  }
}
