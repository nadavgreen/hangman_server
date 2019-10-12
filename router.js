// External Modules
const express = require('express');

// Internal Mdoules
const {leaderboardRoutes, gameRoutes, usersRoutes} = require('./routes.js');

const routers = {};

routers.leaderboard = () => {
	const router = express.Router();
	router.get('/', leaderboardRoutes.read)
	return router;
};

routers.game = () => {
	const router = express.Router();
	router.post('/', gameRoutes.post)
	return router;
};

routers.users = () => {
	const router = express.Router();
	router.post('/', usersRoutes.create)
	router.get('/', usersRoutes.read)
	router.put('/', usersRoutes.update)
	return router;
};

module.exports = {
	routers,
}
