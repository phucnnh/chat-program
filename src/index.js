import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, compose } from 'redux';
import UserReducer from './reducers/UserReducer';
import { Provider } from 'react-redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from "firebase";
import TextboxReducer from './reducers/TextboxReducer';
import UserListReducer from './reducers/UserListReducer';
import NewMessageReducer from './reducers/NewMessageReducer';
import LoadImageReducer from './reducers/LoadImageReducer';

const rrfConfig = {
  userProfile: 'users',
}



// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  user: UserReducer,
  textbox: TextboxReducer,
  userlist: UserListReducer,
  newMessage: NewMessageReducer,
  image: LoadImageReducer
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)
ReactDOM.render(<Provider store={store}>
      <App/>
      </Provider>,
    document.getElementById('root')
  )
serviceWorker.unregister();
