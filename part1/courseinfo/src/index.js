import React from 'react';
import ReactDOM from 'react-dom';




  /////// Locating values within an array, which is then located inside of a Javascript object://////
  // console.log(course.parts[0].name);
  // console.log(course.parts[0].exercises);
 

  const Header = ({ course }) => {
    console.log({ course })
    return <h1>{course}</h1>
  }

  const Part = ({ part, exercises }) => {
    return (
        <p>{part} {exercises}</p>
    )
  }


  const Content = ({ parts }) => {
    return ( 
       <div>
           {parts.map((lesson, key) => (
             <Part
                part={lesson.name}  
                exercises={lesson.exercises}
                key={lesson.key}
            />
           ))}
     </div>
           
          )
     }

    
  




  const Total = ({ parts }) => {

    return (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p> 
    )
  }

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        key: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        key: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        key: 3
      }
    ]
  }
  
  return (
    <div>
      <Header course= {course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))