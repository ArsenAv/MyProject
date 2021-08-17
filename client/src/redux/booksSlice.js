import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import users from './userSlice'
console.log(users)
export const booksSlice = createSlice({
    name: 'booksSlice',
    initialState: {
        books: [],
        currentPage: 1,
        limit: 3,
        bookCount: 0,
        pageCount: 0,
        comments: []
    },
    reducers: {
        updateBooks: (state, action) => {
            state.books = action.payload
        },
        updateBookCount: (state, action) => {
            const pageCount = Math.ceil(action.payload / state.limit)
            state.bookCount = action.payload
            state.pageCount = pageCount
        },
        updateCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        updateComments: (state, action) =>{
            state.comments = action.payload
        },
        addComment: (state, action) => {
            state.comments.push(action.payload)
        }
    }
})

export const getBooksThunk = (currentPage, limit, token) => {
     
    return (dispatch) => {
        axios.get(`http://localhost:5000/books/?page=${currentPage || 1}&limit=${limit || 3}`, 
                {headers:{authorization: `Bearer ${token}`}})
            .then((res) => {
                dispatch(updateBooks(res.data))
            })
            .catch(error => alert('Error getting books'))
    }
}

export const getBookCountThunk = (token) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/books/bookcount`,{headers:{authorization: `Bearer ${token}`}} )
            .then((res) => dispatch(updateBookCount(res.data)))
            .catch(error => alert('Error update count'))
    }
}


export const getCommentsThunk = (book_id, token) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/books/comments?book_id=${book_id}`,{headers:{authorization: `Bearer ${token}`}})
        .then((res) => {
            dispatch(updateComments(res.data))
        })
        .catch(error => alert('Error send comments data '))
    }
}
export const sendCommentThunk = (book_id, mail, text, token) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/books/comments`, {book_id, mail, text},{headers:{authorization: `Bearer ${token}`}})
        .then((res) => dispatch(addComment({book_id, mail, text})))
        .catch(error => alert('Error send comments data '))
    }
}



export const { updateBooks, updateBookCount, updateCurrentPage, addComment, updateComments } = booksSlice.actions
export default booksSlice.reducer