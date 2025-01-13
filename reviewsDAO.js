import mongodb from "mongodb";
//we'll be sending and receiving text/integers from backend to database
//when searching for Id, we can't search an int or str, we have to search by specific datatype called ObjectID (different from a Str or Int)
const ObjectId = mongodb.ObjectId; 

let reviews;

export default class ReviewsDAO{
  static async injectDB(conn){ //we are getting a connection
    if (reviews){ //if there is already database connection, don't do anything
      return;
    }
    try{ //if no connection 
      //wait from the connection, then get the database called "reviews", then the collection "reviews"
      // you can have multiple collections in the database 
      reviews = await conn.db("reviews").collection("reviews");
    }catch (e){
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async addReview(movieId, user, review){
    try{
      //create a document with the movieId, user, and review -> basically our database entry
      const reviewDoc = {
        movieId: movieId,
        user: user,
        review: review
      }
      //return what happens when we insert the document
      return await reviews.insertOne(reviewDoc); //insert is MongoDB command to insert the doc into database 
    }catch (e){
      console.error(`Unable to post review: ${e}`);
      return {error: e};
    }
  }

  static async getReview(reviewId){
    try{
      //find the review with the id, the movie id is not the id(the id is created automatically when we created the document)
      return await reviews.findOne({_id: new ObjectId(reviewId)});  //using ObjectId to convert the reviewId(string)
    }catch (e){
      console.error(`Unable to get review: ${e}`);
      return {error: e};
    }
  }

  static async updateReview(reviewId, user, review){
    try{
      //passing in objectId to convert the string to an object, says what we are searching for
      //then MongoDB specific: you $set-> the review to be the review, and user to be user
      const updateResponse = await reviews.updateOne(
        {_id: new ObjectId(reviewId)},
        {$set: {user: user, review: review}}
      )

      return updateResponse;
    }catch (e){
      console.error(`Unable to update review: ${e}`);
      return {error: e};
    }
  }

  static async deleteReview(reviewId){
    try{
      //delete with the MongoDB command by searching with the ID
      const deleteResponse = await reviews.deleteOne({_id: new ObjectId(reviewId)});
      return deleteResponse; //then return the response
    }catch (e){
      console.error(`Unable to delete review: ${e}`);
      return {error: e};
    }
  }

  //note this is not the ObjectId -> this is an integer of the movieId
  static async getReviewsByMovieId(movieId){
    try{
      //get a cursor -> find multiple items (it will has a cursor), finding all items with this MovieId
      const cursor = await reviews.find({movieId: parseInt(movieId)}); //will be a string but can be parsed into an integer
      return cursor.toArray();
    }catch (e){
      console.error(`Unable to get review: ${e}`);
      return {error: e};
    }
  }
}