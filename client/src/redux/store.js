import {createStore} from 'redux';
import {postsReducer} from './reducers'

export const store = createStore(postsReducer);