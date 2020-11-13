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
        <p>
            {props.partName} {props.exerciseCount}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} partName={part.name} exerciseCount={part.exercises} />)}
        </div>
    )
}

const Total = ({ parts }) => {

    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <p>
            Total number of exercises: {total}
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