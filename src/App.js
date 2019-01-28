import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Loadable from 'react-loadable';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { createGlobalStyle } from 'styled-components';

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

const GlobalStyle = createGlobalStyle`
  body {
	background: #fff;
	font-family: "Tahoma", arial, sans-serif;
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
  	font-family: "Tahoma", arial, sans-serif;
  }

  .blockquote {
    padding-left: 30px;
    border-left: 10px solid #e6e6e6;
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
        <Footer />
      </div>
    );
  }
}

export default App;
