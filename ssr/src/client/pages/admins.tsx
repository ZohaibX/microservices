import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../Store/actions/index';
import RequireAuth from '../components/hocs/require-auth';
import { Helmet } from 'react-helmet';

const Admins = (props: any) => {
  useEffect(() => {
    props.fetchAdmins();
  }, []);

  const head = () => (
    <Helmet>
      <title>{`${props.admins.length} Admins Loaded`}</title>
      {/* // this is how we will make our title dynamic */}
      <meta property='og:title' content='Admins List'></meta>
      {/* // this title is for SEO -- to identify this page title  */}
      {/* // we normally have to add 4 required meta tags and we can add more optional meta tags for SEO */}
      {/* //? https://ogp.me/ */}
    </Helmet>
  );

  return (
    <div>
      {head()}
      <h1>Protected List Of Routes</h1>
      <ul>
        {props.admins.map((admin) => (
          <li key={admin.id}>{admin.name}</li>
        ))}
      </ul>
    </div>
  );
};

function mapStateToProps({ admins }) {
  return { admins };
}

export default {
  loadData: ({ dispatch }) => dispatch(fetchAdmins()), // short way of loadData fn
  component: connect(mapStateToProps, { fetchAdmins })(RequireAuth(Admins)),
};
