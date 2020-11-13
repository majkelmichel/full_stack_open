import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
    return (
        <h1>
            {props.header}
        </h1>
    )
}

const Part = (props) => {
    return (
        <li>
            {props.partName} {props.exerciseCount}
        </li>
    )
}

const Content = ({ parts }) => {
    return (
        <ul>
            {parts.map(part => <Part key={part.id} partName={part.name} exerciseCount={part.exercises} />)}
        </ul>
    )
}

const Total = (props) => {
    let total = 0;
    props.parts.forEach(x => {
        total += x.exercises
    });

    return (
        <p>
            Number of exercises {total}
        </p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header header={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'));