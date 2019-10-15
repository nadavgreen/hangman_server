class HangmanDB {
	static create(table, data) {
		const hangmanConnection = require('./db.js');
		const hangmanAddress = require('./config.js')

		const keys = Object.keys(data)
		const sql = keys.reduce((str, e, i) => {
			if(i !== keys.length - 1) return str += `${e}, ` 
			return str += `${e})` 
		}, `INSERT INTO ${table} (`)
		const sql2 = keys.reduce((str, e, i) => {
			if(i !== keys.length - 1) return str += `$[${e}], `
			return str += `$[${e}]) RETURNING *;`
		}, ' VALUES (')
		return hangmanConnection(hangmanAddress).any(sql+sql2, data)
	}

	static read(table, data) {
		const hangmanConnection = require('./db.js');
		const hangmanAddress = require('./config.js')

		const keys = Object.keys(data)
		const sql = keys.reduce((str, e, i) => {
			return str += `${e} = $[${e}];`
		}, `SELECT * FROM ${table} WHERE `)
		return hangmanConnection(hangmanAddress).any(sql, data)
	}

	static readAll(table, column, results) {
		const hangmanConnection = require('./db.js');
		const hangmanAddress = require('./config.js')

		const sql = `SELECT * FROM ${table} ORDER BY ${column} DESC NULLS LAST LIMIT ${results}`
		return hangmanConnection(hangmanAddress).any(sql)
	}

	static update(table, data, term) {
		const hangmanConnection = require('./db.js');
		const hangmanAddress = require('./config.js')

		const keys = Object.keys(data)
		let sql = keys.reduce((str, e, i) => {
			if(i !== keys.length - 1) return str += `${e} = $[${e}], `
			return str += `${e} = $[${e}] `
		}, `UPDATE ${table} SET `)
		const termKey = Object.keys(term)
		sql += `WHERE ${termKey[0]} = $[${termKey[0]}] RETURNING *;`
		data = {...data, ...term}
		return hangmanConnection(hangmanAddress).any(sql, data)
	}
}

module.exports = {HangmanDB}
