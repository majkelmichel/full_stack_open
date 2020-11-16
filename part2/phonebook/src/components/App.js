import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ search, handleChange }) => {
    return (
        <>
        <span>Show filter</span><input value={search} onChange={handleChange} />
        </>
    )
}

const Form = ({ submitHandle, name, handleName, number, handleNumber }) => {
    return (
        <form onSubmit={submitHandle}>
            <div>
                name: <input value={name} onChange={handleName} />
            </div>
            <div>
                number: <input value={number} onChange={handleNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Book = ({ persons, search }) => {
    const re = new RegExp(search, 'i');
    return (
        <ul>
            {persons.filter(per => re.test(per.name)).map(x => <li key={x.name}>{x.name} {x.number}</li>)}
        </ul>
    )
}

const App = () => {
    const [ persons, setPersons ] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ search, setSearch ] = useState('');

    const hook = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(res => {
                setPersons(res.data);
            });
    }
    
    useEffect(hook, []);

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
            <Filter search={search} handleChange={handleSearchChange} />

            <h3>Add new record</h3>
            <Form
                submitHandle={addNewName}
                name={newName}
                handleName={handleNameChange}
                number={newNumber}
                handleNumber={handleNumberChange}
            />

            <h2>Numbers</h2>
            <Book persons={persons} search={search} />
        </div>
    )
}

export default App;