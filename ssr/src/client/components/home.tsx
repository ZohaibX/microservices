import * as React from 'react';

const Home = () => {
  return (
    <div> 
      <h1>Im a Home Component </h1>
      <button onClick={() => console.log("You Pressed Me!")}>Press Me - !</button>
    </div>
  );
};

export default Home;
