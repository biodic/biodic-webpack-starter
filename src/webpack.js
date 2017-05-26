'use strict';


// 라이브러리 import and packaging //////////////////////////////////////////////////////////////// 

	// bootstrap은 maxcdn 이용시 한국에서는 느려서 npm으로 설치후 bundle.js 및 app.css로 함께 패키징 (배포시 fonts경로등의 문제 발생 방지)
	import 'bootstrap';
	import 'bootstrap/dist/css/bootstrap.css';

	// font-awesome은 cdn.jsdelivr.net을 이용하는게 빠름(로컬보다는 느리겠지만...)
	//import 'font-awesome/scss/font-awesome.scss'; 
	/*
		font-awesome Memo : 
			Font Awesome웹에서 이메일을 기재하면 전송해주는 embed code(https://use.fontawesome.com/XXXXXXXX.js)를 이용하면,
			새로운 아이콘 파일이 반영된 최신의 Font Awsome을 이용할 수 있지만, 한국에서 다소 느림감이 있음.
	*/

	// jQuery도 ajax.googleapis.com를 이용하는게 더 빠름
	//import $ from 'jquery';

	// toastr
	import Toastr from 'toastr';
	import 'toastr/build/toastr.css'; //You need style and css loader installed and set
	window.Toastr = Toastr;

	// MarkDown Parser
	import markdown from 'markdown';
	window.markdown = markdown;

	var md = markdown.markdown;


// Cutom //////////////////////////////////////////////////////////////// 
	// 최초로 읽어올 scss
	import './scss/app.scss';


// 여기서부터는 사이트에서 사용할 코드
	import common from './modules/common';
	import login from './modules/login';

	window.common = common;	
	window.login = login;	

	$(() => {
		console.warn('jQuery document ready');

		$("#readme").html(md.toHTML( $("textarea[name=readme]").html() ));

		if($("#preloader").length>0) {
			$('.loader').fadeOut();
			$('#preloader').delay(100).fadeOut('slow');
			$('body').delay(100).css({'overflow':'visible'});
		}
	});







// ES6 문법 몇개... (출처: http://haviyj.tistory.com/) //////////////////////////////////////////////////////////////// 
// const
const ME = { "name": "ES6" } 
console.log('const', ME); //ES6 
ME.name = "Webpack Starter"; 
console.log('const', ME); //ES7 (cf: ME = {}; 처럼 변수 자체는 상수값으로 수정되지 않는다.)

// arrow function #1
let plus = (a, b) => { 
	let result = a + b; 
	console.log('arrow function: '+a+'+'+b+' =', result); 
}
plus(1,2);

// let
let let1 = 1; 
let letTest = () => { 
	console.log('let1',let1); // 1 
	if(let1 == 1) { 
		let let2 = 2; 
	} 
	try {
		console.log('let2',let2); //Reference Error가 발생될 것임
	}
	catch(err) {
		console.error(err.name, err.message);
	}
}
letTest();
