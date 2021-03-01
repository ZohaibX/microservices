import * as React from 'react';

const NotFound = ({ staticContext = { notFound: false } }) => {
  staticContext.notFound = true;
  return <h1>Oops.. Page Not Found </h1>;
};

export default {
  component: NotFound,
};
