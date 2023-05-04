const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


const app = express();

const db = mysql.createPool({
	host: 'mysql_db',
	user: 'MYSQL_USER',
	password: 'MYSQL_PASSWORD',
	database: 'books',
});


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
	res.send('hi there');

});


app.get('/get', (req, res) => {
	const SelectQuery = "SELECT * FROM books_reviews";
	db.query(SelectQuery, (err, result) => 
		res.send(result)
	);
});


app.post('/insert', (req, res) => {
	const bookName = req.body.setBookName;
	const bookReview = req.body.setReview;

	const InsertQuery = "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";

	db.query(InsertQuery, [bookName, bookReview], (err, result) => 
		res.send(result)
	);
});

app.delete('/delete/:bookId', (req, res) => {
	const bookId = req.params.bookId;

	const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";

	db.query(DeleteQuery, bookId, (err, result) => 
		res.send(result)
	);
});

app.put('/update/:bookId', (req, res) => {
	const bookReview = req.body.reviewUpdate;
	const bookId = req.params.bookId;

	const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";

	db.query(UpdateQuery, [bookReview, bookId], (err, result) => 
		res.send(result)
	);
});


app.listen(3001, () => {});

