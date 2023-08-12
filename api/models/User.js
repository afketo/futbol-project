const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
	email: {
		type: String,
		unique: true
	},
	name: String,
	firstname: String,
	lastname: String,
	card_identificacion: String,
	phone_mobile: Number,
	nationality: String,
	town: String,
	postal_code: Number,
	province: String,
	street: String,
	passwordHash: String,
	players: [{
		type: Schema.Types.ObjectId,
		ref: 'Player'
	}]
})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id

		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})

const User = model('User', userSchema)

module.exports = User