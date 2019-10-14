// External Modules
const express = require('express');

// Internal Mdoules
const {leaderboardRoutes, gameRoutes, randomWordRoutes, usersRoutes} = require('./routes.js');

const routers = {};

routers.leaderboard = () => {
	const router = express.Router();
	router.get('/:column/:results', leaderboardRoutes.read)
	return router;
};

routers.game = () => {
	const router = express.Router();
	router.post('/', gameRoutes.post)
	return router;
};

routers.randomWord = () => {
	const router = express.Router();
	router.get('/', randomWordRoutes.read);
	return router;
};

routers.users = () => {
	const router = express.Router();
	router.post('/', usersRoutes.create)
	router.put('/', usersRoutes.update)
	return router;
};

module.exports = {
	routers,
}
