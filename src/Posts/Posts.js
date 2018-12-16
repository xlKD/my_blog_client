import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Filter = styled.div`
  margin-top: 5px;
  color: #000;
  font-style: italic;
`;

const SidebarBox = styled.div`
  margin-bottom: 4em;
  font-size: 15px;
  width: 100%;
  float: left;
  background: #fff;
`;

const PostEntrySidebar = styled.div`
  padding-top: 20px;

  ul {
	padding: 0;
	margin: 0;
  
	li {
	  list-style: none;
      padding: 0 0 20px 0;
      margin: 0 0 20px 0;

      a {
		display: table;

        .text {
		  display: table-cell;
    	  vertical-align: middle;

		  h4 {
			font-size: 18px;
		  }
		}
      }
	}
  }

  .post-meta {
	font-size: 14px;
    color: #b3b3b3;
  }
`;

const Category = styled.div`
  display: inline-block;
  background: #007bff;
  padding: 2px 8px;
  line-height: 1.5;
  font-size: 12px;
  font-style: italic;
  border-radius: 4px;
  text-transform: uppercase;
  color: #fff !important;
  margin-right: 10px;
`;

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
    };
  }

  async componentDidMount() {
    this.fetchPosts(this.props);
  }

  async componentWillReceiveProps(nextProps) {
    if ( this.props.location.search !== nextProps.location.search ) {
      this.fetchPosts(nextProps);
    }
  }

  async fetchPosts(props) {
    const queryString = props.location.search;
    const getUrl = 'https://admin.hung-nq.tk/api/posts' + queryString;
    const posts = (await axios.get(getUrl)).data;
    let filter = null;

    if ( queryString.indexOf('?tag=') > -1 ) {
      const value = queryString.substr(queryString.indexOf('?tag=') + 5);
      filter = {
        key: 'Tag',
        value: value
      }
    } else if ( queryString.indexOf('?category=') > -1 ) {
      const value = queryString.substr(queryString.indexOf('?category=') + 10);
      filter = {
        key: 'Category',
        value: value
      }
    }

    this.setState({
      posts,
      filter
    });
  }

  render() {
    return (
      <section className="site-section py-sm">
        <div className="container">
          <div className="row blog-entries">
            <div className="col-12 offset-md-2 offset-lg-3">
              {this.state.filter && <Filter>{this.state.filter.key}: {this.state.filter.value}</Filter>}
              <SidebarBox>
				<PostEntrySidebar>
                  <ul>
                  {this.state.posts === null && <div>...</div>}
                  {
                    this.state.posts && this.state.posts.map(post => (
                      <li key={post._id}>
                        <Link to={`/post/${post._id}`}>
                          <div className="text">
                            <h4>{post.title}</h4>
                            <div className="post-meta">
							  <Category>{post.category}</Category>
                              <span className="mr-2">{post.created_at}</span>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
				</PostEntrySidebar>
              </SidebarBox>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Posts;
