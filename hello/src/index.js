import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';

let i = parseInt(Math.random() * 3);

const food = [
	'breakfast: porridge',
	'lunch: vegetables',
	'dinner: noodles'
];

const pic = [
	'http://recipe1.hoto.cn/pic/recipe/l/03/0a/264707_62607c.jpg',
	'http://s2.cdn.xiachufang.com/0c51ac5e873211e6a9a10242ac110002_690w_458h.jpg?imageView2/2/w/620/interlace/1/q/90',
	'http://img.zuofan.cn/thumb/f/40/99/409945be6e70f0a2f746940226cc8464.png'
];

function eat() {
	let temp = <li>{food[i]}</li>;
	return temp;
}

function selectPic() {
	return pic[i]
}

const myPic = {
	width: 300,
	height: 'auto',
	marginLeft: 100
}

const element = (
	<div>
		<h1>What do we eat tomorrow?</h1>
		<img src={selectPic()} style={myPic} />
		<ul>
			{eat()}
		</ul>
	</div>
)

ReactDOM.render(
  element,
  document.getElementById('root')
);
