import React, { useState } from 'react'

const Book = ({ persons, search }) => {
    const re = new RegExp(search, 'i');
    return (
        <ul>
            {persons.filter(per => re.test(per.name)).map(x => <li key={x.name}>{x.name} {x.number}</li>)}
        </ul>
    )
}

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ search, setSearch ] = useState('');

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const addNewName = (e) => {
        e.preventDefault();
        const personObj = {
            name: newName,
            number: newNumber
        }
        if (persons.some(obj => obj.name === personObj.name)) {
            return alert(`${newName} is already added to the phonebook`)
        }
        setPersons(persons.concat(personObj));
        setNewName('');
        setNewNumber('');
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <span>Show filter</span><input value={search} onChange={handleSearchChange} />
            <h3>Add new record</h3>
            <form onSubmit={addNewName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <Book persons={persons} search={search} />
        </div>
    )
}

export default App;