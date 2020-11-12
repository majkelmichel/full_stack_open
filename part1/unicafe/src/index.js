import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handler}) => {
    return (
        <button onClick={handler}>{text}</button>
    )

}

const Statistics = ({good, neutral, bad}) => {
    return (
        <div>
            <h1>Statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral ,setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const voteGood = () => {
        setGood(good + 1);
    }
    const voteNeutral = () => {
        setNeutral(neutral + 1);
    }
    const voteBad = () => {
        setBad(bad + 1);
    }

    return (
        <div>
            <h1>Give feedback</h1>
            <Button text='good' handler={voteGood} />
            <Button text='neutral' handler={voteNeutral} />
            <Button text='bad' handler={voteBad} />
            <Statistics good={good} bad={bad} neutral={neutral} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)