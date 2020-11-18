import React, { useState, useEffect } from 'react';
import numberService from './services/numbers';

import Filter from "./components/Filter";
import Form from "./components/Form";
import Book from "./components/Book";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
    const [ persons, setPersons ] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ search, setSearch ] = useState('');
    const [ notification, setNotification ] = useState(null);
    const [ error, setError ] = useState(null);

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
                        setNotification(`Changed ${personObj.name}'s number`);
                        setTimeout(() => {
                            setNotification(null);
                        }, 5000)
                    })
                    .catch(err => {
                        console.error(err);
                        setError(`Information of ${personObj.name} has already been removed from server`);
                        setTimeout(() => {
                            setError(null);
                        }, 5000);
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
                    setNotification(`Added ${personObj.name}`);
                    setTimeout(() => {
                        setNotification(null);
                    }, 5000);
                });
        }
        setNewName('');
        setNewNumber('');
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} />
            <Error message={error} />
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