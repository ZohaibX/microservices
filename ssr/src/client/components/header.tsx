import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = (currentUser) => {
  console.log('current user is', currentUser);

  const links = [
    !currentUser.currentUser && { label: 'Sign Up', href: '/signUp' },
    !currentUser.currentUser && { label: 'Sign In', href: '/signIn' },
    currentUser.currentUser && { label: 'Sign Out', href: '/signOut' },
  ]
    .filter((trueLinks) => trueLinks) // it will return only trues
    .map(({ label, href }: any) => (
      <li key={href} className='nav-item'>
        <Link to={href} className='nav-link' style={{ color: 'blue' }}>
          {label}
        </Link>
      </li>
    ));

  return (
    <nav className='navbar navbar-light bg-light' style={{ height: '20vh' }}>
      <Link className='navbar-brand font-weight-bolder' to='/'>
        Home
      </Link>

      <div className='d-flex justify-content-end'>
        <ul className='nav d-flex align-items-center'>{links}</ul>
      </div>
    </nav>
  );
};

function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default connect(mapStateToProps)(Header);
