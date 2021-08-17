const Book = require('../models/Book')
const Comment = require('../models/Comment')
const Rating = require('../models/Rating')
const {Router} = require('express')
const router = Router()

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
                    return res.send('Succesfully saved.');
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

module.exports = router