import app from "./server.js";
import mongodb from "mongodb";

//common pattern for writing programs with databases
//data object pattern separates a data resources client interface from its data acess mechanism
//it adapts a specific data resources acess API to a generic client interface and so we're following that pattern
// in how we set this program and thaty's why 8its called DAO 
import ReviewsDAO from "./dao/reviewsDAO.js"; //DAO -> data access object 


const MongoClient = mongodb.MongoClient;
//get acces from our username and password from our environment variables
const mogo_username = process.env['MONGO_USERNAME'];
const mogo_password =  process.env['MONGO_PASSWORD'];
const uri = "mongodb+srv://zhange241:NKTkZGkjE6WN9ZWD@cluster0.dt4ml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const port = 8000;

//connect to our 
//when we connect to our database we're going to get a client back
MongoClient.connect(
  uri,
  {
    maxPoolSize: 50, //max number of people that can be connected to the database at the same time
    wtimeoutMS: 2500, //how long it will wait for a connection to be established before timing out
  })
.catch(err => {
  console.error(err.stack); //communicates the error to the console
  process.exit(1); //exits the program
})
.then(async client => {
  await ReviewsDAO.injectDB(client);
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
})