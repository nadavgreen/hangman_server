const {getApp} = require('./app.js')

getApp().listen(process.env.PORT || 3001, () => {
		console.log(`listening on port ${process.env.PORT || 3001}`)
})
