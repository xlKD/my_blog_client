import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Loadable from 'react-loadable';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import GlobalStyle from './GlobalStyle';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Loading() {
  return <div></div>;
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
