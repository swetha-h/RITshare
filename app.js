var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const bodyParser = require('body-parser');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET =
	'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

mongoose.connect(
	process.env.DB_HOST,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) throw err;
		console.log('Connected');
	}
);

var indexRouter = require('./routes/index');
var pingRouter = require('./routes/ping');
var clubsRouter = require('./routes/clubs');
var eventsRouter = require('./routes/events');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.use('/ping', pingRouter);
app.use('/clubs', clubsRouter);
app.use('/events', eventsRouter);

app.use(bodyParser.json());

app.post('/api/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body;

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' });
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		});
	}

	try {
		const user = jwt.verify(token, JWT_SECRET);

		const _id = user.id;

		const password = await bcrypt.hash(plainTextPassword, 10);

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		);
		res.json({ status: 'ok' });
	} catch (error) {
		console.log(error);
		res.json({ status: 'error', error: ';))' });
	}
});

//login
app.post('/api/login', async (req, res) => {
	const { usn, password } = req.body;
	const user = await User.findOne({ usn }).lean();

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid usn/password' });
	}

	if (await bcrypt.compare(password, user.password)) {
		const token = jwt.sign(
			{
				id: user._id,
				usn: user.usn
			},
			JWT_SECRET
		);

		return res.json({ status: 'ok', data: token });
	}

	res.json({ status: 'error', error: 'Invalid username/password' });
});

//signup
app.post('/api/register', async (req, res) => {
	const { usn, username, password: plainTextPassword } = req.body;

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' });
	}

	if (!usn || typeof usn !== 'string' || usn.length != 10) {
		return res.json({ status: 'error', error: 'Invalid usn' });
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' });
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		});
	}

	const password = await bcrypt.hash(plainTextPassword, 10);

	try {
		const response = await User.create({
			usn,
			username,
			password
		});
		console.log('User created successfully: ', response);
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'USN already in use' });
		}
		throw error;
	}

	res.json({ status: 'ok' });
});

module.exports = app;
