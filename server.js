//seprating our main server code to our database code
//Main server file
import express from 'express';
import cors from 'cors';
import reviews from './api/reviews.route.js';

// create express app, to get acess to express
const app = express();

// allows us to use middleware, things express use to change how things work
app.use(cors());
//allows our server to accept json in the body of the request, like git request or post request
app.use(express.json());

//initial routes
app.use('/api/v1/reviews', reviews);

//backup route
app.use("*", (req, res) => res.status(404).json({error: "not found"}));

//export our app to different modules
//this allows us to import app to files that use the database
//which is the file that we will run to get the server runnning
export default app;
