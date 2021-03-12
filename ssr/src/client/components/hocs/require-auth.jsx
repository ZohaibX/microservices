import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ChildComponent) => {
  class RequireAuth extends Component {
    render() {
      const { match, location, history, router } = this.props;
      const { currentUser } = this.props;
      if (currentUser === false)
        return (
          <Redirect to={{ pathname: '/signIn' }} />
        );
      // state is not working here, to redirect back
      if (currentUser === null) return <div>Loading...</div>;
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps({ currentUser }) {
    return { currentUser };
  }

  return connect(mapStateToProps)(RequireAuth);
};
