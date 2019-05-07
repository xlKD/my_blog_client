import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const FormWrapper = styled.div`
  .search-top-form {
    position: relative;
    float: right;
  }

  .icon {
    position: absolute;
    right: 10px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 15px;
    color: #fff;
  }

  input {
	color: #fff;
    background: #212121;
    width: inherit;
    min-width: 300px;
    border: none;
    -webkit-transition: .3s all ease;
    -o-transition: .3s all ease;
    transition: .3s all ease;
    padding: 4px 30px 4px 15px;
    font-size: 16px;
  }
`;

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
      <FormWrapper className="col-3">
        <form onSubmit={this.handleSubmit} className="search-top-form">
          <span className="icon fa fa-search" onClick={this.handleSubmit}></span>
          <input type="text" name="keyword" placeholder="Search by keyword" value={this.state.keyword} onChange={this.handleChange} />
        </form>
      </FormWrapper>
    );
  }
}

export default withRouter(SearchForm);
