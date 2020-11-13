import React from 'react';

const Header = (props) => {
    return (
        <h2>
            {props.header}
        </h2>
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
        <h4>
            Total number of exercises: {total}
        </h4>
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

export default Course;