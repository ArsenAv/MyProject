import {createStore, applyMiddleware} from 'redux';
import {postsReducer} from './reducers'
import thunk from 'redux-thunk'

export const store = createStore(postsReducer,applyMiddleware(thunk));