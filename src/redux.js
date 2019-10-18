import { Platform } from 'react-native';
import { movies } from './data';
const API = Platform.OS === 'android'
  ? 'https://jsonplaceholder.typicode.com' // works for Genymotion
  : 'http://localhost:3000/v1';

export const apiMiddleware = store => next => action => {
  // Pass all actions through by default
  next(action);
  switch (action.type) {
    // In case we receive an action to send an API request
    case 'GET_MOVIE_DATA':
      // Dispatch GET_MOVIE_DATA_LOADING to update loading state
      store.dispatch({type: 'GET_MOVIE_DATA_LOADING'});
      console.log('before api call movies',movies);
      // Make API call and dispatch appropriate actions when done
      fetch(`${API}/posts`)
        .then(response => response.json())
        .then(data => next({
          type: 'GET_MOVIE_DATA_RECEIVED',
          payload: movies
        }))
        .catch(error => next({
          type: 'GET_MOVIE_DATA_ERROR',
          error
        }));
      break;
    // Do nothing if the action does not interest us
    default:
      break;
  }
};

export const reducer = (state = { movies: [], loading: true }, action) => {
    switch (action.type) {
      case 'GET_MOVIE_DATA_LOADING':
        return {
          ...state,                   // keep the existing state,
          loading: true,              // but change loading to true
        };
      case 'GET_MOVIE_DATA_RECEIVED':
        console.log('movies',action.payload);
        return {
          loading: false,             // set loading to false
          movies: action.payload, // update movies array with reponse data
        };
      case 'GET_MOVIE_DATA_ERROR':
        return state;
      default:
        return state;
      }
  };