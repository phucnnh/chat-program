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
import SearchUserReducer from './reducers/SearchUserReducer';
import LoadImageReducer from './reducers/LoadImageReducer';

const rrfConfig = {
  userProfile: 'users',
}




const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), 
)(createStore)


const rootReducer = combineReducers({
  firebase: firebaseReducer,
  user: UserReducer,
  textbox: TextboxReducer,
  searchlist: SearchUserReducer,
  image: LoadImageReducer
})


const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)
ReactDOM.render(<Provider store={store}>
      <App/>
      </Provider>,
    document.getElementById('root')
  )
serviceWorker.unregister();
