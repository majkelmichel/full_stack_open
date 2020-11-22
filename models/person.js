const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})
	.then(() => {
		console.log('connection to MongoDB successful');
	})
	.catch(err => {
		console.log('failed to connect to MongoDB:', err);
	});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		unique: true,
	},
	number: {
		type: String,
		validate: {
			validator: (v) => {
				return v.match(/\d/g).length >= 8;
			},
			message: number => `'${number.value}' does not have at least 8 digits`,
		},
		required: true,
	},
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Person', personSchema);