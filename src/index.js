import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from "firebase";
import { config as fbconfig } from './App';
import { render } from 'react-dom';
import UserReducer from './reducers/UserReducer';


const rrfConfig = {
    userProfile: 'users',
    
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }
  
  
  // Add reactReduxFirebase enhancer when making store creator
  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    //reduxFirestore(firebase) // <- needed if using firestore
  )(createStore)
  
  // Add firebase to reducers
  const rootReducer = combineReducers({
    firebase: firebaseReducer,
    user: UserReducer,
    //firestore: firestoreReducer // <- needed if using firestore
  })
 
  
  // Create store with reducers and initial state
  const initialState = {}
  const store = createStoreWithFirebase(rootReducer, initialState)
  render(<Provider store={store}>
        <App/>
        </Provider>,
      document.getElementById('root')
    )
  serviceWorker.unregister();
