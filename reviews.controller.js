//getting information from the sent to the route and sending it to ReviewsDAO
//controller is getting information from route and do something with the information
// then send it to ReviewsDAO which it will actually acess the database and then
// get the information back from database
import ReviewsDAO from "../dao/reviewsDAO.js";

//we can import it in other places
//class => to have multiple functions 
export default class ReviewsController {
  //static so we can call it without creating an instance of the class, call directly from reviewsController
  static async apiPostReview(req, res, next){
    try{
      //request has body, a body of the request that's going to be json submitted with the url request http resqest and its going to have info (movie Id, which we are connecting the review to, review text, and user
      const movieId = parseInt(req.body.movieId);
      const review = req.body.review;
      const user = req.body.user;

      //since async we can await for something to happen
      //this is where we are adding the review, and awaitng the response from this
      const reviewResponse = await ReviewsDAO.addReview(movieId, user, review);

      //and now we are responding
      res.json({status: "success"});
    }catch (e){
      res.status(500).json({error: e.message});
    }
  }

  static async apiGetReviews(req, res, next){
    try{
      //params => (you get from the ("/:id")/the url from the route VS body = json that comes with it
      let id = req.params.id || {}; //if there is no id, then it will be an empty object
      let review =  await ReviewsDAO.getReview(id); //passing in id
      if(!review){ //if no review return 404 msg
        res.status(404).json({error: "not found"});
        return;
      }
      res.json(review); //otherwise show review
    }catch (e){
      console.log(`api, ${e}`);
      res.status(500).json({error: e});
    }
  }

  static async apiUpdateReview(req, res, next){
    try{
      //get acess to the review body
      const reviewId = req.params.id;

      //actual review is from the body
      const review = req.body.review;
      const user = req.body.user;

      //update the review and store it in the const
      const reviewResponse = await ReviewsDAO.updateReview(reviewId, user, review);

      //{error} extracts the error message of this
      var {error} = reviewResponse;
      //if error is valid (if there is an error)
      if(error){
        res.status(400).json({error});
      }

      //if the modifiedcount is 0 that means nothing changed, no "update"
      //so this creates the new error 
      if(reviewResponse.modifiedCount === 0){
        throw new Error("unable to update review");
      }

      //if no error then output success
      res.json({status: "success"});
    }catch (e){//when error occurs catch it 
      res.status(500).json({error: e.message});
    }
  }

  static async apiDeleteReview(req, res, next){
    try{
      //only need id
      const reviewId = req.params.id;
      //delete the review, if successful then return success
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
      res.json({status: "success"});
    }catch (e){//if error catch it 
      res.status(500).json({error: e.message});
    }
  }

  static async apiGetReview(req, res, next){
    try{
      let id = req.params.id || {};
      let reviews = await ReviewsDAO.getReviewsByMovieId(id);
      if(!reviews){
        res.status(404).json({error: "not found"});
        return;
      }
      res.json(reviews);
    }catch (e){
      console.log(`api, ${e}`);
      res.status(500).json({error: e});
    }
  }
}
