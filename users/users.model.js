const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username:{type: String,
		unique: true
	},
	password: String,
	role:String
})

const Users = mongoose.model('Users', userSchema)

module.exports = Users
