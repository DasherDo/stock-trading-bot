var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

var stockRouter = require('./routes/stocks');
let userRouter = require('./routes/userRoutes');

var app = express();

const URI = process.env.MONGO_URL;

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/stocks', stockRouter);
app.use('/user', userRouter);

const server = app.listen(5000, () => {
	console.log('Server started on Port 5000');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ error: err });
});

mongoose
	.connect(URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log('DB Connection Successful'))
	.catch((err) => {
		console.log(`Database Connection Error: ${err}`);
	});

module.exports = app;
