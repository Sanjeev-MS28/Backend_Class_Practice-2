const express = require('express');
const { createBooks, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookControllers');
const router = express.Router();

router.post('/create', createBooks);
router.get('/get', getBooks);
router.put('/update/:id', updateBook);
router.get('/get/:id', getBookById);
router.delete('/delete/:id', deleteBook);

module.exports = router;