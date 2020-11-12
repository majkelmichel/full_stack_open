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
    return (
        <div>
            <Part partName={props.parts[0]} exerciseCount={props.exercises[0]} />
            <Part partName={props.parts[1]} exerciseCount={props.exercises[1]} />
            <Part partName={props.parts[2]} exerciseCount={props.exercises[2]} />
        </div>
    )
}

const Total = (props) => {
    return (
        <p>
            Number of exercises {props.total}
        </p>
    )
}

const App = () => {
    const course = 'Half Stack application development';
    const part1 = 'Fundamentals of React';
    const exer1 = 10;
    const part2 = 'Using props to pass data';
    const exer2 = 7;
    const part3 = 'State of component';
    const exer3 = 14;
    return (
        <div>
            <Header header={course} />
            <Content parts={[part1, part2, part3]} exercises={[exer1, exer2, exer3]} />
            <Total total={exer1 + exer2 + exer3} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));