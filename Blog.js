import React, { useEffect, useReducer} from 'react';
import blogReducer from './reducers/blog-reducer'
import { getReviewsFailure, getReviewsSuccess } from './actions/index';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';

const initialState = {
  isLoaded: false,
  reviews: [],
  error: null
};

function Blog() {
  const [state, dispatch] = useReducer(blogReducer, initialState);

useEffect(() => {
  fetch(`https://localhost:5001/api/v1/reviews/`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      } else {
        return response.json()
      }
    })
    .then((jsonifiedResponse) => {
      const action = getReviewsSuccess(jsonifiedResponse)
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
            <Text>Country: {item.country}</Text>
          </View>
        )}
      />
      
        {/* <ul>
          {reviews.map((item, index) =>
            <li key={index}>
              <Text>Destination: {item.destination}</Text>
              <Text>Country: {item.country}</Text>
            </li>
          )}
        </ul> */}
      </View>
    );
  }

}

export default Blog;