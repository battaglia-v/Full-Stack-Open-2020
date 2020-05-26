import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'

const promise = axios.get("http://localhost:3001/persons");

promise.then((response) => {
  console.log(response);
});

ReactDOM.render(<App />,document.getElementById('root')
);

