// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')

router.get('/locations/get', async (req, res) => {
	return res.status(200).send({locations: await locationsService.findAll()})
})
router.get('/locations/get/:id', async (req, res) => {
	return res.status(200).send({locations: await locationsService.findOne(id)})
})
router.post('/locations/post', async (req, res) => {
	return res.status(200).send({locations: await locationsService.findOne(id)})
})



module.exports = router
