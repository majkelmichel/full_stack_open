const express = require('express');

const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('tiny', {
    skip: (req) => { return req.method === 'POST' }
}));

morgan.token('body', (req) => {
    return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req) => { return req.method !== 'POST' }
}))

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

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        res.json(person)
    } else {
        res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
})

const generateId = () => {
    return Math.floor(Math.random() * 1000000);
}

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (body.name && body.number) {
        if (persons.some(per => per.name === body.name)) {
            return res.status(400).json({
                error: 'name must be unique'
            });
        }
        const person = {
            "name": body.name,
            "number": body.number,
            "id": generateId()
        }
        persons = persons.concat(person);
        res.json(person)
    } else if (!body.name) {
        return res.status(400).json({
            error: 'name not specified'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number not specified'
        })
    } else {
        res.status(400).end();
    }
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>${new Date()}`)
})

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is runnning on port ${PORT}`);
})