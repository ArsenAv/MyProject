import {combineReducers} from 'redux';
import { CHANGE_CURENTPAGE, UPDATE_BOOKS, UPDATE_BOOK_COUNT} from './actions'; 

const initialState = {
    books: [],
    currentPage: 1,
    limit: 3,
    bookCount: 0,
    pageCount: 0,
    gotResponse:false
}

const booksReducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_BOOKS:{
            // alert('payload: ' + JSON.stringify(action.payload))
            return {...state, books:action.payload}   
        }
        case UPDATE_BOOK_COUNT:{
            // alert('limit: ' + state.state.limit)
            const pageCount = Math.ceil(action.payload / state.state.limit)
            return {...state, bookCount:action.payload, pageCount:pageCount}
        }
        case CHANGE_CURENTPAGE:{
            return {...state, currentPage: action.payload}
        }
        default: {
            return {state};
        }
    }
}

export const postsReducer = combineReducers({books: booksReducer});