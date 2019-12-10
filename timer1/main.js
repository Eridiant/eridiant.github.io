$(function(){
	var main = $('.display .display__main');
	var tot = $('.display .display__total');
	var main1 = $('.display .display_lab-1');
	var main2 = $('.display .display_lab-2');
	var main3 = $('.display .display_lab-3');
	var i = 0;







	var t = new timerLabs();

	// t.start = function(data) {
	// 	$('.btns .start')
	// }

	var ms = 0;
	var s = 0;
	var m = 0;
	var h = 0;
	var st = '00';
	var mt = '00';
	var ht = '00';
	var res = '00:00:00:0';
	var res1 = '00:00:00:0';
	var res2 = '00:00:00:0';
	var res3 = '00:00:00:0';
	var flag = false;
	var flagStart = true;

	var ms1 = 0;
	var s1 = 0;
	var m1 = 0;
	var h1 = 0;
	var st1 = '00';
	var mt1 = '00';
	var ht1 = '00';
	var ris = '00:00:00:0';

	var data = $('.btns .start');
	data.on('click', function(){
		if (flagStart) {
			start();
			flagStart = false;
		}
	});

	var lab = $('.btns .lab');
	lab.on('click', function(){
		flag = true;
	});


	function start () {
		setInterval(ontick, 100)
	}

	function ontick () {
		ms++;
		if (ms == 10) {
			ms = 0;
			s++;
			if (s < 10) {
				st = '0' + s;
			} else {
				st = s;
			}
			if (s == 60) {
				s = 0;
				m++;
				if (m < 10) {
					mt = '0' + m;
				} else {
					mt = m;
				}
				if (m == 60) {
					m = 0;
					h++;
					if (h < 10) {
						ht = '0' + h;
					} else {
						ht = h;
					}
				}
			}
		}
		// console.log(h + ':' + m + ':' + s + ':' + ms);
		res = ht + ':' + mt + ':' + st;
		main.html(res);

		ms1++;
		if (ms1 == 10) {
			ms1 = 0;
			s1++;
			if (s1 < 10) {
				st1 = '0' + s1;
			} else {
				st1 = s1;
			}
			if (s1 == 60) {
				s1 = 0;
				m1++;
				if (m1 < 10) {
					mt1 = '0' + m1;
				} else {
					mt1 = m1;
				}
				if (m1 == 60) {
					m1 = 0;
					h1++;
					if (h1 < 10) {
						ht1 = '0' + h1;
					} else {
						ht1 = h1;
					}
				}
			}
		}
		// console.log(h + ':' + m + ':' + s + ':' + ms);
		ris = ht1 + ':' + mt1 + ':' + st1;
		tot.html(ris);

		if (flag) {
			res3 = res2;
			res2 = res1;
			res1 = res;
			console.log("res", res);
			console.log("res1", res1);
			console.log("flag", flag);
			flag = false;
			console.log("flag", flag);
			main1.html(res1);
			main2.html(res2);
			main3.html(res3);
			ms = 0;
			s = 0;
			m = 0;
			h = 0;
			st = '00';
			mt = '00';
			ht = '00';
		}
		
	}

	t.ontick = function(data) {}

	t.onend = function(data) {}


	function timerLabs() {
		this.star = function(data) {
			data.on('click', this.oninit);
			// console.log("data", data);
		};
		this.stop = function() {}

		this.oninit = function(data) {
			setInterval(this.ontick, 1000);
			console.log("this", this);
		}
		this.ontic = function(data) {
			console.log('1');
		}
		this.onend = function(data) {}

	}


});






