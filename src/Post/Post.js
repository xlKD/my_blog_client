import React, { Component, Suspense } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import hljs from 'highlight.js';
import sql from 'highlight.js/lib/languages/sql';
import Category from '../Category/Category';
const RecentPosts = React.lazy(() => import('./RecentPosts'));
const TagsList = React.lazy(() => import('./TagsList'));
const Bio = React.lazy(() => import('../Middle/Bio'));

const MainContent = styled.div`
  padding-top: 3em;
  padding-bottom: 5em;
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
    const post = (await axios.get(`https://admin.hung-nq.tk/api/posts/${params.postId}`)).data;
    this.setState({
      post,
    });

    hljs.initHighlighting.called = false;
    hljs.registerLanguage('sql', sql);
    hljs.initHighlighting();
  }

  render() {
    const {post} = this.state;
    if (post === null) return <div>...</div>;

    return (
	  <div>
		<section className="site-section py-lg">
		  <div className="container">
			
			<div className="row blog-entries">
			  <MainContent className="col-md-10 offset-md-1 main-content">
				<h1 className="mb-4">{post.title}</h1>
				<div className="post-meta">
				  <Category label={post.category} />
				  <span className="mr-2">{post.created_at}</span>
				</div>
				<div dangerouslySetInnerHTML={{__html: post.content}} />
				
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
                  <RecentPosts />
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
