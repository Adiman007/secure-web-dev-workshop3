// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return Location.find({}).limit(10).lean()

}
async function Create(body) {
	const location = new Location(body)
	await location.save()
	return location
}
function findOne(id) {
	return Location.findById(id);
}
async function Delete(item) {
	await Location.deleteOne({ _id: item});
	return { msg : "OK"}
}
async function Patch(id,body) {
	console.log(id)
	console.log(body)
	const location = await findOne(id);
	for (const locationElementKey in body) {
		if (
			locationElementKey[0] !== "_" &&
			body.hasOwnProperty(locationElementKey)
		) {
			location[locationElementKey] = body[locationElementKey];
		}
	}
	await location.save();
	return await findOne(id);
}

module.exports.findAll = findAll
module.exports.findOne = findOne
module.exports.Create = Create
module.exports.Delete = Delete
module.exports.Patch = Patch

