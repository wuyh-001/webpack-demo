import txt from './1.txt';
import mySelf from './../img/2.jpg'
import img from './../img/10.gif';
import './../css/1.css'


const greeter = require('./Greeter.js');

document.querySelector("#root").appendChild(greeter());
console.log('test---1111----ok')
console.log(txt)