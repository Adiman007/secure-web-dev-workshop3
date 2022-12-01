const Users = require("./users.model");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
require('dotenv').config()

function findAll(){
	return Users.find({}).select("username");
}
async function Register(body) {
	try {
		if (body === null){return "Bad Request"}
		const User = new Users(body)
		if(checkUserUnique(User.username)===true) {
			const hash = await bcrypt.hash(User.password, 10);
			User.password = hash;
			await User.save();
			return User;
		}
		else{
			return (null)
		}
	}
	catch (e){
		console.log("User couldn't be create")
		console.error(e);
	}
}
async function checkUserUnique(username) {
	if (await Users.find({},{username}===true))
	{return false}
	else{return true;}
}
async function MatchUser(body) {
	const user = await Users.find({},{username:body.username})
	return await bcrypt.compare(body.password,user.password)
}

function findOne(id) {
	return Users.findById(id);
}
async function Delete(item) {
	await Users.deleteOne({ _id: item});
	return "Succes"
}
async function Patch(body) {
	await Users.findByIdAndUpdate({ _id: body._id},body);
	return findOne(body._id)
}
async function createJWT(username) {
	return jwt.sign({sub:username}, process.env.JWT_SECRET);
}


module.exports.findAll = findAll
module.exports.findOne = findOne
module.exports.Register = Register
module.exports.Delete = Delete
module.exports.Patch = Patch
module.exports.createJWT= createJWT
module.exports.MatchUser= MatchUser


