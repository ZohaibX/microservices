//! this page will make everything global , it could be navbar , data fetching

// import App from "next/app";
import type { AppProps, AppContext } from 'next/app';

import 'bootstrap/dist/css/bootstrap.css'; // that is how we use global css -- which will be available to all the routes
import BuildClient from '../api/build-client';
import Header from '../components/header';

// this is a global wrapper of each page -- it will wrap every page with global css like things
const AppComponent = ({ Component, pageProps, userData }: any) => {
  // console.log(userData.email);

  return (
    <div>
      <Header userData={userData} />
      <Component {...pageProps} userData={userData} />
    </div>
  );
};

//! this function is executed on the server and not on the browser
// in the Next JS, page and getInitialProps only compiles single time when page "refresh" occurs so we need to fetch data at the start
AppComponent.getInitialProps = async (appContext: AppContext) => {
  // here, context === {Component , ctx: {req , res }}
  // this is a special component though

  // console.log(appContext);
  const client = BuildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentUser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx
    );
    // this App component refers to the page where we are
    // this if method is to invoke the getInitialProps function of the page where we are
  }

  return { pageProps, userData: data.currentUser };
  // userData will be provided to every page (using the component) -- we will need to pass these as props in other components
  // but pageProps will be available to the pages, where getInitialProps is used
};

export default AppComponent;
