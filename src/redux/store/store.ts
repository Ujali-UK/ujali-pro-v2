import { getFirebase } from 'react-redux-firebase';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {};

const devTools =
  process.env.NODE_ENV === 'production'
    ? compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
      )
    : composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
      );

const store = createStore(rootReducer, initialState, devTools);

export default store;
