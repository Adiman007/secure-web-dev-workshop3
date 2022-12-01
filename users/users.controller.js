const router = require('express').Router()
const usersService = require('./users.service')
const passport = require('../PassportStrategies/LocalStrategy');

router.get('/users', async (req, res) => {
	return res.status(200).send({users: await usersService.findAll()})
})
router.get('/users/me', async (req, res) => {
	return res.status(200).send({users: await usersService.findOne(req.params.id)})
})
router.post('/users/login', async (req, res) => {
	console.log(req.body)
	const token = await usersService.generateJWT(req.body.username)
	return res.status(200).send({token})
})
router.post('/users/register', async (req, res) => {
	console.log(req.body)
	const user = await usersService.Register(req.body)
	if(user){return res.status(200).send(user)}
	else { return  res.status(404).send("Something Went Wrong ?")
	}

})
router.patch('/users/me', async (req, res) => {
	console.log(req.body)
	return res.status(200).send({users: await usersService.Patch(req.body) })
})
router.delete('/users/me', async (req, res) => {
	return res.status(200).send(await usersService.Delete(req.params.id))
})


module.exports = router
