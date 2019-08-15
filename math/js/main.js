'use strict'
document.querySelector('.text').focus();
function math_gen_cl(x) {
	return Math.ceil(Math.random()*x);
}
function math_gen_13() {
	return Math.floor(Math.random()*14);
}

var res;

function math_block() {
	var first = math_gen_13();
	for (var i = 0; i < math_gen_cl(3); i++) {
		first = first + ' + ' + math_gen_13();
		console.log(i + ": Hello, JavaScript!");
		document.querySelector('#mat .text').value = "";
	}

	
	var text = document.querySelector('.math');
	// console.log (first);
	res = eval(first);
	text.innerHTML = first + ' = ' + res; 
}

math_block();
var btn_next = document.querySelector('#mat .next');
btn_next.onclick = math_block;


var apa = "12/5*9+9.4*2";
console.log(eval(apa));
apa = math_gen_cl(3);
console.log(eval(apa));



var btn_conf = document.querySelector('#mat .confirm');
btn_conf.onclick = math_confirm;

var answer = document.querySelector('#mat .answer');

document.onkeydown = function(event) {
	var y = event.keyCode;
	if (y==13) {
		math_confirm();
	}
};

function math_confirm() {
	var input = document.querySelector('#mat .text').value;
	// console.log(document.querySelector('.text').value);
	if (input!='') {
		if (input==res) {
			console.log(input + ' ответ правильный');
			answer.innerHTML = input + ' ответ правильный';
			answer.style.color = 'black';
			math_block();

		} else {
			answer.innerHTML = input + ' ответ неправильный попробуйте еще раз';
			document.querySelector('#mat .text').value = "";
			answer.style.color = 'red';
			console.log(input + ' ответ неправильный');
		}
	} else {
		console.log('не ответ не правильный');
		answer.style.color = 'red';
		answer.innerHTML = 'не ответ не правильный попробуйте еще раз';
	}
}

