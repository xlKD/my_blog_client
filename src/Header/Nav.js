import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import API_SERVER from '../APIServer.js';

const NavLink = styled.a`
  padding: 1.7rem 1rem;
  font-size: 13px;
  outline: none !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 991.98px) {
    header .navbar .nav-link {
      padding: 1.7rem 1rem;
    }
  }

  @media (max-width: 767.98px) {
    header .navbar .nav-link {
      padding: 0.5rem 0rem;
    }
  }
`;

const DropdownMenu = styled.div`
  font-size: 14px;
  border-radius: 0px;
  border: none;
  -webkit-box-shadow: 0 2px 30px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 30px 0px rgba(0, 0, 0, 0.2);
  min-width: 13em;
  margin-top: -10px;

  @media (max-width: 1199.98px) {
    header .navbar .dropdown-menu:before {
      display: none;
    }
  }

  .dropdown-item:hover {
    background: #007bff;
    color: #fff;
  }

  .dropdown-item.active {
    background: #007bff;
    color: #fff;
  }

  .dropdown-menu a {
    padding-top: 7px;
    padding-bottom: 7px;
  }
`;

const AbsoluteToggle = styled.a`
  position: absolute;
  left: 15px;
  top: 5px;

  .burger-lines {
    width: 30px;
    display: inline-block;
    height: 2px;
    background: #000;
    position: relative;

    &:before,
    &:after {
      position: absolute;
      height: 2px;
      content: '';
      background: #000;
      width: 100%;
      left: 0;
    }

    &:before {
      top: -10px;
    }

    &:after {
      bottom: -10px;
    }
  }
`;

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      showMobileNav: false,
      categories: null,
    };
  }

  async componentDidMount() {
    const categories = (await axios.get(API_SERVER + '/api/categories')).data;
    this.setState({
      categories,
    });
  }

  onHover = () => {
    if (this.state.showMobileNav === false) {
      this.setState({ show: true });
    }
  };

  onLeave = () => {
    if (this.state.showMobileNav === false) {
      this.setState({ show: false });
    }
  };

  onClick = () => {
    if (this.state.showMobileNav === true) {
      this.setState({ show: !this.state.show });
    }
  };

  onClickHamburgerBtn = () => {
    this.setState((prevState) => ({
      showMobileNav: !prevState.showMobileNav,
    }));
  };

  render() {
    const mobileNavClass = this.state.showMobileNav === true ? ' show' : '';
    const navClassName = 'collapse navbar-collapse' + mobileNavClass;
    return (
      <div>
        <div className="container logo-wrap">
          <div className="row pt-3">
            <div className="col-12 text-center">
              <AbsoluteToggle
                className="d-block d-md-none"
                data-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="navbarMenu"
                onClick={this.onClickHamburgerBtn}
              >
                <span className="burger-lines"></span>
              </AbsoluteToggle>
              <h1 className="site-logo">
                <Link to={`/`}>HungNQ</Link>
              </h1>
            </div>
          </div>
        </div>

        <nav className="navbar navbar-expand-md  navbar-light bg-light">
          <div className="container">
            <div className={navClassName} id="navbarMenu">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <NavLink className="nav-link active" href="/">
                    Home
                  </NavLink>
                </li>
                <li
                  className="nav-item dropdown"
                  onMouseOver={this.onHover}
                  onMouseLeave={this.onLeave}
                  onClick={this.onClick}
                >
                  <NavLink
                    className="nav-link dropdown-toggle"
                    id="dropdown04"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Categories
                  </NavLink>
                  {this.state.show === true && (
                    <DropdownMenu
                      className="dropdown-menu show"
                      aria-labelledby="dropdown04"
                    >
                      {this.state.categories !== null &&
                        this.state.categories.map((category) => (
                          <Link
                            to={`/posts?category=${category.name}`}
                            className="dropdown-item"
                            key={category._id}
                          >
                            {category.name}
                          </Link>
                        ))}
                    </DropdownMenu>
                  )}
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" href="/about">
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
