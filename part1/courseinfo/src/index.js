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

const Content = (props) => {
    const [part1, part2, part3] = props.parts;
    return (
        <div>
            <Part partName={part1.name} exerciseCount={part1.exercises} />
            <Part partName={part2.name} exerciseCount={part2.exercises} />
            <Part partName={part3.name} exerciseCount={part3.exercises} />
        </div>
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

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header header={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));