const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const locationController = require('./locations/locations.controller')
const usersController = require('./users/users.controller')
const passport = require('passport');
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
//routes
app.use(usersController)
app.use(locationController)

app.get("/", (req, res) => {
	return res.status(200).send("You should go to /users or /locations");
})
app.listen(port, async () => {
	await mongoose.connect(process.env.MONGO_URI)
	console.log("Connected")
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})

// Export the Express API
module.exports = app;
