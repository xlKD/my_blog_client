import { createGlobalStyle, keyframes } from 'styled-components';

const FadeIn = keyframes`
   from {
     opacity: 0;
     visibility: hidden;
     transform: translate3d(0, 40px, 0);
   }

   to {
     opacity: 1;
     visibility: visible;
     transform: none;
   }
`;
const GlobalStyle = createGlobalStyle`
  body {
	background: #fff;
	font-family: Tahoma, ArialMT, Arial;
    font-weight: 300;
    font-size: 16px;
    line-height: 1.9;
    color: #6c757d;
  }

  a {
  	-webkit-transition: .3s all ease;
  	-o-transition: .3s all ease;
  	transition: .3s all ease;
  	text-decoration: none;
  }

  a:hover {
  	text-decoration: none;
  }

  h1, h2, h3, h4, h5 {
  	color: #000;
  }

  .blockquote {
    padding-left: 30px;
    border-left: 10px solid #e6e6e6;
  }

 .imgFadeIn {
    animation-name: ${FadeIn};
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  .slick-thumb {
    bottom: -60px;

    li {
      width: 50px;
    }

    li img {
      filter: grayscale(100%);
    }

    li.slick-active img {
      filter: grayscale(0);
      transform: scale(1.1);
    }
  }

  .slick-initialized .slick-track {
    display: flex;
    align-items: center;
  }

  .post-content {
    i.fa {
      width: 20px;
      text-align: center;
    }
  }
`;

export default GlobalStyle;
