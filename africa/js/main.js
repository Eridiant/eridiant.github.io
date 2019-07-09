/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcblx0SHlwZXJzcGFjZSBieSBIVE1MNSBVUFxyXG5cdGh0bWw1dXAubmV0IHwgQGFqbGtuXHJcblx0RnJlZSBmb3IgcGVyc29uYWwgYW5kIGNvbW1lcmNpYWwgdXNlIHVuZGVyIHRoZSBDQ0EgMy4wIGxpY2Vuc2UgKGh0bWw1dXAubmV0L2xpY2Vuc2UpXHJcbiovXHJcblxyXG4oZnVuY3Rpb24oJCkge1xyXG5cclxuXHR2YXJcdCR3aW5kb3cgPSAkKHdpbmRvdyksXHJcblx0XHQkYm9keSA9ICQoJ2JvZHknKSxcclxuXHRcdCRzaWRlYmFyID0gJCgnI3NpZGViYXInKTtcclxuXHJcblx0Ly8gQnJlYWtwb2ludHMuXHJcblx0XHRicmVha3BvaW50cyh7XHJcblx0XHRcdHhsYXJnZTogICBbICcxMjgxcHgnLCAgJzE2ODBweCcgXSxcclxuXHRcdFx0bGFyZ2U6ICAgIFsgJzk4MXB4JywgICAnMTI4MHB4JyBdLFxyXG5cdFx0XHRtZWRpdW06ICAgWyAnNzM3cHgnLCAgICc5ODBweCcgIF0sXHJcblx0XHRcdHNtYWxsOiAgICBbICc0ODFweCcsICAgJzczNnB4JyAgXSxcclxuXHRcdFx0eHNtYWxsOiAgIFsgbnVsbCwgICAgICAnNDgwcHgnICBdXHJcblx0XHR9KTtcclxuXHJcblx0Ly8gSGFjazogRW5hYmxlIElFIGZsZXhib3ggd29ya2Fyb3VuZHMuXHJcblx0XHRpZiAoYnJvd3Nlci5uYW1lID09ICdpZScpXHJcblx0XHRcdCRib2R5LmFkZENsYXNzKCdpcy1pZScpO1xyXG5cclxuXHQvLyBQbGF5IGluaXRpYWwgYW5pbWF0aW9ucyBvbiBwYWdlIGxvYWQuXHJcblx0XHQkd2luZG93Lm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCRib2R5LnJlbW92ZUNsYXNzKCdpcy1wcmVsb2FkJyk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9KTtcclxuXHJcblx0Ly8gRm9ybXMuXHJcblxyXG5cdFx0Ly8gSGFjazogQWN0aXZhdGUgbm9uLWlucHV0IHN1Ym1pdHMuXHJcblx0XHRcdCQoJ2Zvcm0nKS5vbignY2xpY2snLCAnLnN1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdC8vIFN0b3AgcHJvcGFnYXRpb24sIGRlZmF1bHQuXHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdC8vIFN1Ym1pdCBmb3JtLlxyXG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnRzKCdmb3JtJykuc3VibWl0KCk7XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0Ly8gU2lkZWJhci5cclxuXHRcdGlmICgkc2lkZWJhci5sZW5ndGggPiAwKSB7XHJcblxyXG5cdFx0XHR2YXIgJHNpZGViYXJfYSA9ICRzaWRlYmFyLmZpbmQoJ2EnKTtcclxuXHJcblx0XHRcdCRzaWRlYmFyX2FcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3Njcm9sbHknKVxyXG5cdFx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0XHRcdC8vIEV4dGVybmFsIGxpbms/IEJhaWwuXHJcblx0XHRcdFx0XHRcdGlmICgkdGhpcy5hdHRyKCdocmVmJykuY2hhckF0KDApICE9ICcjJylcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0Ly8gRGVhY3RpdmF0ZSBhbGwgbGlua3MuXHJcblx0XHRcdFx0XHRcdCRzaWRlYmFyX2EucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHRcdC8vIEFjdGl2YXRlIGxpbmsgKmFuZCogbG9jayBpdCAoc28gU2Nyb2xsZXggZG9lc24ndCB0cnkgdG8gYWN0aXZhdGUgb3RoZXIgbGlua3MgYXMgd2UncmUgc2Nyb2xsaW5nIHRvIHRoaXMgb25lJ3Mgc2VjdGlvbikuXHJcblx0XHRcdFx0XHRcdCR0aGlzXHJcblx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKVxyXG5cdFx0XHRcdFx0XHRcdC5hZGRDbGFzcygnYWN0aXZlLWxvY2tlZCcpO1xyXG5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdHZhclx0JHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdFx0XHRpZCA9ICR0aGlzLmF0dHIoJ2hyZWYnKSxcclxuXHRcdFx0XHRcdFx0JHNlY3Rpb24gPSAkKGlkKTtcclxuXHJcblx0XHRcdFx0XHQvLyBObyBzZWN0aW9uIGZvciB0aGlzIGxpbms/IEJhaWwuXHJcblx0XHRcdFx0XHRcdGlmICgkc2VjdGlvbi5sZW5ndGggPCAxKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHQvLyBTY3JvbGxleC5cclxuXHRcdFx0XHRcdFx0JHNlY3Rpb24uc2Nyb2xsZXgoe1xyXG5cdFx0XHRcdFx0XHRcdG1vZGU6ICdtaWRkbGUnLFxyXG5cdFx0XHRcdFx0XHRcdHRvcDogJy0yMHZoJyxcclxuXHRcdFx0XHRcdFx0XHRib3R0b206ICctMjB2aCcsXHJcblx0XHRcdFx0XHRcdFx0aW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gRGVhY3RpdmF0ZSBzZWN0aW9uLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQkc2VjdGlvbi5hZGRDbGFzcygnaW5hY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRlbnRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gQWN0aXZhdGUgc2VjdGlvbi5cclxuXHRcdFx0XHRcdFx0XHRcdFx0JHNlY3Rpb24ucmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gTm8gbG9ja2VkIGxpbmtzPyBEZWFjdGl2YXRlIGFsbCBsaW5rcyBhbmQgYWN0aXZhdGUgdGhpcyBzZWN0aW9uJ3Mgb25lLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoJHNpZGViYXJfYS5maWx0ZXIoJy5hY3RpdmUtbG9ja2VkJykubGVuZ3RoID09IDApIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JHNpZGViYXJfYS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdC8vIE90aGVyd2lzZSwgaWYgdGhpcyBzZWN0aW9uJ3MgbGluayBpcyB0aGUgb25lIHRoYXQncyBsb2NrZWQsIHVubG9jayBpdC5cclxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ2FjdGl2ZS1sb2NrZWQnKSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQkdGhpcy5yZW1vdmVDbGFzcygnYWN0aXZlLWxvY2tlZCcpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHR9XHJcblxyXG5cdC8vIFNjcm9sbHkuXHJcblx0XHQkKCcuc2Nyb2xseScpLnNjcm9sbHkoe1xyXG5cdFx0XHRzcGVlZDogMTAwMCxcclxuXHRcdFx0b2Zmc2V0OiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0Ly8gSWYgPD1sYXJnZSwgPnNtYWxsLCBhbmQgc2lkZWJhciBpcyBwcmVzZW50LCB1c2UgaXRzIGhlaWdodCBhcyB0aGUgb2Zmc2V0LlxyXG5cdFx0XHRcdFx0aWYgKGJyZWFrcG9pbnRzLmFjdGl2ZSgnPD1sYXJnZScpXHJcblx0XHRcdFx0XHQmJlx0IWJyZWFrcG9pbnRzLmFjdGl2ZSgnPD1zbWFsbCcpXHJcblx0XHRcdFx0XHQmJlx0JHNpZGViYXIubGVuZ3RoID4gMClcclxuXHRcdFx0XHRcdFx0cmV0dXJuICRzaWRlYmFyLmhlaWdodCgpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gMDtcclxuXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHQvLyBTcG90bGlnaHRzLlxyXG5cdFx0JCgnLnNwb3RsaWdodHMgPiBzZWN0aW9uJylcclxuXHRcdFx0LnNjcm9sbGV4KHtcclxuXHRcdFx0XHRtb2RlOiAnbWlkZGxlJyxcclxuXHRcdFx0XHR0b3A6ICctMTB2aCcsXHJcblx0XHRcdFx0Ym90dG9tOiAnLTEwdmgnLFxyXG5cdFx0XHRcdGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdC8vIERlYWN0aXZhdGUgc2VjdGlvbi5cclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnaW5hY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRlbnRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQWN0aXZhdGUgc2VjdGlvbi5cclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0dmFyXHQkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0XHQkaW1hZ2UgPSAkdGhpcy5maW5kKCcuaW1hZ2UnKSxcclxuXHRcdFx0XHRcdCRpbWcgPSAkaW1hZ2UuZmluZCgnaW1nJyksXHJcblx0XHRcdFx0XHR4O1xyXG5cclxuXHRcdFx0XHQvLyBBc3NpZ24gaW1hZ2UuXHJcblx0XHRcdFx0XHQkaW1hZ2UuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybCgnICsgJGltZy5hdHRyKCdzcmMnKSArICcpJyk7XHJcblxyXG5cdFx0XHRcdC8vIFNldCBiYWNrZ3JvdW5kIHBvc2l0aW9uLlxyXG5cdFx0XHRcdFx0aWYgKHggPSAkaW1nLmRhdGEoJ3Bvc2l0aW9uJykpXHJcblx0XHRcdFx0XHRcdCRpbWFnZS5jc3MoJ2JhY2tncm91bmQtcG9zaXRpb24nLCB4KTtcclxuXHJcblx0XHRcdFx0Ly8gSGlkZSA8aW1nPi5cclxuXHRcdFx0XHRcdCRpbWcuaGlkZSgpO1xyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdC8vIEZlYXR1cmVzLlxyXG5cdFx0JCgnLmZlYXR1cmVzJylcclxuXHRcdFx0LnNjcm9sbGV4KHtcclxuXHRcdFx0XHRtb2RlOiAnbWlkZGxlJyxcclxuXHRcdFx0XHR0b3A6ICctMjB2aCcsXHJcblx0XHRcdFx0Ym90dG9tOiAnLTIwdmgnLFxyXG5cdFx0XHRcdGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdC8vIERlYWN0aXZhdGUgc2VjdGlvbi5cclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnaW5hY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRlbnRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQWN0aXZhdGUgc2VjdGlvbi5cclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcbn0pKGpRdWVyeSk7Il0sImZpbGUiOiJtYWluLmpzIn0=
