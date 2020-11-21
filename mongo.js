const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const passwd = process.argv[2];

const url =
    `mongodb+srv://fullstack:${passwd}@cluster0.rzenx.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    Person.find({}).then(res => {
        console.log('phonebook:');
        res.forEach(person => {
            console.log(person);
        })
        mongoose.connection.close();
    })
} else {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(res => {
        console.log(`added ${name} number ${number} to the phonebook`);
        mongoose.connection.close();
    })
}