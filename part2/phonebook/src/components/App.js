import React, { useState, useEffect } from 'react';
import numberService from '../services/numbers';

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

const Book = ({ persons, search, setPersons }) => {
    const re = new RegExp(search, 'i');

    const handler = (person) => {
        if (window.confirm(`Delete ${person.name}`)) {
            numberService
                .deleteRecord(person.id)
                .then(() => {
                    setPersons(persons.filter(obj => obj.id !== person.id));
                })
        }
    }
    return (
        <ul>
            {persons.filter(per => re.test(per.name)).map(x => <li key={x.name}>
                {x.name} {x.number} <button onClick={() => handler(x)}>delete</button>
            </li>)}
        </ul>
    )
}

const App = () => {
    const [ persons, setPersons ] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ search, setSearch ] = useState('');

    const hook = () => {
        numberService
            .getAll()
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

        if (persons.some(obj => obj.name === newName)) {
            const personObj = persons.find(obj => obj.name === newName);
            const changedPerson = { ...personObj, number: newNumber };
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                numberService
                    .replaceNumber(changedPerson)
                    .then(res => {
                        setPersons(persons.map(per => per.id !== changedPerson.id ? per : res.data));
                    })
            }
        } else {
            const personObj = {
                name: newName,
                number: newNumber
            }
            numberService
                .newRecord(personObj)
                .then(res => {
                    setPersons(persons.concat(res.data));
                });
        }
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
            <Book persons={persons} search={search} setPersons={setPersons} />
        </div>
    )
}

export default App;