import * as c from '../actions/ActionTypes';

const blogReducer = (state, action) => {
  switch (action.type) {
    case c.GET_TRAVEL_REVIEW_SUCCESS:
      return {
        ...state, 
        isLoaded: true,
        reviews: action.reviews
      };
    case c.GET_TRAVEL_REVIEW_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      };
    default:
      throw new Error(`There is no action matching ${action.type}.`);
    }
};

export default blogReducer;
