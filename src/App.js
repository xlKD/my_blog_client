import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Loadable from 'react-loadable';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { createGlobalStyle, keyframes } from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Loading() {
  return <div>...</div>;
}

const Post = Loadable({
  loader: () =>
    import ('./Post/Post'),
  loading: Loading
});

const Posts = Loadable({
  loader: () =>
    import ('./Posts/Posts'),
  loading: Loading
});

const About = Loadable({
  loader: () =>
    import ('./About/About'),
  loading: Loading
});

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
    font-size: 18px;
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
`;

class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <Route exact path='/' component={Posts}/>
        <Route path='/posts' component={Posts}/>
        <Route path='/post/:postId' component={Post}/>
        <Route path='/about' component={About}/>
        <Footer />
      </div>
    );
  }
}

export default App;
