const router = require('express').Router()
const usersService = require('./users.service')
const passportJWT = require('../PassportStrategies/jwtStategy');
const passportLocal = require('../PassportStrategies/LocalStrategy');
const RoleMiddleWare = require('../RoleMiddleware')

// default /users route
router.get('/users',passportJWT.authenticate('jwt', {session:false}),RoleMiddleWare.roleMiddleware(['admin']),async (req, res) => {
	return res.status(200).send({users: await usersService.findAll()})
})

// auth /users routes
router.post('/users/login',passportLocal.authenticate('local', {session: false}), async (req, res) => {
	console.log(req.body)
	const token = await usersService.createJWT(req.user._id)
	return res.status(200).send({token})
})
router.post('/users/register', async (req, res) => {
	console.log(req.body)
	const user = await usersService.Register(req.body)
	if(user){return res.status(200).send(user)}
	else { return  res.status(404).send("Something Went Wrong ?")
	}

})
// routes /me
router.use('/users/me',passportJWT.authenticate('jwt', {session:false}));
router.patch('/users/me', async (req, res) => {
	console.log(req.body)
	return res.status(200).send({users: await usersService.Patch(req.user._id,req.body) })
})
router.delete('/users/me', async (req, res) => {
	return res.status(200).send(await usersService.Delete(req.user._id))
})
router.get('/users/me', async (req, res) => {
	return res.status(200).send({users: await usersService.findOneUser(req.user._id)})
})

module.exports = router
