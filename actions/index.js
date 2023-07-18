import * as c from './ActionTypes';

export const getReviewsSuccess = (reviews) => ({
  type: c.GET_TRAVEL_REVIEW_SUCCESS,
  reviews
});

export const getReviewsFailure = (error) => ({
  type: c.GET_TRAVEL_REVIEW_FAILURE,
  error
});