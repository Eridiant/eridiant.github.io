document.addEventListener("DOMContentLoaded", function() {

	$("#form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
			$("#form").trigger("reset");
		});
		return false;
	});
	$(".linkMail").click(function(){
		$('#ModalMail').arcticmodal();
	});
	$(".linkCall").click(function(){
		$('#ModalCall').arcticmodal();
	});
	// $('.slider-nuts').slick({
	// 	// infinite: true
	// });


});
window.onload = function (e) {
	function parallax(event) {
		this.querySelectorAll('.paral').forEach(paral => {
			var speed = paral.getAttribute('data-speed');
			paral.style.transform = `translate(${event.clientX*speed/1000}px, ${event.clientY*speed/1000}px)`;
		});
		// console. log(event);
		// console.log(event.clientX);
		// console.log(event.clientY);
	}
	document.addEventListener('mousemove', parallax);

}
var btn_next = document.querySelector('.slider-btn');

var images = document.querySelectorAll('.slider-nuts img');
var text = document.querySelectorAll('.slider-text-item');
var i = 0;

btn_next.onclick = function(){
	images[i].classList.remove('showed');
	text[i].classList.remove('show');
	i = i + 1; /* i++ */
	 
	if(i >= images.length){
		i = 0;
	}
	 
	images[i].classList.add('showed');
	text[i].classList.add('show');
}
var text = document.querySelectorAll('.slider-text-item');