const { Schema, model } = require('mongoose')

const playerSchema = new Schema({
	/* About player */
	name: String,
	firstname: String,
	lastname: String,
	alias: String,
	card_identificacion: String,
	picture: String,
	birthday: Date,
	birthplace: String,
	nationality: String,
	club: String,
	club_start: Date,
	club_end: Date,
	club_previous: String,
	height: Number,
	weight: Number,
	date_recognition: Date,
	dorsal: Number,
	strong_leg: String,
	position: String,
	position_detail: String,
	position_second: String,
	position_demarcation: String,
	allergies: String,
	/* About player contact */
	street: String,
	number: Number,
	staircase: String,
	floor: String,
	block: String,
	door: String,
	postal_code: Number,
	town: String,
	province: String,
	phone: Number,
	phone_mobile: Number,
	email: String,
	/* About player family */
	siblings: Number,
	siblings_position: Number,
	father_name: String,
	father_email: String,
	father_mobile: Number,
	father_profession: String,
	mather_name: String,
	mather_email: String,
	mather_mobile: Number,
	mather_profession: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
})

playerSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		// returnedObject.birthday = returnedObject.birthday.toLocaleDateString()
		if (returnedObject.birthday) returnedObject.birthday = (returnedObject.birthday.toJSON()).split('T')[0]
		// returnedObject.birthday = (
		// 	returnedObject.birthday.getDate()
		// 	+ '-' + returnedObject.birthday.getMonth()
		// 	+ '-' + returnedObject.birthday.getFullYear()
		// )

		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Player = model('Player', playerSchema)

module.exports = Player