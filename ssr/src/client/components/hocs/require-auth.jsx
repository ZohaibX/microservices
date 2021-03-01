import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ChildComponent) => {
  class RequireAuth extends Component {
    render() {
      console.log(' Current User is ', this.props.currentUser);
      if (this.props.currentUser === false) return <Redirect to='/' />;
      if (this.props.currentUser === null) return <div>Loading...</div>;
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps({ currentUser }) {
    return { currentUser };
  }

  return connect(mapStateToProps)(RequireAuth);
};
