class HangmanDB {
	static hangmanConnection = require('./db.js');
	static hangmanAddress = require('./config.js')

	static create(table, data) {
		const keys = Object.keys(data)
		const sql = keys.reduce((str, e, i) => {
			if(i !== keys.length - 1) return str += `${e}, ` 
			return str += `${e})` 
		}, `INSERT INTO ${table} (`)
		const sql2 = keys.reduce((str, e, i) => {
			if(i !== keys.length - 1) return str += `$[${e}], `
			return str += `$[${e}])`
		}, ' VALUES (')
		return HangmanDB.hangmanConnection(HangmanDB.hangmanAddress).none(sql+sql2, data)
	}

	static read(table, data) {
		const keys = Object.keys(data)
		const sql = keys.reduce((str, e, i) => {
			return str += `${e} = $[${e}];`
		}, `SELECT * FROM ${table} WHERE `)
		return HangmanDB.hangmanConnection(HangmanDB.hangmanAddress).any(sql, data)
	}

	static readAll(table, column, results) {
		const sql = `SELECT * FROM ${table} ORDER BY ${column} DESC NULLS LAST LIMIT ${results}`
		return HangmanDB.hangmanConnection(HangmanDB.hangmanAddress).any(sql)
	}

	static update(table, data, term) {
		const keys = Object.keys(data)
		let sql = keys.reduce((str, e, i) => {
			if(i !== keys.length - 1) return str += `${e} = $[${e}], `
			return str += `${e} = $[${e}] `
		}, `UPDATE ${table} SET `)
		const termKey = Object.keys(term)
		sql += `WHERE ${termKey[0]} = $[${termKey[0]}]`
		data = {...data, ...term}
		return HangmanDB.hangmanConnection(HangmanDB.hangmanAddress).none(sql, data)
	}
}

module.exports = {HangmanDB}
