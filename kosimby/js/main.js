$(document).ready(function() {
	// $("input[name=phone]").inputmask({"mask": "+9 999 999-99-99", "clearIncomplete": true});
	$(".link_1").click(function () {
		$('#small-modal1').arcticmodal();
	});

	$(".thanks").click(function () {
		$('#thanks').arcticmodal();
	});

	$(".link_11").click(function () {
		$('#small-modal11').arcticmodal();
	});

	$(".link_101").click(function () {
		$('#small-modal101').arcticmodal();
	});

	$("#broad").click(function () {
		if($(this).hasClass('is-active')){
			$(this).removeClass('is-active');
			$('.mobmenu').animate({left: '-150%'}, 300);
		}
		else{
			$(this).addClass('is-active');
			$('.mobmenu').animate({left: 0}, 300);
		}
	});

	var mtype;
	var mdiameter;
	var mlength;
	var ml2;
	var mprice;



	$("body").on( "click", ".link_h", function() {
		$('#small-modal2').arcticmodal();
		mtype = $(this).closest('.pt_tab').find('.ptc_info>p>span').text();
		mdiameter = $(this).closest('tr').find('td:nth-child(1)').text();
		mlength = $(this).closest('tr').find('td:nth-child(2)').text();
		mprice = $(this).closest('tr').find('td:nth-child(4)>p>span').text();
		$('#mtype').text(mtype);
		$('#mdiameter').text(mdiameter);
		$('#mlength').text(mlength);
		$('#mprice').text(mprice);
	});


	$("body").on( "click", ".link_3", function() {
		$('#small-modal3').arcticmodal();
		mtype = $(this).closest('table').attr('data-type');
		mdiameter = $(this).closest('tr').find('td:nth-child(1)').text();
		mlength = $(this).closest('tr').find('td:nth-child(2)').text();
		ml2 = $(this).closest('tr').find('td:nth-child(3)').text();
		mprice = $(this).closest('tr').find('td:nth-child(4)>p>span').text();
		if($(this).hasClass('no-arma')){
			$('#modal_type').text('Марка: ' + mdiameter + ', Марка стали: ' + mlength + ', Длина: ' + ml2 + 'мм, от ' + mprice);
		}
		else {
			$('#modal_type').text(mtype + ' ' + mdiameter + 'мм длина - ' + mlength + ' от ' + mprice);
		}

	});

	$(".link_4").click(function () {
		$('#small-modal4').arcticmodal();
	});
	$(".link_5").click(function () {
		$('#small-modal5').arcticmodal();
	});

	$(".question_block").click(function () {
		if($(this).hasClass('active')){
			$(".question_block").removeClass('active');
			$('.question_content').css('display', 'none');
		}
		else {
			$(".question_block").removeClass('active');
			$(this).addClass('active');
			$('.question_content').css('display', 'none');
			$(this).find('.question_content').fadeIn(200);
		}
	});
	$(".ptlink_mobile").click(function (e) {
		e.stopPropagation();
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).find('.pt_menu').fadeOut(200);
		}
		else {
			$(this).addClass('active');
			$(this).find('.pt_menu').fadeIn(200);
		}
	});


	var mySwiper = new Swiper('#swiper_advantage',{
		loop: false,
		slidesPerView: 3,
		pagination: '.sp1',
		paginationClickable: true,
		breakpoints: {
			// when window width is <= 320px
			1179: {
				loop: false,
				slidesPerView: 2,
				pagination: '.sp1'
			},
			789: {
				loop: false,
				slidesPerView: 1,
				pagination: '.sp1'
			}
		}
	});

	var mySwiper7 = new Swiper('#swiper_auto',{
		loop: true,
		nextButton: '.next',
		prevButton: '.prev',
		slidesPerView: 1,
		effect: 'fade',
		fade: {
			crossFade: true
		},
		onSlideChangeStart: progress,
		onSlideChangeEnd: progress

	});
	function progress(){
		this_index = Number($('#swiper_auto').find('.swiper-slide-active').attr('data-swiper-slide-index')) + 1;
		$('.auto_tabs a').removeClass('active');
		$('.auto_tabs').find('a:nth-child('+ this_index +')').addClass('active');
	}
	$(".auto_tabs a").click(function () {
		this_index = $(this).index() + 1;
		mySwiper7.slideTo(this_index);
	});

	var dia;
	var wei;
	var len;



	$("#weight_polz").ionRangeSlider({
		grid: true,
		min: 0,
		max: 100,
		grid_num: 9
	});
	wei = $("#weight_polz").data("ionRangeSlider");


	$("#length_polz").ionRangeSlider({
		grid: true,
		min: 0,
		max: 500000,
		grid_num: 5
	});
	len = $("#length_polz").data("ionRangeSlider");



	$(".pt_link").click(function () {
		if($(this).hasClass('active')){}
		else {
			text = $(this).text();
			$('.pt_choice').text(text);
			target = $(this).attr('data-target');
			$(".pt_link").removeClass('active');
			$(this).addClass('active');
			$('.pt_tab').css('display', 'none');
			$('#'+target).fadeIn(200);
		}
	});


	$(".cb_tabs a").click(function () {
		if($(this).hasClass('active')){}
		else {
			target = $(this).attr('data-target');

			if(target == 'ctt2'){
				$('.cb_content').css('display', 'none');
				$('#cb_info0').fadeIn('200');
			}
			else if(target == 'ctt1'){
				$('.cb_content').css('display', 'none');
				refreshPlacemark();
				$('#cb_info1').fadeIn('200');
				myPlacemark1.options.set('iconImageHref', 'images/marker1.png');
				myPlacemark1.options.set('iconImageSize', [28, 42]);
				myPlacemark1.options.set('iconImageOffset', [-12, -42]);
			}
			$(".cb_tabs a").removeClass('active');
			$(this).addClass('active');
			$('.ctt_tab').css('display', 'none');
			$('#'+target).fadeIn(200);
		}
	});




	//Инициализация карты
	ymaps.ready(init);
	var myMap,
		myPlacemark0,
		myPlacemark1,
		myPlacemark2,
		myPlacemark3,
		myPlacemark4,
		myPlacemark5,
		myPlacemark6,
		myPlacemark7,
		myPlacemark8,
		myPlacemark9,
		myPlacemark10;

	function init(){
		myMap = new ymaps.Map("map", {
			center: [55.75396, 37.620393],
			zoom: 9,
			controls: []
		});

		var settings = {
			// Опции.
			// Своё изображение иконки метки.
			iconLayout: 'default#image',
			iconImageHref: 'images/marker.png',
			// Размеры метки.
			iconImageSize: [28, 42],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-14, -42]
		};

		var settings2 = {
			// Опции.
			// Своё изображение иконки метки.
			iconLayout: 'default#image',
			iconImageHref: 'images/marker.png',
			// Размеры метки.
			iconImageSize: [28, 42],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-14, -42]
		};
		55.804328, 37.583380

		//
		myPlacemark0 = new ymaps.Placemark([55.804328, 37.583380], {hintContent: '127015 Россия, Москва, Бутырская улица, 76с1'}, settings2);
		//
		myPlacemark1 = new ymaps.Placemark([55.971234, 37.468668], {hintContent: 'Новое шоссе, 32А, Россия, Московская область, Долгопрудный'}, settings2);
		//
		myPlacemark2 = new ymaps.Placemark([55.807273, 37.381666], {hintContent: 'Москва, МКАД, 65-й километр, вл.1'}, settings);
		//
		myPlacemark3 = new ymaps.Placemark([55.830725, 37.399866], {hintContent: 'Москва, Волоколамское ш., 97'}, settings);
		//
		myPlacemark4 = new ymaps.Placemark([55.646848, 37.378001], {hintContent: 'Москва, ул. Производственная, 11'}, settings);
		//
		myPlacemark5 = new ymaps.Placemark([55.396519, 37.529852], {hintContent: 'Кутузовская улица, 6, Россия, Московская область, Подольск'}, settings);
		//
		myPlacemark6 = new ymaps.Placemark([55.59778, 38.119497], {hintContent: 'Московская обл., Жуковский г., ул. Дорожная, 5'}, settings);
		//
		myPlacemark7 = new ymaps.Placemark([55.822883, 37.355606], {hintContent: 'Москва, улица Генерала Белобородова, 46с2'}, settings);
		//
		myPlacemark8 = new ymaps.Placemark([55.812529, 37.832827], {hintContent: 'Москва, Щелковское ш., 100'}, settings);
		//
		myPlacemark9 = new ymaps.Placemark([55.800089, 37.970619], {hintContent: 'Московская область, Балашиха, проспект Ленина, 73'}, settings);
		//
		myPlacemark10 = new ymaps.Placemark([55.887094, 37.633014], {hintContent: 'Москва, Чермянский пр-д, 5'}, settings);

		myMap.geoObjects.add(myPlacemark0);
		myMap.geoObjects.add(myPlacemark1);
		myMap.geoObjects.add(myPlacemark2);
		myMap.geoObjects.add(myPlacemark3);
		myMap.geoObjects.add(myPlacemark4);
		myMap.geoObjects.add(myPlacemark5);
		myMap.geoObjects.add(myPlacemark6);
		myMap.geoObjects.add(myPlacemark7);
		myMap.geoObjects.add(myPlacemark8);
		myMap.geoObjects.add(myPlacemark9);
		myMap.geoObjects.add(myPlacemark10);

		myPlacemark0.events.add('mousedown', function(e) {
			$('.cb_content').css('display', 'none');
			$('#cb_info0').fadeIn('200');
		});

		myPlacemark1.events.add('mousedown', function(e) {
			$('.cb_content').css('display', 'none');
			$('#cb_info1').fadeIn('200');
		});

		myPlacemark2.events.add('mousedown', function(e) {
			$('.cb_content').css('display', 'none');
			$('#cb_info2').fadeIn('200');
		});

		myPlacemark3.events.add('mousedown', function(e) {
			$('.cb_content').css('display', 'none');
			$('#cb_info3').fadeIn('200');
		});

		myPlacemark4.events.add('mousedown', function(e) {
			$('.cb_content').css('display', 'none');
			$('#cb_info4').fadeIn('200');
		});

		myPlacemark5.events.add('mousedown', function(e) {
			$('.cb_content').css('display', 'none');
			$('#cb_info5').fadeIn('200');
		});

		myPlacemark6.events.add('mousedown', function(e) {
			$('.cb_content').css('display', 'none');
			$('#cb_info6').fadeIn('200');
		});

		myPlacemark7.events.add('mousedown', function(e) {
			$('.cb_content').css('display', 'none');
			$('#cb_info7').fadeIn('200');
		});

		myPlacemark8.events.add('mousedown', function(e) {
			$('.cb_content').css('display', 'none');
			$('#cb_info8').fadeIn('200');
		});

		myPlacemark9.events.add('mousedown', function(e) {
			$('.cb_content').css('display', 'none');
			$('#cb_info9').fadeIn('200');
		});

		myPlacemark10.events.add('mousedown', function(e) {
			$('.cb_content').css('display', 'none');
			$('#cb_info10').fadeIn('200');
		});



		myMap.behaviors.disable('scrollZoom');

	}

	function refreshPlacemark() {
		$('.cb_content').css('display', 'none');

		myPlacemark1.options.set('iconImageHref', 'images/marker2.png');
		myPlacemark1.options.set('iconImageSize', [28, 42]);
		myPlacemark1.options.set('iconImageOffset', [-12, -42]);

		myPlacemark2.options.set('iconImageHref', 'images/marker2.png');
		myPlacemark2.options.set('iconImageSize', [28, 42]);
		myPlacemark2.options.set('iconImageOffset', [-12, -42]);

		myPlacemark3.options.set('iconImageHref', 'images/marker2.png');
		myPlacemark3.options.set('iconImageSize', [28, 42]);
		myPlacemark3.options.set('iconImageOffset', [-12, -42]);

		myPlacemark4.options.set('iconImageHref', 'images/marker2.png');
		myPlacemark4.options.set('iconImageSize', [28, 42]);
		myPlacemark4.options.set('iconImageOffset', [-12, -42]);

		myPlacemark5.options.set('iconImageHref', 'images/marker2.png');
		myPlacemark5.options.set('iconImageSize', [28, 42]);
		myPlacemark5.options.set('iconImageOffset', [-12, -42]);

		myPlacemark6.options.set('iconImageHref', 'images/marker2.png');
		myPlacemark6.options.set('iconImageSize', [28, 42]);
		myPlacemark6.options.set('iconImageOffset', [-12, -42]);

		myPlacemark7.options.set('iconImageHref', 'images/marker2.png');
		myPlacemark7.options.set('iconImageSize', [28, 42]);
		myPlacemark7.options.set('iconImageOffset', [-12, -42]);

		myPlacemark8.options.set('iconImageHref', 'images/marker2.png');
		myPlacemark8.options.set('iconImageSize', [28, 42]);
		myPlacemark8.options.set('iconImageOffset', [-12, -42]);

		myPlacemark9.options.set('iconImageHref', 'images/marker2.png');
		myPlacemark9.options.set('iconImageSize', [28, 42]);
		myPlacemark9.options.set('iconImageOffset', [-12, -42]);

		myPlacemark10.options.set('iconImageHref', 'images/marker2.png');
		myPlacemark10.options.set('iconImageSize', [28, 42]);
		myPlacemark10.options.set('iconImageOffset', [-12, -42]);

	}



	//Инициализация карты
	ymaps.ready(init2);
	var myMap2,
		myPlacemark100

	function init2(){
		myMap = new ymaps.Map("map2", {
			center: [55.763465, 37.712852],
			zoom: 14,
			controls: []
		});

		var settings = {
			// Опции.
			// Своё изображение иконки метки.
			iconLayout: 'default#image',
			iconImageHref: 'images/marker1.png',
			// Размеры метки.
			iconImageSize: [28, 42],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-12, -42]
		};



		myPlacemark100 = new ymaps.Placemark([55.763465, 37.712852], {hintContent: 'Москва, 2-я Синичкина, д. 9а'}, settings);

		myMap.geoObjects.add(myPlacemark100);


		myMap.behaviors.disable('scrollZoom');

	}

	var minimal_price = 0;
	var minimal_loc1 = 0;
	var minimal_loc2 = 0;
	var minimal_loc3 = 0;
	var minimal_loc4 = 0;
	var minimal_loc5 = 0;

	/*новое - массивы прайсов*/
	var json_array_A3A500;
	var json_array_A3A500C;
	var json_array_25G2C;
	var json_array_35GC;
	var json_array_A1A240;
	/*новое - массивы прайсов*/

	//номер заказа
	$.getJSON('data/order.json', function(data) {
		array = data;
		$('.order_num').text(array)
	});

	//минимальная цена
	$.getJSON('data/min.json', function(data) {
		minimal_price = data;
		$('.minimal_prr').text(accounting.formatNumber(minimal_price - 300, 0, " "))
	});


	//подгрузка прайсов в таблицы
	$.getJSON('data/hben_A3A500.json', function(data) {
		json_array_A3A500 = data;
	});
	$.getJSON('data/hben_A3A500C.json', function(data) {
		json_array_A3A500C = data;
	});
	$.getJSON('data/hben_25G2C.json', function(data) {
		json_array_25G2C = data;
	});
	$.getJSON('data/hben_35GC.json', function(data) {
		json_array_35GC = data;
	});
	$.getJSON('data/hben_A1A240.json', function(data) {
		json_array_A1A240 = data;
	});
	//подгрузка прайсов в таблицы

	function set_A3A500C(){
		for(var i=0;i<json_array_A3A500C.length;i++){
			for(var e=0;e<json_array_A3A500C[i]['length'].length;e++){
				$('#table_1 tbody').append('<tr><td>'+ json_array_A3A500C[i]['diameter'] +'<i></i></td><td>'+ json_array_A3A500C[i]['length'][e] +'<i></i></td><td class="mob_dn">52544-06 <i></i></td><td class="price_order"><p>от <span>'+ accounting.formatNumber(json_array_A3A500C[i]['price'][e], 0, " ") +'</span></p><a class="link_3">Заказать</a> <i></i></td></tr>');
			}
		}
	}
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	  setTimeout(set_A3A500C, 2500);
	}
	else{
		setTimeout(set_A3A500C, 1400);
	}

	function set_A3A500(){
		for(var i=0;i<json_array_A3A500.length;i++){
			for(var e=0;e<json_array_A3A500[i]['length'].length;e++){
				$('#table_2 tbody').append('<tr><td>'+ json_array_A3A500[i]['diameter'] +'<i></i></td><td>'+ json_array_A3A500[i]['length'][e] +'<i></i></td><td class="mob_dn">52544-06 <i></i></td><td class="price_order"><p>от <span>'+ accounting.formatNumber(json_array_A3A500[i]['price'][e], 0, " ") +'</span></p><a class="link_3">Заказать</a> <i></i></td></tr>');
			}
		}
	}
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		setTimeout(set_A3A500, 2500);
	}
	else{
		setTimeout(set_A3A500, 1200);
	}


	function set_25G2C(){
		for(var i=0;i<json_array_35GC.length;i++){
			for(var e=0;e<json_array_35GC[i]['length'].length;e++){
				$('#table_3 tbody').append('<tr><td>'+ json_array_35GC[i]['diameter'] +'<i></i></td><td>'+ json_array_35GC[i]['length'][e] +'<i></i></td><td class="mob_dn">5781-82 <i></i></td><td class="price_order"><p>от <span>'+ accounting.formatNumber(json_array_35GC[i]['price'][e], 0, " ") +'</span></p><a class="link_3">Заказать</a> <i></i></td></tr>');
			}
		}
	}
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		setTimeout(set_25G2C, 2500);
	}
	else{
		setTimeout(set_25G2C, 1400);
	}

	function set_35GC(){
		for(var i=0;i<json_array_35GC.length;i++){
			for(var e=0;e<json_array_35GC[i]['length'].length;e++){
				$('#table_4 tbody').append('<tr><td>'+ json_array_35GC[i]['diameter'] +'<i></i></td><td>'+ json_array_35GC[i]['length'][e] +'<i></i></td><td class="mob_dn">5781-82 <i></i></td><td class="price_order"><p>от <span>'+ accounting.formatNumber(json_array_35GC[i]['price'][e], 0, " ") +'</span></p><a class="link_3">Заказать</a> <i></i></td></tr>');
			}
		}
	}
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	  setTimeout(set_35GC, 2500);
	}
	else{
		setTimeout(set_35GC, 1600);
	}
	

	function set_A1A240(){
		for(var i=0;i<json_array_A1A240.length;i++){
			for(var e=0;e<json_array_A1A240[i]['length'].length;e++){
				$('#table_5 tbody').append('<tr><td>'+ json_array_A1A240[i]['diameter'] +'<i></i></td><td>'+ json_array_A1A240[i]['length'][e] +'<i></i></td><td class="mob_dn">5781-82 <i></i></td><td class="price_order"><p>от <span>'+ accounting.formatNumber(json_array_A1A240[i]['price'][e], 0, " ") +'</span></p><a class="link_3">Заказать</a> <i></i></td></tr>');
			}
		}
	}
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	  setTimeout(set_A1A240, 2500);
	}
	else{
		setTimeout(set_A1A240, 1800);
	}
	


	var price_array = [];
	var actual_price;
	var rvalue;
	var m3 = 1963;
	var lekg;
	var final_price;

	var ndata = new Date();
	//var ndata = new Date(2017, 5, 16, 0, 0, 0, 0); //12 июня

	var nnnn_data = Number((new Date()) - 86400000 - 86400000);
	var data_new = $.format.date(nnnn_data, 'dd.MM.yyyy');
	var ndata2 = Number(new Date()) + 86400000;
	var data_next = $.format.date(ndata2, 'dd.MM.yyyy');
	$('.data_order').text(data_new);
	$('.data_delivery').text(data_next);

	var one_day = 86400000; //1 день

	var m = new Date();
	if(ndata.getDay()){m.setDate(ndata.getDate() + 8 - ndata.getDay())} else {m.setDate(ndata.getDate() + 1)}
	$('.action_time').text($.format.date(m, 'dd MMMM'))



	$(".json_tek").change(function() {
		if($(this).val() == 'A3'){
			$('.A3').removeAttr('disabled');
			$('.A1').prop('disabled', 'true');
			$(".json_select option").each(function() {
				if($(this).prop('disabled')){}
				else {
					$(".json_select").val($(this).val());
					$(".json_select").change();
					return false;
				}
			});
			select_ref();

		}
		else if($(this).val() == 'A1'){
			$('.A1').removeAttr('disabled');
			$('.A3').prop('disabled', 'true');
			$(".json_select option").each(function() {
				if($(this).prop('disabled')){}
				else {
					$(".json_select").val($(this).val());
					$(".json_select").change();
					return false;
				}
			});
			select_ref();
		}
	});
	function select_ref() {
		$('select').trigger('refresh');
	}
	select_ref();
	$(".json_select").val("A1");
	$(".json_select option").each(function() {
		if($(this).prop('disabled')){}
		else {
			$(".json_select").val($(this).val());
			$(".json_select").change();
			return false;
		}
	});
	$(".json_select").change();

	if($('.json_tek').val() == 'A3'){
		$('.A3').removeAttr('disabled');
		$('.A1').prop('disabled', 'true');
		$(".json_select option").each(function() {
			if($(this).prop('disabled')){}
			else {
				$(".json_select").val($(this).val());
				$(".json_select").change();
				return false;
			}
		});
		select_ref();

	}
	else if($('.json_tek').val() == 'A1'){
		$('.A1').removeAttr('disabled');
		$('.A3').prop('disabled', 'true');
		$(".json_select option").each(function() {
			if($(this).prop('disabled')){}
			else {
				$(".json_select").val($(this).val());
				$(".json_select").change();
				return false;
			}
		});
		select_ref();
	}


	select_val = $('.json_select').val();
	var this_select;
	var json_path;
	var table_price;
	var dia_array = [];

	//новое - путь заменен на переменную прайса
	if (select_val == "A3A500C") {
		json_path = json_array_A3A500C;
	}
	else if (select_val == "A3A500") {
		json_path = json_array_A3A500;
	}
	else if (select_val == "25G2C") {
		json_path = json_array_25G2C;
	}
	else if (select_val == "35GC") {
		json_path = json_array_35GC;
	}
	else if (select_val == "A1A240") {
		json_path = json_array_A1A240;
	}

	var data_index = 0;


	$('.json_select').change(function() {
		this_item = $(this);
		select_val = $(this).find('option:selected').val();
		//новое - путь заменен на переменную прайса
		if (select_val == "A3A500C") {
			json_path = json_array_A3A500C;
		}
		else if (select_val == "A3A500") {
			json_path = json_array_A3A500;
		}
		/*
		else if (select_val == "25G2C") {
			json_path = json_array_25G2C;
		}
		*/
		else if (select_val == "35GC") {
			json_path = json_array_35GC;
		}
		else if (select_val == "A1A240") {
			json_path = json_array_A1A240;
		}
		load_diameter();
		select_ref();
		wei.update({
			from: 0
		});
		len.update({
			from: 0
		});
	});
	setTimeout(load_diameter, 1000);


	function load_diameter(){
		json_array = json_path;
		dia_array = [];
		$('.json_diameter option').remove();
		$('.json_diameter').val('');
		for(var i=0;i<json_array.length;i++){
			$('.json_diameter').append('<option value="'+ json_array[i]["diameter"] +'">' + json_array[i]["diameter"] + '</option>');
			dia_array.push(json_array[i]["diameter"]);
		}
		setTimeout(function() {

			dia.update({
				grid: true,
				min: dia_array[0],
				max: dia_array[dia_array.length],
				values: dia_array
			});
		}, 200);
		select_ref();
		load_price();
	}
	function diameter_start(){
		//новое - путь заменен на переменную прайса
		if (select_val == "A3A500C") {
			json_path = json_array_A3A500C;
		}
		else if (select_val == "A3A500") {
			json_path = json_array_A3A500;
		}
		else if (select_val == "25G2C") {
			json_path = json_array_25G2C;
		}
		else if (select_val == "35GC") {
			json_path = json_array_35GC;
		}
		else if (select_val == "A1A240") {
			json_path = json_array_A1A240;
		}
		json_array = json_path;
		dia_array = [];
		$('.json_diameter option').remove();
		$('.json_diameter').val('');
		for(var i=0;i<json_array.length;i++){
			$('.json_diameter').append('<option value="'+ json_array[i]["diameter"] +'">' + json_array[i]["diameter"] + '</option>');
			dia_array.push(json_array[i]["diameter"]);
		}
		$("#diameter_polz").ionRangeSlider({
			grid: true,
			min: dia_array[0],
			max: dia_array[dia_array.length],
			values: dia_array
		});
		dia = $("#diameter_polz").data("ionRangeSlider");
		select_ref();
		load_price();
		wei.update({
			from: 0
		});
		len.update({
			from: 0
		});
	}
	setTimeout(diameter_start, 1000);


	var polz_set = true;
	$("#diameter_polz").change(function () {
		this_value = $(this).val();
		$('.json_diameter').val(this_value);
		if(polz_set == true){
			polz_set = false;
			$('.json_diameter').change();
		}
		else {
			polz_set = true
		}
		load_price();
	});
	var tvalue;
	$(".json_diameter").change(function () {
		$(".json_diameter option").each(function () {
			if($(this).prop('selected')){
				tvalue = $(this).index();
			}
		});
		if(polz_set == true){
			$('#diameter_polz').val(tvalue);
			polz_set = false;
			dia.update({
				grid: true,
				min: dia_array[0],
				max: dia_array[dia_array.length],
				values: dia_array,
				from: tvalue
			});
		}
		else {
			polz_set = true
		}
		wei.update({
			from: 0
		});
		len.update({
			from: 0
		});
	});


	function load_price(){
		if (select_val == "A3A500C") {
			json_path = json_array_A3A500C;
		}
		else if (select_val == "A3A500") {
			json_path = json_array_A3A500;
		}
		else if (select_val == "25G2C") {
			json_path = json_array_25G2C;
		}
		else if (select_val == "35GC") {
			json_path = json_array_35GC;
		}
		else if (select_val == "A1A240") {
			json_path = json_array_A1A240;
		}
		json_array = json_path;
		price_array = [];
		for(var i=0;i<json_array.length;i++){
			real_price = 999999;
			one_price = [];
			one_price.push(json_array[i]['diameter']);
			for(var e=0;e<json_array[i]['length'].length;e++){
				if(Number(json_array[i]['price'][e]) < real_price){
					real_price = Number(json_array[i]['price'][e]);
				}
			}
			one_price.push(real_price);
			price_array.push(one_price);
		}
		$(".json_diameter option").each(function () {
			if($(this).prop('selected')){
				rvalue = $(this).val();
				reng = 1/(3.14*(rvalue/1000)*(rvalue/1000));
				lekg = m3/reng;
				predel = (100000/lekg).toFixed(0);
				len.update({
					from_max: predel
				});
			}
		});
		setTimeout(function() {
			for(var i=0;i<price_array.length;i++){
				if(Number(price_array[i][0]) == rvalue){
					actual_price = price_array[i][1];
				}
			}

		}, 100);
	}

	var polz_set2 = true;

	$("#length_polz").change(function () {
		if(polz_set2 == true){
			polz_set2 = false;
			this_value = Number($(this).val());
			actual_weight = (this_value * lekg)/1000;
			wei.update({
				from: actual_weight
			});
			$('#length_num').text((this_value).toFixed(0));
			$('#weight_num').text((actual_weight).toFixed(0));
			polz_set2 = true;
			calculation();
		}

	});



	$("#weight_polz").change(function () {
		if(polz_set2 == true){
			polz_set2 = false;
			this_value = Number($(this).val())*1000;
			actual_length = this_value/lekg;
			len.update({
				from: actual_length
			});
			$('#length_num').text((actual_length).toFixed(0));
			$('#weight_num').text((this_value/1000).toFixed(0));
			polz_set2 = true;
			calculation();
		}
	});


	function calculation(){
		final_price = actual_price * Number($("#weight_polz").val());
		$('.final_price').text(accounting.formatNumber(final_price, 0, " "));
	}

	$('#offer_price').bind("change keyup input click", function() {
		if (this.value.match(/[^0-9]/g)) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
		else {
			off_price = $('#offer_price').val();
			middle_price = 10*(final_price/100);
			if (off_price >= final_price - middle_price && off_price <= final_price){
				$('.oia1').stop().animate({opacity: 1}, 200);
				$('.oia1').css('display', 'inline-block');
				$('.oia2').stop().animate({opacity: 0}, 200);
				$('.oia2').css('display', 'none');
				$(this).css('border', '2px solid #e6e6e6');
			}
			else {
				$('.oia2').stop().animate({opacity: 1}, 200);
				$('.oia2').css('display', 'inline-block');
				$('.oia1').stop().animate({opacity: 0}, 200);
				$('.oia1').css('display', 'none');
				$(this).css('border', '2px solid red');
			}
		}

	});


	$("#order_start").click(function() {
		off_price = $('#offer_price').val();
		middle_price = 15*(final_price/100);
		skidka = (100 - (off_price/(final_price/100))).toFixed(1);
		if (off_price >= final_price - middle_price && off_price <= final_price){
			$('#skidka').text('скидка ' + skidka + '%');
			$('.skidka_price').text(accounting.formatNumber(off_price, 0, " "));
			$('.calc_check_start').css('display', 'none');
			$('.calc_check_final').fadeIn(200);
			$('#offer_price').css('border', '2px solid #e6e6e6');
		}
		else {
			$('.oi_attention').stop().animate({opacity: 0}, 200);
			$('#offer_price').css('border', '2px solid red');
		}
	});

	var aprice;


	function mail_price(){
		price = $('.scroller').clone();
		price.append('<br>');
		price.append('<br>');
		price.append('<p style="font-size: 20px">Арматура А3 А500С рифленая</p>');
		price.append($('#table_1').clone());
		price.append('<br>');
		price.append('<br>');
		price.append('<p style="font-size: 20px">Арматура А3 А500 рифленая</p>');
		price.append($('#table_2').clone());
		price.append('<br>');
		price.append('<br>');
		price.append('<p style="font-size: 20px">Арматура 25Г2С рифленая</p>');
		price.append($('#table_3').clone());
		price.append('<br>');
		price.append('<br>');
		price.append('<p style="font-size: 20px">Арматура 35ГС рифленая</p>');
		price.append($('#table_4').clone());
		price.append('<br>');
		price.append('<br>');
		price.append('<p style="font-size: 20px">Арматура А1 А240 гладкая</p>');
		price.append($('#table_5').clone());
		price.append('<br>');
		price.append('<br>');
		price.append('<p style="font-size: 20px">Балка</p>');
		price.append($('#table_6').clone());
		price.append('<br>');
		price.append('<br>');
		price.append('<p style="font-size: 20px">Уголок</p>');
		price.append($('#table_7').clone());
		price.append('<br>');
		price.append('<br>');
		price.append('<p style="font-size: 20px">Швеллер</p>');
		price.append($('#table_8').clone());
		price.find('.ptc_img').remove();
		price.find('.ptc_number').remove();
		price.find('.link_3').remove();
		price.find('.pt_btn').remove();
		price.find('i').remove();
		price.find('table').attr('style', 'width: 550px; border-spacing: 0; border: 1px #000 solid');
		price.find('table td').attr('style', 'border: 1px #000 solid; text-align: center; padding: 0; height: 15px');
		price.find('.ptc_info p').attr('style', 'text-align: left; margin-top: 50px');
		price.prepend('<p>E-mail: info@stallgrad.ru</p>');
		price.prepend('<p>Телефон: '+ $('header .lptracker_phone').text() +'</p>');
		price.prepend('<p style="font-size: 24px; text-align: left;">Прайс-лист</p>');
		aprice = price.html();
	}
	setTimeout(mail_price, 3000);




	$(".meta_price").click(function (e) {
		//Обозначим форму
		this_form = $(this).closest('form');
		this_form_validate = this_form.find('.validate');
		var proceed = true;
		//Проверка заполненности форм (у нас только телефон)
		this_form_validate.each(function(){
			$(this).css('border','2px solid #ccc');
			if(!$.trim($(this).val())){
				$(this).css('border','2px solid red');
				proceed = false;
			}
		});
		//Если поля заполнены
		if(proceed == true)
		{
			//Отправка данных на сервер
			var data = new FormData();
			data.append('mail',this_form.find('input[name=mail]').val());
			data.append('name',this_form.find('input[name=name]').val());
			data.append('phone',this_form.find('input[name=phone]').val());
			Comagic.addOfflineRequest({
				name: this_form.find('input[name=name]').val(),
				email: this_form.find('input[name=mail]').val(),
				phone: this_form.find('input[name=phone]').val()
			});
			ComagicWidget.sitePhoneCall({phone: this_form.find('input[name=phone]').val().replace (/\+|\(|\)|-/g, '')});
			data.append('cloned',aprice);

			//отправка через аякс
			$.ajax({
				url: 'send/send_price3.php',
				data: data,
				processData: false,
				contentType: false,
				type: 'POST',
				dataType:'json',
				success: function($answer){
					ga('send', 'event', 'callback-price', 'view');
					yaCounter45024379.reachGoal('callback-price');
					$.arcticmodal('close');
					$('#thanks').arcticmodal();
					$.ajax({
						url: 'send/send_manager3.php',
						data: data,
						processData: false,
						contentType: false,
						type: 'POST',
						dataType:'json',
						success: function($answer){}
					});
				}
			});
		}
	});


	$(".meta_memory").click(function (e) {
		//Обозначим форму
		this_form = $(this).closest('form');
		this_form_validate = this_form.find('.validate');
		var proceed = true;
		//Проверка заполненности форм (у нас только телефон)
		this_form_validate.each(function(){
			$(this).css('border','2px solid #ccc');
			if(!$.trim($(this).val())){
				$(this).css('border','2px solid red');
				proceed = false;
			}
		});
		//Если поля заполнены
		if(proceed == true)
		{
			//Отправка данных на сервер
			var data = new FormData();
			data.append('mail',this_form.find('input[name=mail]').val());
			data.append('name',this_form.find('input[name=name]').val());
			Comagic.addOfflineRequest({
				name: this_form.find('input[name=name]').val(),
				email: this_form.find('input[name=mail]').val()
			});
			//отправка через аякс
			$.ajax({
				url: 'send/send_price.php',
				data: data,
				processData: false,
				contentType: false,
				type: 'POST',
				dataType:'json',
				success: function($answer){
					ga('send', 'event', 'callback', 'view');
					yaCounter45024379.reachGoal('callback');
					$.arcticmodal('close');
					$('#thanks').arcticmodal();
					$.ajax({
						url: 'send/send_manager3.php',
						data: data,
						processData: false,
						contentType: false,
						type: 'POST',
						dataType:'json',
						success: function($answer){}
					});
				}
			});
		}
	});

















	$(".meta_calc").click(function() {
		//Обозначим форму
		this_form = $(this).closest('form');
		this_form_validate = this_form.find('.validate');
		var proceed = true;
		//Проверка заполненности форм (у нас только телефон)
		this_form_validate.each(function(){
			$(this).css('border','1px solid #ccc');
			if(!$.trim($(this).val())){
				$(this).css('border','1px solid red');
				proceed = false;
			}
		});
		//Если поля заполнены
		if(proceed == true)
		{
			//Отправка данных на сервер
			var data = new FormData();
			data.append( 'phone', this_form.find('input[name=phone]').val());
			data.append( 'type', this_form.find('select[name=type]').val());
			data.append( 'diameter', this_form.find('select[name=diameter]').val());
			data.append( 'length', this_form.find('input[name=length]').val());
			data.append( 'weight', this_form.find('input[name=weight]').val());
			data.append( 'new_price', this_form.find('.skidka_price').text());
			data.append( 'old_price', this_form.find('.calc_check_final .final_price').text());
			data.append( 'skidka', this_form.find('#skidka').text());
			Comagic.addOfflineRequest({
				phone: this_form.find('input[name=phone]').val()
			});
			ComagicWidget.sitePhoneCall({phone: this_form.find('input[name=phone]').val().replace (/\+|\(|\)|-/g, '')});


			//отправка через аякс
			$.ajax({
				url: 'send/send_calc.php',
				data: data,
				processData: false,
				contentType: false,
				type: 'POST',
				dataType:'json',
				success: function($answer){
					ga('send', 'event', 'callback-calc', 'view');
					yaCounter45024379.reachGoal('callback-calc');
					$.arcticmodal('close');
					$('#thanks').arcticmodal();
				}
			});
		}

	});



	$(".meta_feedback2").click(function() {
		//Обозначим форму
		this_form = $(this).closest('form');
		this_form_validate = this_form.find('.validate');
		var proceed = true;
		//Проверка заполненности форм (у нас только телефон)
		this_form_validate.each(function(){
			$(this).css('border','2px solid #ccc');
			if(!$.trim($(this).val())){
				$(this).css('border','2px solid red');
				proceed = false;
			}
		});
		//Если поля заполнены
		if(proceed == true)
		{
			//Отправка данных на сервер
			var data = new FormData();
			data.append( 'type', this_form.find('.modal_subtitle').text());
			data.append( 'name', this_form.find('input[name=name]').val());
			data.append( 'phone', this_form.find('input[name=phone]').val());
			Comagic.addOfflineRequest({
				name: this_form.find('input[name=name]').val(),
				phone: this_form.find('input[name=phone]').val()
			});
			ComagicWidget.sitePhoneCall({phone: this_form.find('input[name=phone]').val().replace (/\+|\(|\)|-/g, '')});



			//отправка через аякс
			$.ajax({
				url: 'send/send_manager4.php',
				data: data,
				processData: false,
				contentType: false,
				type: 'POST',
				dataType:'json',
				success: function($answer){
					ga('send', 'event', 'callback', 'view');
					yaCounter45024379.reachGoal('callback');
					$.arcticmodal('close');
					$('#thanks').arcticmodal();
				}
			});
		}

	});


	$(".meta_feedback").click(function() {
		//Обозначим форму
		this_form = $(this).closest('form');
		this_form_validate = this_form.find('.validate');
		var proceed = true;
		//Проверка заполненности форм (у нас только телефон)
		this_form_validate.each(function(){
			$(this).css('border','1px solid #ccc');
			if(!$.trim($(this).val())){
				$(this).css('border','1px solid red');
				proceed = false;
			}
		});
		//Если поля заполнены
		if(proceed == true)
		{
			//Отправка данных на сервер
			var data = new FormData();
			data.append( 'name', this_form.find('input[name=name]').val());
			data.append( 'phone', this_form.find('input[name=phone]').val());
			data.append( 'mail', this_form.find('input[name=mail]').val());
			Comagic.addOfflineRequest({
				name: this_form.find('input[name=name]').val(),
				email: this_form.find('input[name=mail]').val(),
				phone: this_form.find('input[name=phone]').val()
			});
			ComagicWidget.sitePhoneCall({phone: this_form.find('input[name=phone]').val().replace (/\+|\(|\)|-/g, '')});





			//отправка через аякс
			$.ajax({
				url: 'send/send_manager6.php',
				data: data,
				processData: false,
				contentType: false,
				type: 'POST',
				dataType:'json',
				success: function($answer){
					ga('send', 'event', 'callback', 'view');
					yaCounter45024379.reachGoal('callback');
					$.arcticmodal('close');
					$('#thanks').arcticmodal();
				}
			});
		}

	});



	$('.contacts_link').on('click', function(e){
		$('html,body').stop().animate({ scrollTop: $('#contacts').offset().top - 50 }, 2000);
		setTimeout(function() {
			$(".top_link").removeClass("active");
			$(".contacts_link").addClass("active");
		}, 2200);
		e.preventDefault();
	});
	$('.about_link').on('click', function(e){
		$('html,body').stop().animate({ scrollTop: $('#about').offset().top - 50 }, 2000);
		e.preventDefault();
	});
	$('.price_link').on('click', function(e){
		$('html,body').stop().animate({ scrollTop: $('#price').offset().top - 50 }, 2000);
		e.preventDefault();
	});
	$('.spec_link').on('click', function(e){
		$('html,body').stop().animate({ scrollTop: $('#spec').offset().top - 50 }, 2000);
		e.preventDefault();
	});
	$('.advantage_link').on('click', function(e){
		$('html,body').stop().animate({ scrollTop: $('#advantage').offset().top - 50 }, 2000);
		e.preventDefault();
	});
	$('.calc_link').on('click', function(e){
		$('html,body').stop().animate({ scrollTop: $('#calc').offset().top - 50 }, 2000);
		e.preventDefault();
	});
	$('.delivery_link').on('click', function(e){
		$('html,body').stop().animate({ scrollTop: $('#delivery').offset().top - 50 }, 2000);
		e.preventDefault();
	});
	$('.company_link').on('click', function(e){
		$('html,body').stop().animate({ scrollTop: $('#company').offset().top - 50 }, 2000);
		e.preventDefault();
	});
	$('.recall_link').on('click', function(e){
		$('html,body').stop().animate({ scrollTop: $('#recall').offset().top - 50 }, 2000);
		e.preventDefault();
	});
	$('.memory2_link').on('click', function(e){
		$('html,body').stop().animate({ scrollTop: $('#memory').offset().top - 50 }, 2000);
		e.preventDefault();
	});
	$('.auto_link').on('click', function(e){
		$('html,body').stop().animate({ scrollTop: $('#auto').offset().top - 50 }, 2000);
		e.preventDefault();
	});
	$('.questions_link').on('click', function(e){
		$('html,body').stop().animate({ scrollTop: $('#questions').offset().top - 50 }, 2000);
		e.preventDefault();
	});


	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {}
	else{

var wow = new WOW(
  {
   
    offset:       -250
  }
);
wow.init();

	}

	var res1 = true;
	var res2 = true;
	function menu_scroll() {
		header_top = $(".scroller").offset().top;



		if (header_top >= 500 && res1 == true) {
			$(".fixed_menu").fadeIn(200);
			res1 = false;
			res2 = true;
		}
		else if (header_top <= 499 && res2 == true) {
			$(".fixed_menu").fadeOut(200);
			res1 = true;
			res2 = false;
		}

		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {}
		else{
			advantage_top = $("#advantage").offset().top;
			advantage_height = $("#advantage").height();
			if (advantage_top - header_top <= 50 && advantage_top - header_top >= -advantage_height) {
				$(".top_link").removeClass("active");
				$(".advantage_link").addClass("active");
			} else {
				$(".advantage_link").removeClass("active");
			}

			advantage_top = $("#advantage").offset().top;
			advantage_height = $("#advantage").height();
			if (advantage_top - header_top <= 50 && advantage_top - header_top >= -advantage_height) {
				$(".top_link").removeClass("active");
				$(".advantage_link").addClass("active");
			} else {
				$(".advantage_link").removeClass("active");
			}


			price_top = $("#price").offset().top;
			price_height = $("#price").height();
			if (price_top - header_top <= 50 && price_top - header_top >= -price_height) {
				$(".top_link").removeClass("active");
				$(".price_link").addClass("active");
			} else {
				$(".price_link").removeClass("active");
			}

			spec_top = $("#spec").offset().top;
			spec_height = $("#spec").height();
			if (spec_top - header_top <= 50 && spec_top - header_top >= -spec_height) {
				$(".top_link").removeClass("active");
				$(".spec_link").addClass("active");
			} else {
				$(".spec_link").removeClass("active");
			}

			calc_top = $("#calc").offset().top;
			calc_height = $("#calc").height();
			if (calc_top - header_top <= 50 && calc_top - header_top >= -calc_height) {
				$(".top_link").removeClass("active");
				$(".calc_link").addClass("active");
			} else {
				$(".calc_link").removeClass("active");
			}

			memory_top = $("#memory").offset().top;
			memory_height = $("#memory").height();
			if (memory_top - header_top <= 50 && memory_top - header_top >= -memory_height) {
				$(".top_link").removeClass("active");
				$(".memory2_link").addClass("active");
			} else {
				$(".memory2_link").removeClass("active");
			}


			auto_top = $("#auto").offset().top;
			auto_height = $("#auto").height();
			if (auto_top - header_top <= 50 && auto_top - header_top >= -auto_height) {
				$(".top_link").removeClass("active");
				$(".auto_link").addClass("active");
			} else {
				$(".auto_link").removeClass("active");
			}

			company_top = $("#company").offset().top;
			company_height = $("#company").height();
			if (company_top - header_top <= 50 && company_top - header_top >= -company_height) {
				$(".top_link").removeClass("active");
				$(".company_link").addClass("active");
			} else {
				$(".company_link").removeClass("active");
			}


			questions_top = $("#questions").offset().top;
			questions_height = $("#questions").height();
			if (questions_top - header_top <= 50 && questions_top - header_top >= -questions_height) {
				$(".top_link").removeClass("active");
				$(".questions_link").addClass("active");
			} else {
				$(".questions_link").removeClass("active");
			}


			recall_top = $("#recall").offset().top;
			recall_height = $("#recall").height();
			if (recall_top - header_top <= 50 && recall_top - header_top >= -recall_height) {
				$(".top_link").removeClass("active");
				$(".recall_link").addClass("active");
			} else {
				$(".recall_link").removeClass("active");
			}


			contacts_top = $("#contacts").offset().top;
			contacts_height = $("#contacts").height();
			if (contacts_top - header_top <= 50 && contacts_top - header_top >= -contacts_height) {
				$(".top_link").removeClass("active");
				$(".contacts_link").addClass("active");
			} else {
				$(".contacts_link").removeClass("active");
			}
		}


	}

	$(window).scroll(function() {
		menu_scroll();
	});
	menu_scroll();




	$('select').styler({
		selectSmartPositioning: false
	});
});