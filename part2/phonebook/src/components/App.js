import React, { useState } from 'react'

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas' }
    ]);
    const [ newName, setNewName ] = useState('');

    const handleChange = (e) => {
        setNewName(e.target.value);
    }

    const addNewName = (e) => {
        e.preventDefault();
        const personObj = {
            name: newName
        }
        if (persons.some(obj => obj.name === personObj.name)) {
            return alert(`${newName} is already added to the phonebook`)
        }
        setPersons(persons.concat(personObj));
        setNewName('');
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNewName}>
                <div>
                    name: <input value={newName} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            ...
        </div>
    )
}

export default App;