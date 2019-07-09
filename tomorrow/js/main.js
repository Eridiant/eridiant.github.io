$(document).ready(function(){
	$('.kit__fit').slick({
		centerMode: true,
		centerPadding: '0px',
		slidesToShow: 3,
		responsive: [
		{
			breakpoint: 768,
			settings: {
			arrows: false,
			centerMode: true,
			centerPadding: '0px',
			slidesToShow: 3
			}
		},
		{
			breakpoint: 480,
			settings: {
			arrows: false,
			centerMode: true,
			centerPadding: '0px',
			slidesToShow: 1
			}
		}
		]
	});
	$( "#tabs" ).tabs();


	$("#navToggle").click(function() {
	    $(this).toggleClass("active");
	    $(".overlay").toggleClass("open");
	    // this line ▼ prevents content scroll-behind
	    $("body").toggleClass("locked");
	});
	$('.overlay').click(function() {
	    $(this).removeClass('open');
	    $('.navBurger').removeClass('active');
	});

	$("#menu").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
	});

});

