import axios from 'axios'
import {useSelector} from "react-redux"

export const UPDATE_BOOKS = "BOOKS/UPDATE_BOOKS"
export const UPDATE_BOOK_COUNT = "BOOKS/UPDATE_BOOK_COUNT"
export const CHANGE_CURENTPAGE = "BOOKS/CHANGE_CURENTPAGE"

function updateBooks(newBooks) {
    return {type: UPDATE_BOOKS, payload: newBooks}
}


export const getBooksThunk = (currentPage, limit) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/api/auth/books?page=${currentPage || 1}&limit=${limit || 3}`)
            .then((res) => dispatch(updateBooks(res.data)))
            .catch(error => alert('Error getting books'))
    }
}
function updateBookCount (newBooksCount){
    return {type: UPDATE_BOOK_COUNT, payload: newBooksCount}
}

export const getBookCountThunk = () => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/api/auth/bookcount`)
            .then((res) => dispatch(updateBookCount(res.data)))
            .catch(error => alert('Error update count'))
    }
}

export function updateCurrentPage(newCurrentPage){
    return({type: CHANGE_CURENTPAGE, payload: newCurrentPage})
}