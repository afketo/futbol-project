const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')
const getTokenExtractUser = require('../middleware/getTokenExtractUser')

loginRouter.post('/', async (req, res) => {
	const { body } = req
	const { username, password } = body

	const user = await User.findOne({ username })

	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		res.status(401).json({
			error: 'invalid username or password'
		})
		return
	}

	const userForToken = {		
		id: user._id,
		username: user.username
	}

	const access_token = jwt.sign(userForToken, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 })

	res.send({
		name: user.name,
		username: user.username,
		access_token
	})
})

loginRouter.get('/', getTokenExtractUser, async (req, res) => {
	res.send()
})

module.exports = loginRouter