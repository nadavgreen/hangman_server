const axios = require('axios');

const leaderboardRoutes = {};

leaderboardRoutes.read = (req, res) => {

};

const gameRoutes = {};

gameRoutes.post = (req, res) => {
	const data  = {
		guess: 'aple',
		guesses: [],
		random_word: 'apple'
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
		res.json("somethings is wrong")
	})
};

const usersRoutes = {};

usersRoutes.create = (req, res) => {

};

usersRoutes.read = (req, res) => {

};

usersRoutes.update = (req, res) => {

};

module.exports = {
	leaderboardRoutes,
	gameRoutes,
	usersRoutes
}
