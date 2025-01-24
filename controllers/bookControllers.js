const Book = require('../models/BookModels');

const createBooks = async (req, res) => {
    try {
        const {title, author, genre, year, available} = req.body;
        console.log({title, author, genre, year, available});

        const book = await Book.findOne({ title });
        console.log(book,"book");

        if (book) {
            return res.status(400).send("Book already exists");
        }

        const newBook = new Book ({
            title,
            author,
            genre,
            year,
            available
        });
        console.log(newBook);

        await newBook.save();
        res.json(newBook);

    }
    catch (error) {
        res.status(500).send("Server Error");
    }   
};

const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    }
    catch (error) {
        res.status(500).send("Server Error");
    }
}

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).send(book);
    }
    catch (error) {
        res.status(500).send("Server Error");
    }
}

const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body);
        await book.save();
        res.status(200).send("Book updated successfully");
    }
    catch (error) {
        res.status(500).send("Server Error");
    }
}

const deleteBook = async (req,res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.status(200).send("Book deleted successfully");
    }
    catch (error) {
        res.status(500).send("Server Error");
    }
}

module.exports = { createBooks, getBooks, getBookById, updateBook, deleteBook };