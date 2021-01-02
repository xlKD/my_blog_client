import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { IPost } from '../interfaces';
import Category from '../Category/Category';
import PostListPlaceholder from '../Placeholder/PostListPlaceholder';
import API_SERVER from '../APIServer.js';

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
  border-radius: 6px;
  width: 150px;
  height: 40px;
  cursor: pointer;
  font-size: 15px;
  background-color: white;
`;

interface Props {
  location: {
    search: string;
  };
}
interface IKeyValue {
  key: string;
  value: string;
}

export default function Posts(props: Props) {
  const [filter, setFilter] = useState<IKeyValue>();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isOver, setIsOver] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchPosts(props);
  }, []);

  // TODO: make this search function work
  // async componentWillUpdate(nextProps) {
  //   if (this.props.location.search !== nextProps.location.search) {
  //     this.setState(
  //       {
  //         posts: null,
  //         offset: 0,
  //         isOver: false,
  //       },
  //       function () {
  //         this.fetchPosts(nextProps);
  //       },
  //     );
  //   }
  // }

  const fetchPosts = async (props: Props) => {
    const queryString =
      props.location.search === ''
        ? '?offset=' + offset
        : props.location.search + '&offset=' + offset;
    const getUrl = API_SERVER + '/api/posts' + queryString;
    const result = (await axios.get(getUrl)).data;
    let filter = null;
    if (queryString.indexOf('?keyword=') > -1) {
      const value = queryString.substr(queryString.indexOf('?keyword=') + 9);
      filter = {
        key: 'Posts contain',
        value: value,
      };
    } else if (queryString.indexOf('?tag=') > -1) {
      const value = queryString.substr(queryString.indexOf('?tag=') + 5);
      filter = {
        key: 'Tag',
        value: value,
      };
    } else if (queryString.indexOf('?category=') > -1) {
      const value = queryString.substr(queryString.indexOf('?category=') + 10);
      filter = {
        key: 'Category',
        value: value,
      };
    }
    setPosts(posts === null ? result.posts : posts.concat(result.posts));
    setOffset(result.offset);
    setIsOver(result.isOver);
  };

  const onClickLoadMoreBtn = () => {
    fetchPosts(props);
  };

  return (
    <section className="site-section py-sm">
      <div className="container">
        <div className="row blog-entries">
          <div className="col-lg-6 col-md-10 offset-md-1 offset-lg-3">
            {filter && (
              <Filter>
                {filter.key}: {filter.value}
              </Filter>
            )}
            <SidebarBox>
              <PostEntrySidebar>
                <ul>
                  {posts === null && <PostListPlaceholder />}
                  {posts &&
                    posts.map((post) => (
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
                    ))}
                </ul>
              </PostEntrySidebar>
            </SidebarBox>
          </div>
        </div>
        {isOver === false && posts !== null && (
          <div className="text-center">
            <LoadMoreBtn onClick={onClickLoadMoreBtn}>Load More</LoadMoreBtn>
          </div>
        )}
      </div>
    </section>
  );
}
