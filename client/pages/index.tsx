import BuildClient from '../api/build-client';

// i can write interface rather than using 'any'
const Home = (data: any) => {
  return data.currentUser ? (
    <h1 className='my-5 text-center font-weight-bolder'>
      You are Signed In and We have your Data
    </h1>
  ) : (
    <h1 className='my-5 text-center font-weight-bolder'>
      You are not Signed In{' '}
    </h1>
  );
};

//! this function is executed on the server and not on the browser
// in the Next JS, page and getInitialProps only compiles single time when page "refresh" occurs so we need to fetch data at the start
Home.getInitialProps = async (context: any) => {
  //!! this function will be invoked by the method we defined in AppComponent
  //? here, context === {req , res}
  const preConfiguredAwait = BuildClient(context); // this api function create configured axios
  const { data } = await preConfiguredAwait.get('/api/users/currentUser');

  return data;
};

export default Home;
