import { database } from './services/mongodb';
import { app } from './app';
// import { errorHandler } from './errors/error-handler';

if (!process.env.JWT_KEY)
  // this is in k8s/auth depl
  throw new Error('process.env.JWT_KEY is not defined ');

app.listen(3000, () => {
<<<<<<< HEAD
  console.log('App is listening on the port 3000');
=======
  console.log('starting up');
  console.log('App is listening on the port 3000!');
>>>>>>> 39dcb872ae68b0431007f5eae67261776174e8ba
});

database();
