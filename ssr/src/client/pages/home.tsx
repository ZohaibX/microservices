import * as React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home = () => {
  const head = () => (
    <Helmet>
      <title>{`Home Component`}</title>
      {/* // this is how we will make our title dynamic */}
      <meta property='og:title' content='Home'></meta>
      {/* // this title is for SEO -- to identify this page title  */}
      {/* // we normally have to add 4 required meta tags and we can add more optional meta tags for SEO */}
      {/* //? https://ogp.me/ */}
    </Helmet>
  );

  return (
    <div>
      {head()}
      <h1>Im a Home Component </h1>
      <button onClick={() => console.log('You Pressed Me!')}>
        Press Me - !
      </button>
      <br />
      <Link to='/users'>
        <button>Get me to Users</button>
      </Link>
    </div>
  );
};

export default {
  component: Home, // this styling is for Routes file specially
};
