const playersRouter = require('express').Router()
const multer = require('multer')
const { uuid } = require('uuidv4')

const Player = require('../models/Player')
const User = require('../models/User')
const getTokenExtractUser = require('../middleware/getTokenExtractUser')

// playersRouter.get('/', (req, res) => {
// 	Player.find()
// 		.then(players => {
// 			res.json(players)
// 		})
// })

playersRouter.get('/', getTokenExtractUser, async (req, res) => {
	const players = await Player.find({}).populate('user', {
		username: 1,
		name: 1,
	})
	res.json(players)
})

// playersRouter.get('/:id', (req, res, next) => {
// 	const {id} = req.params
// 	// const player = players.find(player => player.id === id)

// 	Player.findById(id)
// 		.then(player => {
// 			player
// 				? res.json(player)
// 				: res.status(404).send({
// 					error: 'id not found'
// 				})
// 		})
// 		.catch(next)
// })

playersRouter.get('/:id', async (req, res, next) => {
	const { id } = req.params

	try {
		const player = await Player.findById(id)
		player ? res.send(player) : res.status(404).end()
	} catch (err) {
		next(err)
	}
})

// playersRouter.delete('/:id', (req, res, next) => {
// 	const {id} = req.params
// 	// players = players.filter(player => player.id !== id)

// 	Player.findByIdAndDelete(id)
// 		.then(() => {
// 			res.status(204).end()
// 		})
// 		.catch(next)
// })

playersRouter.delete('/:id', async (req, res, next) => {
	const { id } = req.params

	try {
		const player = await Player.findByIdAndDelete(id)
		player ? res.status(204).end() : res.status(404).end()
	} catch (err) {
		next(err)
	}
})

// playersRouter.put('/:id', (req, res, next) => {
// 	const {id} = req.params
// 	const player = req.body

// 	// Check for body content
// 	if (Object.keys(player).length === 0)
// 		return res.status(400).json({error: 'Body not valid'})

// 	const newNoteUpdate = {
// 		name: player.name,
// 		position: player.position,
// 		birthday: player.birthday
// 	}

// 	Player.findByIdAndUpdate(id, newNoteUpdate, { new: true })
// 		.then( result => {
// 			res.status(200).json(result)
// 		})
// 		.catch(next)
// })

playersRouter.put('/:id', getTokenExtractUser, async (req, res, next) => {
	const { id } = req.params
	const player = req.body

	// Check for body content
	if (Object.keys(player).length === 0)
		return res.status(400).json({ error: 'Body not valid' })

	try {
		const playerUpdated = await Player.findByIdAndUpdate(id, player, {
			new: true,
		})
		playerUpdated ? res.json(playerUpdated) : res.status(404).end()
	} catch (err) {
		next(err)
	}
})

// ! UPLOAD IMAGE
const DIR = './public/images/'
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR)
	},
	filename: (req, file, cb) => {
		// const filename = file.originalname.toLowerCase().split(' ').join('_')
		const filename = uuid() + '.' + file.mimetype.split('/')[1]
		cb(null, filename)
	},
})
var upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype == 'image/png' ||
			file.mimetype == 'image/jpg' ||
			file.mimetype == 'image/jpeg'
		) {
			cb(null, true)
		} else {
			cb(null, false)
			return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
		}
	},
})

playersRouter.post('/player_picture', upload.single('image'), async  (req, res, next) => {
	const { id } = req.body
	const { filename } = req.file

	// Check for body content
	if (!id || id === undefined || id === null)
		return res.status(400).json({ error: 'Body not valid' })

	try {
		const playerUpdated = await Player.findByIdAndUpdate(id, {picture: filename}, {
			new: true,
		})
		playerUpdated ? res.json(playerUpdated) : res.status(404).end()
	} catch (err) {
		next(err)
	}
})
// ! UPLOAD IMAGE

playersRouter.post('/', getTokenExtractUser, async (req, res, next) => {
	try {
		const { userId } = req
		const { 
			name, 
			firstname,
			lastname,
			alias,
			card_identificacion,
			picture,
			birthday,
			birthplace,
			nationality,
			club,
			club_start,
			club_end,
			club_previous, 
		} = req.body

		const user = await User.findById(userId)

		if (!name) {
			return res.status(400).json({
				error: 'player body missing',
			})
		}

		const newPlayer = new Player({
			name, 
			firstname,
			lastname,
			alias,
			card_identificacion,
			picture,
			birthday,
			birthplace,
			nationality,
			club,
			club_start,
			club_end,
			club_previous,
			user: user._id,
		})

		newPlayer.save().then((savedPlayer) => {
			user.players = user.players.concat(savedPlayer._id) // Al usuario que hemos recuperado, le agregamos la ID del jugador
			user.save().then(res.status(201).json(savedPlayer))
		})

		// const savedPlayer = await newPlayer.save()
		// res.status(201).json(savedPlayer)
	} catch (err) {
		next(err)
	}
})

module.exports = playersRouter
