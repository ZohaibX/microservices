import * as React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Im a Home Component </h1>
      <button onClick={() => console.log('You Pressed Me!')}>
        Press Me - !
      </button>
      <Link to='/tickets'>
        <button>Get me to Tickets</button>
      </Link>
    </div>
  );
};

export default {
  component: Home, // this styling is for Routes file specially
};
