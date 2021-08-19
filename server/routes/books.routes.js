const Book = require('../models/Book')
const Comment = require('../models/Comment')
const {Router} = require('express');
const Favorites = require('../models/favorites');
const router = Router()
const jwt = require('jsonwebtoken')
const config = require('config')

router.get('/', function(req, res) {
    const page = req.query.page
    const pageItemsCount = Number(req.query.limit)
    const startIndex = (page - 1) * pageItemsCount
    Book.find().limit(pageItemsCount).skip(startIndex)
        .then(books => res.json(books))
        .catch(error => res.json('Error: ' + error));
  });
router.get('/bookcount', function(req, res){
    Book.count()
        .then(bookCount => res.json(bookCount))
        .catch(error => res.json('Error: ' + error));
})

router.post('/comments', (req, res) => {
    const {book_id, mail, text} = req.body
    Book.findOne({book_id})
        .then(book => {
            const newComent = new Comment( { book_id, mail, text } )
      
            newComent.save()
                .then(() => res.json("Comment saved!"))
                .catch((err) => res.json(err))
        })
        .catch(err => res.json('issue finding such book'))

})

router.get('/comments', function(req, res) {
    const bookId = req.query.book_id
    
    Comment.find({book_id:bookId})
        .then(comments => res.json(comments))
        .catch(error => res.json('Error Coments: ' + error))

})
router.post('/rating', (req, res) => {
    const {book_id, new_rating} = req.body
    // res.json(`book_id: ${book_id}`)
    Book.findOne({_id:book_id})
        .then(book => {
            // res.json('found')
            // res.json('book:' + book)
            const ratings = [...book.ratings, Number(new_rating)]
            // res.json(ratings.reduce((a, b) => Number(a) + Number(b), 0) / ratings.length)
            const averageRating = Math.round(ratings.reduce((a, b) => Number(a) + Number(b), 0) / ratings.length)
            // res.json(ratings)
            // res.json(averageRating)
            Book.findOneAndUpdate(book_id, {ratings: ratings, averagerate: averageRating}, 
                {upsert: true}, 
                function(err, doc){
                    if (err) return res.status(500, {error: err});
                    return res.send(`${averageRating}`);
            })
                
        })
        .catch(err => res.json('issue updating book'))

})
router.get('/rating', function(req, res) {
    const bookId = req.query.book_id
    
    Book.find({_id:bookId})
    
        .then(book => res.json(book[0].averagerate))
        
        .catch(error => res.json('Error Coments: ' + error))

})
router.get('/search', function(req, res) {
    const author = req.query.author
    const sort = Number(req.query.sort)
    if (author && sort) {
        Book.find({'author': { "$regex": author, "$options": "i" }}).sort({'title':sort})
            .then(book => res.json(book))
            .catch(error => res.json('Error Coments: ' + error))
    } else if (author) {
        Book.find({'author': { "$regex": author, "$options": "i" }})
            .then(book => res.json(book))
            .catch(error => res.json('Error Coments: ' + error))
    }else {
        res.json('No search text!')
    }

})
router.get('/favorites', function(req, res) {
    const token = req.headers.authorization
    const tokenArr = token.split(' ');
    const decoded = jwt.verify(tokenArr[1], config.get('jwtSecret'));
    const userId = decoded.userId
    // res.json(userId)
    Favorites.findOne({userId})
        .then(favorite => {
            Book.find({"_id":{ $in: favorite.bookIds}})
                .then(book => res.send(book))
                .catch(error => res.json('Cant find book by id: ' + error))
        })
        .catch(error => res.json('Cant find favorite by userId: ' + error))

    // 1. Favorites.find userId to get bookIds
    // then => Book.find {"_id":{ $in: favorite.bookIds}} => then return book
})

router.post('/favorites', (req, res) => {
    const token = req.headers.authorization
    const tokenArr = token.split(' ');
    const decoded = jwt.verify(tokenArr[1], config.get('jwtSecret'));
    const userId = decoded.userId

    const {book_id} = req.body
    const options = { upsert: true, new: true, setDefaultsOnInsert: true }
    Favorites.findOne({userId})
        .then(favorite => {
            let currentBookIds = []
            if (favorite) {
                currentBookIds = favorite.bookIds
            }
            Favorites.findOneAndUpdate(userId, {userId, bookIds: [...currentBookIds, book_id]}, 
                {upsert: true}, 
                function(err, doc){
                    if (err) return res.status(500, {error: err});
                    return res.send(`Successfully added new book to favorites!`);
            })
        })
        .catch(error => res.json('Error finding such favorite: ' + error))
})

// post
// body with user_id, book_id
// find Favorites by user_id
// favorite.bookIds.push(book_id)
// favorite.save()

module.exports = router