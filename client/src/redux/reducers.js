import {combineReducers} from 'redux';
import { FETCH_POSTS, CHANGE_BOOKS } from './actions';
const axios = require('axios')



const initialState = {
    books: [
       
    ]
}

const booksReducer = async (state = initialState, action) => {
    switch(action.type){
        case FETCH_POSTS:{
            const response = await axios.get(action.payload);
            // return [ action.payload.data, ...state ]
            alert("response: " + JSON.stringify(response))
            return {...state, books: response.data};
           
        }
        case CHANGE_BOOKS:{
            alert(JSON.stringify(action.payload))
            return state;
        }
        default: {
            return state;
        }
    }
}



export const postsReducer = combineReducers({allbooks: booksReducer});