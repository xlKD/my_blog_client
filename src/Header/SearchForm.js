import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';

config.autoAddCss = false;

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
	this.setState({
	  keyword: event.target.value
	});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push('/?keyword=' + this.state.keyword);
  }

  render() {
    return (
      <div className="col-sm-3 col-xs-12">
        <form onSubmit={this.handleSubmit} className="search-top-form">
          <span className="icon-search">
            <FontAwesomeIcon icon={faSearch} onClick={this.handleSubmit} />
          </span>
          <input className="input-search" type="text" name="keyword" placeholder="Search by keyword" value={this.state.keyword} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

export default withRouter(SearchForm);
