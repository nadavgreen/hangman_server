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
	const {name, guess, guesses} = req.body;
	const data  = {
		'guess': guess,
		'guesses': guesses,
	}

	HangmanDB.read('users', {"name": name})
	.then(result => {
		return result[0].current_word;
	})
	.then(word => {
		data['random_word'] = word;
		console.log(data)

		return axios({
			'method': 'post',
			'url': 'https://hangman-microservice.herokuapp.com//',
			'data': data
		})
	})
	.then(result => {
		const {msg} = result.data;
		msg.random_word = msg.random_word.length;

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
	const name = req.params;

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
		const wordObj = {
			'current_word': result.data,
		}
		
		return HangmanDB.update('users', wordObj, name)
	})
	.then(result => {
		res.json({"msg":"user word updated"});
	})
	.catch(err => {
		cosnole.log(err)
		res.json({"msg": "Please see docs"})
	})
}

const usersRoutes = {};

usersRoutes.create = (req, res) => {
	HangmanDB.read('users', req.body)
	.then(result => {
		if (!result.length) return HangmanDB.create('users', req.body)
		else return result
	})
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
		res.json(result)
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
