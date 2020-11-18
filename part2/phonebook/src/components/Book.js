import numberService from "../services/numbers";
import React from "react";

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

export default Book;