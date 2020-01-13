// import './../assets/sass/main.scss';
import 'bootstrap';

const pug = require('pug');

const compiledFunction = pug.compileFile('index.pug');
const data = {};

const rootNode = document.getElementById('root'); 

if (rootNode) {
    rootNode.innerHTML = compiledFunction(data);
}