import React, { Component } from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Movies from './Movies';
import Confirmation from './Confirmation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { apiMiddleware, reducer } from './redux';


// Create Redux store
const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));

// Fetch movie data
store.dispatch({ type: 'GET_MOVIE_DATA' });

const AppStack = new createStackNavigator(
  {
    Movie: {
      screen: Movies
    },
    Confirmation: {
      screen: Confirmation
    }
  },
  {
    initialRouteName: 'Movie'
  }
)

const AppNavigator = createAppContainer(AppStack);

console.disableYellowBox = true;
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
