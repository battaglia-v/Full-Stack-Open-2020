import React from 'react';
import {Header, Content, Total} from './subComponents'


const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>

    )
}

export default Course