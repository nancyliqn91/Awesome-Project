import React, { useEffect, useReducer} from 'react';
import blogReducer from './reducers/blog-reducer'
import { getReviewsFailure, getReviewsSuccess } from './actions/index';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
// Do not use ActivityIndicator

const initialState = {
  isLoaded: false,
  reviews: [],
  error: null
};

function Blog() {
  const [state, dispatch] = useReducer(blogReducer, initialState);

useEffect(() => {
  fetch(`https://localhost:5001/api/v1/travels/`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      } else {
        return response.json()
      }
    })
    .then((jsonifiedResponse) => {
      // depends on the response. Because the travels are stored in a property of the response called travels, so update the reviews state to be jsonifiedResponse.travels
      const action = getReviewsSuccess(jsonifiedResponse.travels)
      dispatch(action);
      })
    .catch((error) => {
      const action = getReviewsFailure(error.message)
      dispatch(action);
    });
  }, [])

  const {error, isLoaded, reviews} = state;

  if (error) {
    return <Text>Error!</Text>;
    // return <ActivityIndicator/> is not working;
  } else if (!isLoaded) {
    return <Text>...Loading...</Text>;
  } else {
    return (
      <View>
        <Text>Blog</Text>
        <FlatList
        data={reviews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Destination: {item.destination}</Text>
            <Text>City: {item.city}</Text>
            <Text>Country: {item.country}</Text>
            <Text>Review: {item.review}</Text>
            <Text>Rating: {item.rating}</Text>
            <Text>Date: {item.date}</Text>

          </View>
        )}
      />
      
      </View>
    );
  }

}

export default Blog;