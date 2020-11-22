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

const errorHandler = (err, req, res, next) => {
    console.log(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ "error": "wrong id format" });
    }

    next(err);
}


// ROUTES

app.get('/api/persons', (req, res) => {
    Person.find({}).then(notes => {
        res.json(notes);
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            res.json(person);
        })
        .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res) => {
    Person.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson);
        })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
})

app.use(errorHandler);

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
    Person.find({})
        .then(results => {
            res.send(`<p>Phonebook has info for ${results.length} people</p>${new Date()}`)
        })
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ "error": "unknown endpoint" });
}
app.use(unknownEndpoint);

// LISTENER

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})