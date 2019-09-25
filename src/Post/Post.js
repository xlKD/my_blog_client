import React, { Component, Suspense } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import hljs from 'highlight.js';
import sql from 'highlight.js/lib/languages/sql';
import Category from '../Category/Category';
import PostContentPlaceholder from '../Placeholder/PostContentPlaceholder';
import ImagePlaceholder from '../Placeholder/ImagePlaceholder';

const ImageSlide = React.lazy(() => import('./ImageSlide'));
const TagsList = React.lazy(() => import('./TagsList'));
const Bio = React.lazy(() => import('../Middle/Bio'));
const API_SERVER = require('../APIServer.js');

const MainContent = styled.div`
  padding-top: 3em;
  padding-bottom: 5em;
`;

const PostMeta = styled.div`
  padding-bottom: 1em;
`;

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const post = (await axios.get(API_SERVER + `/api/posts/${params.postId}`)).data;
    this.setState({
      post,
    });

    hljs.initHighlighting.called = false;
    hljs.registerLanguage('sql', sql);
    hljs.initHighlighting();
  }

  render() {
    const {post} = this.state;
	let content;

    if (post === null) {
	  return <PostContentPlaceholder/>;
	} else {
	  content = post.category === 'Figures' ?
        <Suspense fallback={<ImagePlaceholder/>}>
		  <ImageSlide postId={post._id} />
        </Suspense>
	  :
		<div className="post-content" dangerouslySetInnerHTML={{__html: post.content}} />
	}

    return (
	  <div>
		<section className="site-section py-lg">
		  <div className="container">
			
			<div className="row blog-entries">
			  <MainContent className="col-md-10 offset-md-1 main-content">
				<h2 className="mb-4">{post.title}</h2>
				<PostMeta>
				  <Category label={post.category} />
				  <span className="mr-2">{post.created_at}</span>
				</PostMeta>

				{content}
				
				<div className="pt-5">
				  <p>
                    Categories:  <Link to={`/posts?category=${post.category}`}>{post.category}</Link> Tags:  {
                      Array.isArray(post.tags) ?
                        post.tags.map(function(tag, index) {
                          return <Link to={`/posts?tag=${tag}`} key={tag}>#{tag}</Link>
                        })
                      :
                        post.tags ?
                          <Link to={`/posts?tag=${post.tags}`} key={post.tags}>
                            #{post.tags}
                          </Link>
                        :
                          ''
                    }
                  </p>
				</div>
			  </MainContent>

			  <div className="col-12 sidebar">
                <Suspense fallback={<div>...</div>}>
                  <Bio />
                </Suspense>
                <Suspense fallback={<div>...</div>}>
                  <TagsList />
                </Suspense>
			  </div>
			</div>
		  </div>
		</section>
	  </div>
    )
  }
}

export default Post;
