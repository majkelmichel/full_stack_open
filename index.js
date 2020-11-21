require('dotenv').config();

const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

// MIDDLEWARE

app.use(cors());

app.use(express.json());
app.use(morgan('tiny', {
    skip: (req) => { return req.method === 'POST' }
}));

morgan.token('body', (req) => {
    return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req) => { return req.method !== 'POST' }
}));

app.use(express.static('build'));


let persons = [
    {
        "name": "Arto Hellas",
        "number": "2130-431202-1",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

// ROUTES

app.get('/api/persons', (req, res) => {
    Person.find({}).then(notes => {
        res.json(notes);
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            res.json(person);
        })
        .catch(err => {
            res.status(404).end();
        })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.deleteOne({ "_id": req.params.id })
        .then(() => {
            res.status(204).end();
        })
})

const generateId = () => {
    return Math.floor(Math.random() * 1000000);
}

app.post('/api/persons', (req, res) => {
    const body = req.body;
    // if (body.name && body.number) {
    //     if (persons.some(per => per.name === body.name)) {
    //         return res.status(400).json({
    //             error: 'name must be unique'
    //         });
    //     }
    //     const person = {
    //         "name": body.name,
    //         "number": body.number,
    //         "id": generateId()
    //     }
    //     persons = persons.concat(person);
    //     res.json(person)
    // } else if (!body.name) {
    //     return res.status(400).json({
    //         error: 'name not specified'
    //     })
    // } else if (!body.number) {
    //     return res.status(400).json({
    //         error: 'number not specified'
    //     })
    // } else {
    //     res.status(400).end();
    // }
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson);
    })
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>${new Date()}`)
})

// LISTENER

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})