// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const usersService = require('./users.service')

router.get('/users', async (req, res) => {
	return res.status(200).send({users: await usersService.findAll()})
})
router.get('/locations/me', async (req, res) => {
	return res.status(200).send({users: await usersService.findOne(req.params.id)})
})
router.post('/users/login', async (req, res) => {
	console.log(req.body)
	return res.status(200).send({users: await usersService.Create(req.body) })
})
router.post('/users/register', async (req, res) => {
	console.log(req.body)
	return res.status(200).send({users: await usersService.Register(req.body) })
})
router.patch('/users/me', async (req, res) => {
	console.log(req.body)
	return res.status(200).send({users: await usersService.Patch(req.body) })
})
router.delete('/users/me', async (req, res) => {
	return res.status(200).send(await usersService.Delete(req.params.id))
})


module.exports = router
