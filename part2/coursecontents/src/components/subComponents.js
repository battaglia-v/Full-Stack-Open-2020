import React from 'react';


const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    )
}


const Total = ({ course }) => {
    const totalExercises = course.parts
    const total = totalExercises.reduce((s, p) =>
        s + p.exercises, 0)
    return <p key={totalExercises.length}>Number of exercises {total}</p>
}


const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    const courseParts = course.parts
    return (
        <div>
            {courseParts.map((part) =>
                <Part key={courseParts.id}
                    part={part} />
            )}
        </div>
    )
}     

export {
    Header,
    Total,
    Content
}