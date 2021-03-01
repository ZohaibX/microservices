import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../Store/actions/index';

const Header = (props) => {
  const authButton = props.currentUser ? (
    <a href='/api/logout'>Logout</a>
  ) : (
    <a href='/api/auth/google'>Login</a>
  );

  return (
    <div className='nav-wrapper'>
      <Link to='/' className='brand-logo'>
        React SSR
      </Link>
      <ul className='right'>
        <li>
          <Link to='/users'>Users</Link>
        </li>

        <li>
          <Link to='/admins'>Admins</Link>
        </li>

        <li>{authButton}</li>
      </ul>
    </div>
  );
};

function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default connect(mapStateToProps)(Header);
// note -- we want currentUser details to be rendered by server itself only
// thats y we are not using mapDispatch to props ..
