import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ChildComponent) => {
  class SignedIn extends Component {
    render() {
      const { currentUser } = this.props;
      // console.log(' Current User from SignedIn HOC is ', currentUser);
      console.log('location from RequireAuth is: ', this.props.location);
      if (!currentUser) return <ChildComponent {...this.props} />;
      return (
        <Redirect
          to={{ pathname: '/' }}
        />
      );
    }
  }

  function mapStateToProps({ currentUser }) {
    return { currentUser };
  }

  return connect(mapStateToProps)(SignedIn);
};
