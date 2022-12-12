// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')
const passportJWT = require('../PassportStrategies/jwtStategy');

// use jwt
router.use('/locations', passportJWT.authenticate('jwt', { session: false }));
router.use('/locations/:id', passportJWT.authenticate('jwt', { session: false }));

// routes /locations
router.get('/locations/', async (req, res) => {
	return res.status(200).send({locations: await locationsService.findAll()})
})
router.post('/locations/', async (req, res) => {
	console.log(req.body)
	return res.status(200).send({location: await locationsService.Create(req.body) })
})

// routes /locations/:id
router.get('/locations/:id', async (req, res) => {
	return res.status(200).send({location: await locationsService.findOne(req.params.id)})
})
router.delete('/locations/:id', async (req, res) => {
	return res.status(200).send(await locationsService.Delete(req.params.id))
})
router.patch('/locations/', async (req, res) => {
	console.log(req.body)
	return res.status(200).send({location: await locationsService.Patch(req.body) })
})

module.exports = router
