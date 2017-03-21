import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';
const food = [
	'breakfast: porridge',
	'lunch: vegetables',
	'dinner: noodles'
]

function eat() {
	let i = parseInt(Math.random() * 3);
	let temp = <li>{food[i]}</li>;
	return temp;
}
const element = (
	<div>
		<h1>What do we eat tomorrow?</h1>
		<ul>
			{eat()}
		</ul>
	</div>
)

ReactDOM.render(
  element,
  document.getElementById('root')
);
