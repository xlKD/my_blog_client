import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Category from '../Category/Category';
import PostListPlaceholder from '../Placeholder/PostListPlaceholder';

const Filter = styled.div`
  margin-top: 5px;
  color: #000;
  font-style: italic;
`;

const SidebarBox = styled.div`
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
      padding: 0 0 25px 0;

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

const LoadMoreBtn = styled.button`
  border-radius: 2px;
  width: 150px;
  height: 40px;
  cursor: pointer;
  font-size: 15px;
`;

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
      offset: 0,
      isOver: false,
    };
  }

  async componentDidMount() {
    this.fetchPosts(this.props);
  }

  async componentWillUpdate(nextProps) {
    if ( this.props.location.search !== nextProps.location.search ) {
      this.setState({
        posts: null,
        offset: 0,
        isOver: false,
        },
      function() {
        this.fetchPosts(nextProps);
      });
    }
  }

  async fetchPosts(props) {
    const queryString = props.location.search === '' ? '?offset=' + this.state.offset : props.location.search + '&offset=' + this.state.offset;
    const getUrl = 'http://localhost:3000/api/posts' + queryString;
    const result = (await axios.get(getUrl)).data;
    let filter = null;

    if ( queryString.indexOf('?keyword=') > -1 ) {
      const value = queryString.substr(queryString.indexOf('?keyword=') + 9);
      filter = {
        key: 'Posts contain',
        value: value
      }
    } else if ( queryString.indexOf('?tag=') > -1 ) {
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
      posts: this.state.posts === null ? result.posts : this.state.posts.concat(result.posts),
      offset: result.offset,
      isOver: result.isOver,
    });
  }

  onClickLoadMoreBtn = () => {
    this.fetchPosts(this.props);
  }

  render() {
    return (
      <section className="site-section py-sm">
        <div className="container">
          <div className="row blog-entries">
            <div className="col-lg-9 col-md-10 offset-md-2 offset-lg-3">
              {this.state.filter && <Filter>{this.state.filter.key}: {this.state.filter.value}</Filter>}
              <SidebarBox>
				<PostEntrySidebar>
                  <ul>
                  {this.state.posts === null && <PostListPlaceholder/>}
                  {
                    this.state.posts && this.state.posts.map(post => (
                      <li key={post._id}>
                        <Link to={`/post/${post._id}`}>
                          <div className="text">
                            <h4>{post.title}</h4>
                            <div className="post-meta">
                              <Category label={post.category} />
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
          {(this.state.isOver === false && this.state.posts !== null) &&
            <div className="text-center">
              <LoadMoreBtn onClick={this.onClickLoadMoreBtn}>Load More</LoadMoreBtn>
            </div>
          }
        </div>
      </section>
    )
  }
}

export default Posts;
