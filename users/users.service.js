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
		if(await checkUserUnique(User.username)==true) {
			const hash = await bcrypt.hash(User.password, 10);
			User.password = hash;
            console.log(hash)
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

	if (await Users.findOne({username:username}))
	{return false}
	else{return true;}
}
async function MatchUser(username,pwd) {
	try {
		const user = await Users.findOne({username: username})
		const matchHash = await bcrypt.compare(pwd,user.password);
		return matchHash
	}
	catch (e){
		console.error(e)
		return null
	}
}

function findOneUser(id) {
	return Users.findById(id);
}
async function Delete(id) {
	await Users.deleteOne({ _id: id});
	return "Succes"
}
async function Patch(_id,body) {
	await Delete(_id)
	await Register(body)
	return Users.findOne({username:body.username})
}
async function createJWT(_id) {
	return jwt.sign({sub:_id}, process.env.JWT_SECRET);
}


module.exports.findAll = findAll
module.exports.findOneUser = findOneUser
module.exports.Register = Register
module.exports.Delete = Delete
module.exports.Patch = Patch
module.exports.createJWT= createJWT
module.exports.MatchUser= MatchUser


