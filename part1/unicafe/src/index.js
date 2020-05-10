import React, { useState } from "react";
import ReactDOM from "react-dom";

const Titles = ({ text }) => <h1>{text}</h1>; 

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, all, avgFeedbackFixed, avgPositive }) => {
  if (all === 0)
  return ( 
  <p>No feedback given</p>
  )
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={avgFeedbackFixed} />
        <Statistic text="positive" value={avgPositive} />
      </tbody>
    </table>
  );
}



const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
  )





const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [score, setScore] = useState([]);

///// Calculate average of percentage of positive feedback ///////
  const avgPositive = (good / all * 100).toFixed(1) + " % ";

///// Calculate average score of collected feedback ////////

  const avgFeedback = score.reduce((acc, score) => acc + score, 0) / score.length;
    const avgFeedbackFixed = avgFeedback.toFixed(2);
        

  
  
    
  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setScore(score.concat(1))
  }
   
 
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setScore(score.concat(0))
}

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setScore(score.concat(-1))
  }




  return (
    <div>
      <Titles text="give feedback" />

      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />

      <Titles text="statistics" />
      <Statistics 
      good={good}
      neutral={neutral}
       bad={bad}
       all={all} 
       avgFeedbackFixed={avgFeedbackFixed} 
       avgPositive={avgPositive}
       />
    </div>
  );
}




ReactDOM.render(<App />, 
  document.getElementById('root')
)