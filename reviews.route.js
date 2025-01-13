import express from "express";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();

//colon means it could be anything and becomes a variable called id (so the movie id can be there)
//and we can get access to it in the controller with that id
router.route("/movie/:id").get(ReviewsCtrl.apiGetReview);
router.route("/new").post(ReviewsCtrl.apiPostReview);
router.route("/:id")
  .get(ReviewsCtrl.apiGetReviews)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router;