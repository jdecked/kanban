import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    return (
      <header>
        <i className='material-icons'>menu</i>
        <h1 style={{fontSize: 48, fontWeight: 400, paddingLeft: 24, margin: 0}}>
          {this.props.title}<span style={{color: '#90CAF9'}}>.</span>
        </h1>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header;
