// External Modules
const axios = require('axios');

// Internal Modules
const {HangmanDB} = require('./services.js');

//Routes
const leaderboardRoutes = {};

leaderboardRoutes.read = (req, res) => {
	const {column, results} = req.params;

	HangmanDB.readAll('users', column, results)
	.then(data => {
		res.json(data)
	})
	.catch(err => {
		console.log(err);
		res.json({"msg": "Please see docs"})
	});
};

const gameRoutes = {};

gameRoutes.post = (req, res) => {
	const data  = {
		'guess': 'aple',
		'guesses': [],
		'random_word': 'apple'
	}
	axios({
		'method': 'post',
		'url': 'https://hangman-microservice.herokuapp.com//',
		'data': data
	})
	.then(result => {
		const {msg} = result.data;
		res.json(msg);	
	})
	.catch(err => {
		console.log(err)
		res.json({"msg": "Please see docs"})
	})
};

const randomWordRoutes = {};

randomWordRoutes.read = (req, res) => {
	const {randomInt} = require('./utils.js')
	const args = req.query;

	if (args.difficulty) args.difficulty = parseInt(args.difficulty)
	else args.difficulty = randomInt(1,10);
	args.count = 1;
	let max = 0;

	switch (args.difficulty){
		case 10:
			max = 16244;
			break;
		default:
			max = 16240
			break;
	}

	args.start = randomInt(0, max);
	if (args.minLength < 0) args.minLength = 0;
	if (args.maxLength < 3) args.maxLength = 3;
	if (args.maxLength <= args.minLength) args.maxLength = args.minLength + 1;

	axios({
		'method': 'get',
		'url': 'http://app.linkedin-reach.io/words?',
		'params': args
	})
	.then(result => {
		const {data} = result
		res.json({data});
	})
	.catch(err => {
		cosnole.log(err)
		res.json({"msg": "Please see docs"})
	})
}

const usersRoutes = {};

usersRoutes.create = (req, res) => {
	HangmanDB.create('users', req.body)
	.then(result => {
		res.json({"msg": "new user created"})
	})
	.catch(err => {
		console.log(err)
		res.json({"msg": "Please see docs"})
	})
};

usersRoutes.read = (req, res) => {
	HangmanDB.read('users', req.params)
	.then(result => {
		res.json(result)
	})
	.catch(err => {
		console.log(err)
		res.json({"msg": "Please see docs"})
	})
};

usersRoutes.update = (req, res) => {
	const {data, term} = req.body;

	HangmanDB.update('users', data, term)
	.then(result => {
		res.json({"msg":"user updated"})
	})
	.catch(err => {
		console.log(err)
		res.json({"msg": "Please see docs"})
	})
};

module.exports = {
	leaderboardRoutes,
	gameRoutes,
	randomWordRoutes,
	usersRoutes
}
