import React, { Component, Suspense } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import hljs from 'highlight.js';
import sql from 'highlight.js/lib/languages/sql';
const RecentPosts = React.lazy(() => import('./RecentPosts'));
const TagsList = React.lazy(() => import('./TagsList'));
const Bio = React.lazy(() => import('../Middle/Bio'));

const MainContent = styled.div`
  padding-top: 3em;
  padding-bottom: 5em;
`;

const Category = styled.span`
  display: inline-block;
  background: #007bff;
  padding: 2px 8px;
  line-height: 1.5;
  font-size: 12px;
  border-radius: 4px;
  text-transform: uppercase;
  color: #fff !important;
  margin-right: 10px;
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
				  <Category>{post.category}</Category>
				  <span className="mr-2">{post.created_at}</span>
				</div>
				<div dangerouslySetInnerHTML={{__html: post.content}} />
				
				<div className="pt-5">
				  <p>
                    Categories:  <a href="#">{post.category}</a> Tags:  {
                      Array.isArray(post.tags) ?
                        post.tags.map(function(tag, index) {
                          return <a href={'/posts?tag=' + tag} key={tag}>#{tag}</a>
                        })
                      :
                        <a href={'/posts?tag=' + post.tags} key={post.tags}>#{post.tags}</a>
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
