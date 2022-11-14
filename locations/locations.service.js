// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return Location.find({}).limit(10).lean()

}
async function Create(loca) {
	const premierLocation = new Location({filmType: 'Horror'})
	await premierLocation.save()
	return "Succes"
}
function findOne (id) {
	return Location.findById(id).exec();

}
module.exports.findAll = findAll
