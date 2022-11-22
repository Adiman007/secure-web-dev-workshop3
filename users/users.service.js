// This file holds the Business-Logic layer, interacting with Data Layer

const Users = require("./users.model");
const bcrypt = require("bcrypt")
const Console = require("console");

function findAll(){
	return Users.find({}).limit(10)
}
async function Register(body) {
	const User = new Users(body)
	if (await Users.find({},{username:User.username})) {return "user not unique"}
	else {
		User.password=bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(User.password, salt, function(err, hash) {
				// Store hash in the database
			});
		})
		await User.save()
		return User.username
	}
}
function findOne(id) {
	return Location.findById(id);
}
async function Delete(item) {
	await Location.deleteOne({ _id: item});
	return "Succes"
}
async function Patch(body) {
	await Location.findByIdAndUpdate({ _id: body._id},body);
	return findOne(body._id)
}

module.exports.findAll = findAll
module.exports.findOne = findOne
module.exports.Register = Register
module.exports.Delete = Delete
module.exports.Patch = Patch

