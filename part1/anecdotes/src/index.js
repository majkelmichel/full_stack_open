import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handler }) => {
    return (
        <button onClick={handler}>{text}</button>
    )
}

const Votes = ({ value }) => {
    return (
        <p>this anecdote has {value} votes</p>
    )
}

const Anecdote = ({ text, votes }) => {
    return (
        <div>
            <p>{text}</p>
            <Votes value={votes} />
        </div>
    )
}

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [anecdoteList, setVotes] = useState(anecdotes.map(x => {
        return {
            anecdote: x,
            votes: 0
        }
    }));
    const getNewAnecdote = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length));
    }

    const vote = () => {
        let arr = [...anecdoteList];
        let item = {...arr[selected]};
        item.votes++;
        arr[selected] = item;
        setVotes(arr);
    }

    return (
        <div>
            <Anecdote text={anecdoteList[selected].anecdote} votes={anecdoteList[selected].votes} />
            <Button text='new anecdote' handler={getNewAnecdote} />
            <Button text='vote' handler={vote} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)