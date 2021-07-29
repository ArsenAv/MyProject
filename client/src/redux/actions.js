import axios from 'axios'
export const FETCH_POSTS = "POSTS/FETCH_POSTS"
export const CHANGE_BOOKS = "BOOKS/CHANGE_BOOKS"


export function fetchData () {
    const url = 'http://localhost:5000/api/auth/books'
    return(
        {
            type: FETCH_POSTS,
            payload: url
        }
    )
};

// export function changeBooks(books) {
//     alert("Action books: " + JSON.stringify(books))
//     return(
//         {
//             type: CHANGE_BOOKS,
//             payload: books
//         }
//     )
// }