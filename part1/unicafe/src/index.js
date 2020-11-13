import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handler}) => {
    return (
        <button onClick={handler}>{text}</button>
    )

}

const Statistic = ({text, value}) => {
    return (
        <p>{text} {value}</p>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad;
    if (all === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <div>
            <h1>Statistics</h1>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={all} />
            <Statistic text='average' value={(good - bad) / all || 0} />
            <Statistic text='positive' value={`${good / all * 100 || 0} %`} />
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