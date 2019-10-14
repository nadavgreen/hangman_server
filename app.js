const {routers} = require('./router.js');

const getApp = () => {
	const app = require('express')();
	app.use(require('body-parser').json());
	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin" , "*");
		//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		//res.header("Access-Control-Allow-Methods", "PUT, DELETE")
		next()
	});

	app.use('/leaderboard', routers.leaderboard())
	app.use('/game', routers.game());
	app.use('/randomWord', routers.randomWord());
	app.use('/users', routers.users());

	app.get('/', (req, res) => {
		res.json({"msg": "Welcome to hangman server"})
	});

	app.get('/ping', (req, res) => {
		res.json({"msg": "pong"})
	});

	return app;
};

module.exports = {
	getApp,
}
