(function($) {

	/**
	 * Generate an indented list of links from a nav. Meant for use with panel().
	 * @return {jQuery} jQuery object.
	 */
	$.fn.navList = function() {

		var	$this = $(this);
			$a = $this.find('a'),
			b = [];

		$a.each(function() {

			var	$this = $(this),
				indent = Math.max(0, $this.parents('li').length - 1),
				href = $this.attr('href'),
				target = $this.attr('target');

			b.push(
				'<a ' +
					'class="link depth-' + indent + '"' +
					( (typeof target !== 'undefined' && target != '') ? ' target="' + target + '"' : '') +
					( (typeof href !== 'undefined' && href != '') ? ' href="' + href + '"' : '') +
				'>' +
					'<span class="indent-' + indent + '"></span>' +
					$this.text() +
				'</a>'
			);

		});

		return b.join('');

	};

	/**
	 * Panel-ify an element.
	 * @param {object} userConfig User config.
	 * @return {jQuery} jQuery object.
	 */
	$.fn.panel = function(userConfig) {

		// No elements?
			if (this.length == 0)
				return $this;

		// Multiple elements?
			if (this.length > 1) {

				for (var i=0; i < this.length; i++)
					$(this[i]).panel(userConfig);

				return $this;

			}

		// Vars.
			var	$this = $(this),
				$body = $('body'),
				$window = $(window),
				id = $this.attr('id'),
				config;

		// Config.
			config = $.extend({

				// Delay.
					delay: 0,

				// Hide panel on link click.
					hideOnClick: false,

				// Hide panel on escape keypress.
					hideOnEscape: false,

				// Hide panel on swipe.
					hideOnSwipe: false,

				// Reset scroll position on hide.
					resetScroll: false,

				// Reset forms on hide.
					resetForms: false,

				// Side of viewport the panel will appear.
					side: null,

				// Target element for "class".
					target: $this,

				// Class to toggle.
					visibleClass: 'visible'

			}, userConfig);

			// Expand "target" if it's not a jQuery object already.
				if (typeof config.target != 'jQuery')
					config.target = $(config.target);

		// Panel.

			// Methods.
				$this._hide = function(event) {

					// Already hidden? Bail.
						if (!config.target.hasClass(config.visibleClass))
							return;

					// If an event was provided, cancel it.
						if (event) {

							event.preventDefault();
							event.stopPropagation();

						}

					// Hide.
						config.target.removeClass(config.visibleClass);

					// Post-hide stuff.
						window.setTimeout(function() {

							// Reset scroll position.
								if (config.resetScroll)
									$this.scrollTop(0);

							// Reset forms.
								if (config.resetForms)
									$this.find('form').each(function() {
										this.reset();
									});

						}, config.delay);

				};

			// Vendor fixes.
				$this
					.css('-ms-overflow-style', '-ms-autohiding-scrollbar')
					.css('-webkit-overflow-scrolling', 'touch');

			// Hide on click.
				if (config.hideOnClick) {

					$this.find('a')
						.css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');

					$this
						.on('click', 'a', function(event) {

							var $a = $(this),
								href = $a.attr('href'),
								target = $a.attr('target');

							if (!href || href == '#' || href == '' || href == '#' + id)
								return;

							// Cancel original event.
								event.preventDefault();
								event.stopPropagation();

							// Hide panel.
								$this._hide();

							// Redirect to href.
								window.setTimeout(function() {

									if (target == '_blank')
										window.open(href);
									else
										window.location.href = href;

								}, config.delay + 10);

						});

				}

			// Event: Touch stuff.
				$this.on('touchstart', function(event) {

					$this.touchPosX = event.originalEvent.touches[0].pageX;
					$this.touchPosY = event.originalEvent.touches[0].pageY;

				})

				$this.on('touchmove', function(event) {

					if ($this.touchPosX === null
					||	$this.touchPosY === null)
						return;

					var	diffX = $this.touchPosX - event.originalEvent.touches[0].pageX,
						diffY = $this.touchPosY - event.originalEvent.touches[0].pageY,
						th = $this.outerHeight(),
						ts = ($this.get(0).scrollHeight - $this.scrollTop());

					// Hide on swipe?
						if (config.hideOnSwipe) {

							var result = false,
								boundary = 20,
								delta = 50;

							switch (config.side) {

								case 'left':
									result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX > delta);
									break;

								case 'right':
									result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX < (-1 * delta));
									break;

								case 'top':
									result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY > delta);
									break;

								case 'bottom':
									result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY < (-1 * delta));
									break;

								default:
									break;

							}

							if (result) {

								$this.touchPosX = null;
								$this.touchPosY = null;
								$this._hide();

								return false;

							}

						}

					// Prevent vertical scrolling past the top or bottom.
						if (($this.scrollTop() < 0 && diffY < 0)
						|| (ts > (th - 2) && ts < (th + 2) && diffY > 0)) {

							event.preventDefault();
							event.stopPropagation();

						}

				});

			// Event: Prevent certain events inside the panel from bubbling.
				$this.on('click touchend touchstart touchmove', function(event) {
					event.stopPropagation();
				});

			// Event: Hide panel if a child anchor tag pointing to its ID is clicked.
				$this.on('click', 'a[href="#' + id + '"]', function(event) {

					event.preventDefault();
					event.stopPropagation();

					config.target.removeClass(config.visibleClass);

				});

		// Body.

			// Event: Hide panel on body click/tap.
				$body.on('click touchend', function(event) {
					$this._hide(event);
				});

			// Event: Toggle.
				$body.on('click', 'a[href="#' + id + '"]', function(event) {

					event.preventDefault();
					event.stopPropagation();

					config.target.toggleClass(config.visibleClass);

				});

		// Window.

			// Event: Hide on ESC.
				if (config.hideOnEscape)
					$window.on('keydown', function(event) {

						if (event.keyCode == 27)
							$this._hide(event);

					});

		return $this;

	};

	/**
	 * Apply "placeholder" attribute polyfill to one or more forms.
	 * @return {jQuery} jQuery object.
	 */
	$.fn.placeholder = function() {

		// Browser natively supports placeholders? Bail.
			if (typeof (document.createElement('input')).placeholder != 'undefined')
				return $(this);

		// No elements?
			if (this.length == 0)
				return $this;

		// Multiple elements?
			if (this.length > 1) {

				for (var i=0; i < this.length; i++)
					$(this[i]).placeholder();

				return $this;

			}

		// Vars.
			var $this = $(this);

		// Text, TextArea.
			$this.find('input[type=text],textarea')
				.each(function() {

					var i = $(this);

					if (i.val() == ''
					||  i.val() == i.attr('placeholder'))
						i
							.addClass('polyfill-placeholder')
							.val(i.attr('placeholder'));

				})
				.on('blur', function() {

					var i = $(this);

					if (i.attr('name').match(/-polyfill-field$/))
						return;

					if (i.val() == '')
						i
							.addClass('polyfill-placeholder')
							.val(i.attr('placeholder'));

				})
				.on('focus', function() {

					var i = $(this);

					if (i.attr('name').match(/-polyfill-field$/))
						return;

					if (i.val() == i.attr('placeholder'))
						i
							.removeClass('polyfill-placeholder')
							.val('');

				});

		// Password.
			$this.find('input[type=password]')
				.each(function() {

					var i = $(this);
					var x = $(
								$('<div>')
									.append(i.clone())
									.remove()
									.html()
									.replace(/type="password"/i, 'type="text"')
									.replace(/type=password/i, 'type=text')
					);

					if (i.attr('id') != '')
						x.attr('id', i.attr('id') + '-polyfill-field');

					if (i.attr('name') != '')
						x.attr('name', i.attr('name') + '-polyfill-field');

					x.addClass('polyfill-placeholder')
						.val(x.attr('placeholder')).insertAfter(i);

					if (i.val() == '')
						i.hide();
					else
						x.hide();

					i
						.on('blur', function(event) {

							event.preventDefault();

							var x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

							if (i.val() == '') {

								i.hide();
								x.show();

							}

						});

					x
						.on('focus', function(event) {

							event.preventDefault();

							var i = x.parent().find('input[name=' + x.attr('name').replace('-polyfill-field', '') + ']');

							x.hide();

							i
								.show()
								.focus();

						})
						.on('keypress', function(event) {

							event.preventDefault();
							x.val('');

						});

				});

		// Events.
			$this
				.on('submit', function() {

					$this.find('input[type=text],input[type=password],textarea')
						.each(function(event) {

							var i = $(this);

							if (i.attr('name').match(/-polyfill-field$/))
								i.attr('name', '');

							if (i.val() == i.attr('placeholder')) {

								i.removeClass('polyfill-placeholder');
								i.val('');

							}

						});

				})
				.on('reset', function(event) {

					event.preventDefault();

					$this.find('select')
						.val($('option:first').val());

					$this.find('input,textarea')
						.each(function() {

							var i = $(this),
								x;

							i.removeClass('polyfill-placeholder');

							switch (this.type) {

								case 'submit':
								case 'reset':
									break;

								case 'password':
									i.val(i.attr('defaultValue'));

									x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

									if (i.val() == '') {
										i.hide();
										x.show();
									}
									else {
										i.show();
										x.hide();
									}

									break;

								case 'checkbox':
								case 'radio':
									i.attr('checked', i.attr('defaultValue'));
									break;

								case 'text':
								case 'textarea':
									i.val(i.attr('defaultValue'));

									if (i.val() == '') {
										i.addClass('polyfill-placeholder');
										i.val(i.attr('placeholder'));
									}

									break;

								default:
									i.val(i.attr('defaultValue'));
									break;

							}
						});

				});

		return $this;

	};

	/**
	 * Moves elements to/from the first positions of their respective parents.
	 * @param {jQuery} $elements Elements (or selector) to move.
	 * @param {bool} condition If true, moves elements to the top. Otherwise, moves elements back to their original locations.
	 */
	$.prioritize = function($elements, condition) {

		var key = '__prioritize';

		// Expand $elements if it's not already a jQuery object.
			if (typeof $elements != 'jQuery')
				$elements = $($elements);

		// Step through elements.
			$elements.each(function() {

				var	$e = $(this), $p,
					$parent = $e.parent();

				// No parent? Bail.
					if ($parent.length == 0)
						return;

				// Not moved? Move it.
					if (!$e.data(key)) {

						// Condition is false? Bail.
							if (!condition)
								return;

						// Get placeholder (which will serve as our point of reference for when this element needs to move back).
							$p = $e.prev();

							// Couldn't find anything? Means this element's already at the top, so bail.
								if ($p.length == 0)
									return;

						// Move element to top of parent.
							$e.prependTo($parent);

						// Mark element as moved.
							$e.data(key, $p);

					}

				// Moved already?
					else {

						// Condition is true? Bail.
							if (condition)
								return;

						$p = $e.data(key);

						// Move element back to its original location (using our placeholder).
							$e.insertAfter($p);

						// Unmark element as moved.
							$e.removeData(key);

					}

			});

	};

})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdlbmVyYXRlIGFuIGluZGVudGVkIGxpc3Qgb2YgbGlua3MgZnJvbSBhIG5hdi4gTWVhbnQgZm9yIHVzZSB3aXRoIHBhbmVsKCkuXHJcblx0ICogQHJldHVybiB7alF1ZXJ5fSBqUXVlcnkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdCQuZm4ubmF2TGlzdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhclx0JHRoaXMgPSAkKHRoaXMpO1xyXG5cdFx0XHQkYSA9ICR0aGlzLmZpbmQoJ2EnKSxcclxuXHRcdFx0YiA9IFtdO1xyXG5cclxuXHRcdCRhLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR2YXJcdCR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHRpbmRlbnQgPSBNYXRoLm1heCgwLCAkdGhpcy5wYXJlbnRzKCdsaScpLmxlbmd0aCAtIDEpLFxyXG5cdFx0XHRcdGhyZWYgPSAkdGhpcy5hdHRyKCdocmVmJyksXHJcblx0XHRcdFx0dGFyZ2V0ID0gJHRoaXMuYXR0cigndGFyZ2V0Jyk7XHJcblxyXG5cdFx0XHRiLnB1c2goXHJcblx0XHRcdFx0JzxhICcgK1xyXG5cdFx0XHRcdFx0J2NsYXNzPVwibGluayBkZXB0aC0nICsgaW5kZW50ICsgJ1wiJyArXHJcblx0XHRcdFx0XHQoICh0eXBlb2YgdGFyZ2V0ICE9PSAndW5kZWZpbmVkJyAmJiB0YXJnZXQgIT0gJycpID8gJyB0YXJnZXQ9XCInICsgdGFyZ2V0ICsgJ1wiJyA6ICcnKSArXHJcblx0XHRcdFx0XHQoICh0eXBlb2YgaHJlZiAhPT0gJ3VuZGVmaW5lZCcgJiYgaHJlZiAhPSAnJykgPyAnIGhyZWY9XCInICsgaHJlZiArICdcIicgOiAnJykgK1xyXG5cdFx0XHRcdCc+JyArXHJcblx0XHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJpbmRlbnQtJyArIGluZGVudCArICdcIj48L3NwYW4+JyArXHJcblx0XHRcdFx0XHQkdGhpcy50ZXh0KCkgK1xyXG5cdFx0XHRcdCc8L2E+J1xyXG5cdFx0XHQpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBiLmpvaW4oJycpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBQYW5lbC1pZnkgYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0ge29iamVjdH0gdXNlckNvbmZpZyBVc2VyIGNvbmZpZy5cclxuXHQgKiBAcmV0dXJuIHtqUXVlcnl9IGpRdWVyeSBvYmplY3QuXHJcblx0ICovXHJcblx0JC5mbi5wYW5lbCA9IGZ1bmN0aW9uKHVzZXJDb25maWcpIHtcclxuXHJcblx0XHQvLyBObyBlbGVtZW50cz9cclxuXHRcdFx0aWYgKHRoaXMubGVuZ3RoID09IDApXHJcblx0XHRcdFx0cmV0dXJuICR0aGlzO1xyXG5cclxuXHRcdC8vIE11bHRpcGxlIGVsZW1lbnRzP1xyXG5cdFx0XHRpZiAodGhpcy5sZW5ndGggPiAxKSB7XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspXHJcblx0XHRcdFx0XHQkKHRoaXNbaV0pLnBhbmVsKHVzZXJDb25maWcpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0Ly8gVmFycy5cclxuXHRcdFx0dmFyXHQkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0JGJvZHkgPSAkKCdib2R5JyksXHJcblx0XHRcdFx0JHdpbmRvdyA9ICQod2luZG93KSxcclxuXHRcdFx0XHRpZCA9ICR0aGlzLmF0dHIoJ2lkJyksXHJcblx0XHRcdFx0Y29uZmlnO1xyXG5cclxuXHRcdC8vIENvbmZpZy5cclxuXHRcdFx0Y29uZmlnID0gJC5leHRlbmQoe1xyXG5cclxuXHRcdFx0XHQvLyBEZWxheS5cclxuXHRcdFx0XHRcdGRlbGF5OiAwLFxyXG5cclxuXHRcdFx0XHQvLyBIaWRlIHBhbmVsIG9uIGxpbmsgY2xpY2suXHJcblx0XHRcdFx0XHRoaWRlT25DbGljazogZmFsc2UsXHJcblxyXG5cdFx0XHRcdC8vIEhpZGUgcGFuZWwgb24gZXNjYXBlIGtleXByZXNzLlxyXG5cdFx0XHRcdFx0aGlkZU9uRXNjYXBlOiBmYWxzZSxcclxuXHJcblx0XHRcdFx0Ly8gSGlkZSBwYW5lbCBvbiBzd2lwZS5cclxuXHRcdFx0XHRcdGhpZGVPblN3aXBlOiBmYWxzZSxcclxuXHJcblx0XHRcdFx0Ly8gUmVzZXQgc2Nyb2xsIHBvc2l0aW9uIG9uIGhpZGUuXHJcblx0XHRcdFx0XHRyZXNldFNjcm9sbDogZmFsc2UsXHJcblxyXG5cdFx0XHRcdC8vIFJlc2V0IGZvcm1zIG9uIGhpZGUuXHJcblx0XHRcdFx0XHRyZXNldEZvcm1zOiBmYWxzZSxcclxuXHJcblx0XHRcdFx0Ly8gU2lkZSBvZiB2aWV3cG9ydCB0aGUgcGFuZWwgd2lsbCBhcHBlYXIuXHJcblx0XHRcdFx0XHRzaWRlOiBudWxsLFxyXG5cclxuXHRcdFx0XHQvLyBUYXJnZXQgZWxlbWVudCBmb3IgXCJjbGFzc1wiLlxyXG5cdFx0XHRcdFx0dGFyZ2V0OiAkdGhpcyxcclxuXHJcblx0XHRcdFx0Ly8gQ2xhc3MgdG8gdG9nZ2xlLlxyXG5cdFx0XHRcdFx0dmlzaWJsZUNsYXNzOiAndmlzaWJsZSdcclxuXHJcblx0XHRcdH0sIHVzZXJDb25maWcpO1xyXG5cclxuXHRcdFx0Ly8gRXhwYW5kIFwidGFyZ2V0XCIgaWYgaXQncyBub3QgYSBqUXVlcnkgb2JqZWN0IGFscmVhZHkuXHJcblx0XHRcdFx0aWYgKHR5cGVvZiBjb25maWcudGFyZ2V0ICE9ICdqUXVlcnknKVxyXG5cdFx0XHRcdFx0Y29uZmlnLnRhcmdldCA9ICQoY29uZmlnLnRhcmdldCk7XHJcblxyXG5cdFx0Ly8gUGFuZWwuXHJcblxyXG5cdFx0XHQvLyBNZXRob2RzLlxyXG5cdFx0XHRcdCR0aGlzLl9oaWRlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHQvLyBBbHJlYWR5IGhpZGRlbj8gQmFpbC5cclxuXHRcdFx0XHRcdFx0aWYgKCFjb25maWcudGFyZ2V0Lmhhc0NsYXNzKGNvbmZpZy52aXNpYmxlQ2xhc3MpKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHQvLyBJZiBhbiBldmVudCB3YXMgcHJvdmlkZWQsIGNhbmNlbCBpdC5cclxuXHRcdFx0XHRcdFx0aWYgKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gSGlkZS5cclxuXHRcdFx0XHRcdFx0Y29uZmlnLnRhcmdldC5yZW1vdmVDbGFzcyhjb25maWcudmlzaWJsZUNsYXNzKTtcclxuXHJcblx0XHRcdFx0XHQvLyBQb3N0LWhpZGUgc3R1ZmYuXHJcblx0XHRcdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBSZXNldCBzY3JvbGwgcG9zaXRpb24uXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoY29uZmlnLnJlc2V0U2Nyb2xsKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQkdGhpcy5zY3JvbGxUb3AoMCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIFJlc2V0IGZvcm1zLlxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpZy5yZXNldEZvcm1zKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQkdGhpcy5maW5kKCdmb3JtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnJlc2V0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0fSwgY29uZmlnLmRlbGF5KTtcclxuXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIFZlbmRvciBmaXhlcy5cclxuXHRcdFx0XHQkdGhpc1xyXG5cdFx0XHRcdFx0LmNzcygnLW1zLW92ZXJmbG93LXN0eWxlJywgJy1tcy1hdXRvaGlkaW5nLXNjcm9sbGJhcicpXHJcblx0XHRcdFx0XHQuY3NzKCctd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZycsICd0b3VjaCcpO1xyXG5cclxuXHRcdFx0Ly8gSGlkZSBvbiBjbGljay5cclxuXHRcdFx0XHRpZiAoY29uZmlnLmhpZGVPbkNsaWNrKSB7XHJcblxyXG5cdFx0XHRcdFx0JHRoaXMuZmluZCgnYScpXHJcblx0XHRcdFx0XHRcdC5jc3MoJy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcicsICdyZ2JhKDAsMCwwLDApJyk7XHJcblxyXG5cdFx0XHRcdFx0JHRoaXNcclxuXHRcdFx0XHRcdFx0Lm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyICRhID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdFx0XHRcdGhyZWYgPSAkYS5hdHRyKCdocmVmJyksXHJcblx0XHRcdFx0XHRcdFx0XHR0YXJnZXQgPSAkYS5hdHRyKCd0YXJnZXQnKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKCFocmVmIHx8IGhyZWYgPT0gJyMnIHx8IGhyZWYgPT0gJycgfHwgaHJlZiA9PSAnIycgKyBpZClcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gQ2FuY2VsIG9yaWdpbmFsIGV2ZW50LlxyXG5cdFx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBIaWRlIHBhbmVsLlxyXG5cdFx0XHRcdFx0XHRcdFx0JHRoaXMuX2hpZGUoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gUmVkaXJlY3QgdG8gaHJlZi5cclxuXHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRhcmdldCA9PSAnX2JsYW5rJylcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3cub3BlbihocmVmKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaHJlZjtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHR9LCBjb25maWcuZGVsYXkgKyAxMCk7XHJcblxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IFRvdWNoIHN0dWZmLlxyXG5cdFx0XHRcdCR0aGlzLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHQkdGhpcy50b3VjaFBvc1ggPSBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0ucGFnZVg7XHJcblx0XHRcdFx0XHQkdGhpcy50b3VjaFBvc1kgPSBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0ucGFnZVk7XHJcblxyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRcdCR0aGlzLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdGlmICgkdGhpcy50b3VjaFBvc1ggPT09IG51bGxcclxuXHRcdFx0XHRcdHx8XHQkdGhpcy50b3VjaFBvc1kgPT09IG51bGwpXHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHR2YXJcdGRpZmZYID0gJHRoaXMudG91Y2hQb3NYIC0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLnBhZ2VYLFxyXG5cdFx0XHRcdFx0XHRkaWZmWSA9ICR0aGlzLnRvdWNoUG9zWSAtIGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5wYWdlWSxcclxuXHRcdFx0XHRcdFx0dGggPSAkdGhpcy5vdXRlckhlaWdodCgpLFxyXG5cdFx0XHRcdFx0XHR0cyA9ICgkdGhpcy5nZXQoMCkuc2Nyb2xsSGVpZ2h0IC0gJHRoaXMuc2Nyb2xsVG9wKCkpO1xyXG5cclxuXHRcdFx0XHRcdC8vIEhpZGUgb24gc3dpcGU/XHJcblx0XHRcdFx0XHRcdGlmIChjb25maWcuaGlkZU9uU3dpcGUpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0Ym91bmRhcnkgPSAyMCxcclxuXHRcdFx0XHRcdFx0XHRcdGRlbHRhID0gNTA7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAoY29uZmlnLnNpZGUpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdsZWZ0JzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gKGRpZmZZIDwgYm91bmRhcnkgJiYgZGlmZlkgPiAoLTEgKiBib3VuZGFyeSkpICYmIChkaWZmWCA+IGRlbHRhKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAncmlnaHQnOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSAoZGlmZlkgPCBib3VuZGFyeSAmJiBkaWZmWSA+ICgtMSAqIGJvdW5kYXJ5KSkgJiYgKGRpZmZYIDwgKC0xICogZGVsdGEpKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAndG9wJzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gKGRpZmZYIDwgYm91bmRhcnkgJiYgZGlmZlggPiAoLTEgKiBib3VuZGFyeSkpICYmIChkaWZmWSA+IGRlbHRhKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAnYm90dG9tJzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gKGRpZmZYIDwgYm91bmRhcnkgJiYgZGlmZlggPiAoLTEgKiBib3VuZGFyeSkpICYmIChkaWZmWSA8ICgtMSAqIGRlbHRhKSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQkdGhpcy50b3VjaFBvc1ggPSBudWxsO1xyXG5cdFx0XHRcdFx0XHRcdFx0JHRoaXMudG91Y2hQb3NZID0gbnVsbDtcclxuXHRcdFx0XHRcdFx0XHRcdCR0aGlzLl9oaWRlKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gUHJldmVudCB2ZXJ0aWNhbCBzY3JvbGxpbmcgcGFzdCB0aGUgdG9wIG9yIGJvdHRvbS5cclxuXHRcdFx0XHRcdFx0aWYgKCgkdGhpcy5zY3JvbGxUb3AoKSA8IDAgJiYgZGlmZlkgPCAwKVxyXG5cdFx0XHRcdFx0XHR8fCAodHMgPiAodGggLSAyKSAmJiB0cyA8ICh0aCArIDIpICYmIGRpZmZZID4gMCkpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBFdmVudDogUHJldmVudCBjZXJ0YWluIGV2ZW50cyBpbnNpZGUgdGhlIHBhbmVsIGZyb20gYnViYmxpbmcuXHJcblx0XHRcdFx0JHRoaXMub24oJ2NsaWNrIHRvdWNoZW5kIHRvdWNoc3RhcnQgdG91Y2htb3ZlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IEhpZGUgcGFuZWwgaWYgYSBjaGlsZCBhbmNob3IgdGFnIHBvaW50aW5nIHRvIGl0cyBJRCBpcyBjbGlja2VkLlxyXG5cdFx0XHRcdCR0aGlzLm9uKCdjbGljaycsICdhW2hyZWY9XCIjJyArIGlkICsgJ1wiXScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0XHRcdGNvbmZpZy50YXJnZXQucmVtb3ZlQ2xhc3MoY29uZmlnLnZpc2libGVDbGFzcyk7XHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdC8vIEJvZHkuXHJcblxyXG5cdFx0XHQvLyBFdmVudDogSGlkZSBwYW5lbCBvbiBib2R5IGNsaWNrL3RhcC5cclxuXHRcdFx0XHQkYm9keS5vbignY2xpY2sgdG91Y2hlbmQnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdFx0JHRoaXMuX2hpZGUoZXZlbnQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IFRvZ2dsZS5cclxuXHRcdFx0XHQkYm9keS5vbignY2xpY2snLCAnYVtocmVmPVwiIycgKyBpZCArICdcIl0nLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdFx0XHRjb25maWcudGFyZ2V0LnRvZ2dsZUNsYXNzKGNvbmZpZy52aXNpYmxlQ2xhc3MpO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHQvLyBXaW5kb3cuXHJcblxyXG5cdFx0XHQvLyBFdmVudDogSGlkZSBvbiBFU0MuXHJcblx0XHRcdFx0aWYgKGNvbmZpZy5oaWRlT25Fc2NhcGUpXHJcblx0XHRcdFx0XHQkd2luZG93Lm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChldmVudC5rZXlDb2RlID09IDI3KVxyXG5cdFx0XHRcdFx0XHRcdCR0aGlzLl9oaWRlKGV2ZW50KTtcclxuXHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFwcGx5IFwicGxhY2Vob2xkZXJcIiBhdHRyaWJ1dGUgcG9seWZpbGwgdG8gb25lIG9yIG1vcmUgZm9ybXMuXHJcblx0ICogQHJldHVybiB7alF1ZXJ5fSBqUXVlcnkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdCQuZm4ucGxhY2Vob2xkZXIgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyBCcm93c2VyIG5hdGl2ZWx5IHN1cHBvcnRzIHBsYWNlaG9sZGVycz8gQmFpbC5cclxuXHRcdFx0aWYgKHR5cGVvZiAoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSkucGxhY2Vob2xkZXIgIT0gJ3VuZGVmaW5lZCcpXHJcblx0XHRcdFx0cmV0dXJuICQodGhpcyk7XHJcblxyXG5cdFx0Ly8gTm8gZWxlbWVudHM/XHJcblx0XHRcdGlmICh0aGlzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRcdHJldHVybiAkdGhpcztcclxuXHJcblx0XHQvLyBNdWx0aXBsZSBlbGVtZW50cz9cclxuXHRcdFx0aWYgKHRoaXMubGVuZ3RoID4gMSkge1xyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdFx0JCh0aGlzW2ldKS5wbGFjZWhvbGRlcigpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0Ly8gVmFycy5cclxuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcblx0XHQvLyBUZXh0LCBUZXh0QXJlYS5cclxuXHRcdFx0JHRoaXMuZmluZCgnaW5wdXRbdHlwZT10ZXh0XSx0ZXh0YXJlYScpXHJcblx0XHRcdFx0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGkgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLnZhbCgpID09ICcnXHJcblx0XHRcdFx0XHR8fCAgaS52YWwoKSA9PSBpLmF0dHIoJ3BsYWNlaG9sZGVyJykpXHJcblx0XHRcdFx0XHRcdGlcclxuXHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJylcclxuXHRcdFx0XHRcdFx0XHQudmFsKGkuYXR0cigncGxhY2Vob2xkZXInKSk7XHJcblxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGkgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLmF0dHIoJ25hbWUnKS5tYXRjaCgvLXBvbHlmaWxsLWZpZWxkJC8pKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkudmFsKCkgPT0gJycpXHJcblx0XHRcdFx0XHRcdGlcclxuXHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJylcclxuXHRcdFx0XHRcdFx0XHQudmFsKGkuYXR0cigncGxhY2Vob2xkZXInKSk7XHJcblxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBpID0gJCh0aGlzKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaS5hdHRyKCduYW1lJykubWF0Y2goLy1wb2x5ZmlsbC1maWVsZCQvKSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLnZhbCgpID09IGkuYXR0cigncGxhY2Vob2xkZXInKSlcclxuXHRcdFx0XHRcdFx0aVxyXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygncG9seWZpbGwtcGxhY2Vob2xkZXInKVxyXG5cdFx0XHRcdFx0XHRcdC52YWwoJycpO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHQvLyBQYXNzd29yZC5cclxuXHRcdFx0JHRoaXMuZmluZCgnaW5wdXRbdHlwZT1wYXNzd29yZF0nKVxyXG5cdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBpID0gJCh0aGlzKTtcclxuXHRcdFx0XHRcdHZhciB4ID0gJChcclxuXHRcdFx0XHRcdFx0XHRcdCQoJzxkaXY+JylcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmFwcGVuZChpLmNsb25lKCkpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5yZW1vdmUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuaHRtbCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC90eXBlPVwicGFzc3dvcmRcIi9pLCAndHlwZT1cInRleHRcIicpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC90eXBlPXBhc3N3b3JkL2ksICd0eXBlPXRleHQnKVxyXG5cdFx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaS5hdHRyKCdpZCcpICE9ICcnKVxyXG5cdFx0XHRcdFx0XHR4LmF0dHIoJ2lkJywgaS5hdHRyKCdpZCcpICsgJy1wb2x5ZmlsbC1maWVsZCcpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLmF0dHIoJ25hbWUnKSAhPSAnJylcclxuXHRcdFx0XHRcdFx0eC5hdHRyKCduYW1lJywgaS5hdHRyKCduYW1lJykgKyAnLXBvbHlmaWxsLWZpZWxkJyk7XHJcblxyXG5cdFx0XHRcdFx0eC5hZGRDbGFzcygncG9seWZpbGwtcGxhY2Vob2xkZXInKVxyXG5cdFx0XHRcdFx0XHQudmFsKHguYXR0cigncGxhY2Vob2xkZXInKSkuaW5zZXJ0QWZ0ZXIoaSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkudmFsKCkgPT0gJycpXHJcblx0XHRcdFx0XHRcdGkuaGlkZSgpO1xyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHR4LmhpZGUoKTtcclxuXHJcblx0XHRcdFx0XHRpXHJcblx0XHRcdFx0XHRcdC5vbignYmx1cicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciB4ID0gaS5wYXJlbnQoKS5maW5kKCdpbnB1dFtuYW1lPScgKyBpLmF0dHIoJ25hbWUnKSArICctcG9seWZpbGwtZmllbGRdJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChpLnZhbCgpID09ICcnKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aS5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR4LnNob3coKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0eFxyXG5cdFx0XHRcdFx0XHQub24oJ2ZvY3VzJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGkgPSB4LnBhcmVudCgpLmZpbmQoJ2lucHV0W25hbWU9JyArIHguYXR0cignbmFtZScpLnJlcGxhY2UoJy1wb2x5ZmlsbC1maWVsZCcsICcnKSArICddJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHguaGlkZSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpXHJcblx0XHRcdFx0XHRcdFx0XHQuc2hvdygpXHJcblx0XHRcdFx0XHRcdFx0XHQuZm9jdXMoKTtcclxuXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC5vbigna2V5cHJlc3MnLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHRcdHgudmFsKCcnKTtcclxuXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHQvLyBFdmVudHMuXHJcblx0XHRcdCR0aGlzXHJcblx0XHRcdFx0Lm9uKCdzdWJtaXQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHQkdGhpcy5maW5kKCdpbnB1dFt0eXBlPXRleHRdLGlucHV0W3R5cGU9cGFzc3dvcmRdLHRleHRhcmVhJylcclxuXHRcdFx0XHRcdFx0LmVhY2goZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGkgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoaS5hdHRyKCduYW1lJykubWF0Y2goLy1wb2x5ZmlsbC1maWVsZCQvKSlcclxuXHRcdFx0XHRcdFx0XHRcdGkuYXR0cignbmFtZScsICcnKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKGkudmFsKCkgPT0gaS5hdHRyKCdwbGFjZWhvbGRlcicpKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aS5yZW1vdmVDbGFzcygncG9seWZpbGwtcGxhY2Vob2xkZXInKTtcclxuXHRcdFx0XHRcdFx0XHRcdGkudmFsKCcnKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdyZXNldCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0XHQkdGhpcy5maW5kKCdzZWxlY3QnKVxyXG5cdFx0XHRcdFx0XHQudmFsKCQoJ29wdGlvbjpmaXJzdCcpLnZhbCgpKTtcclxuXHJcblx0XHRcdFx0XHQkdGhpcy5maW5kKCdpbnB1dCx0ZXh0YXJlYScpXHJcblx0XHRcdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgaSA9ICQodGhpcyksXHJcblx0XHRcdFx0XHRcdFx0XHR4O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpLnJlbW92ZUNsYXNzKCdwb2x5ZmlsbC1wbGFjZWhvbGRlcicpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3N1Ym1pdCc6XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdyZXNldCc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3Bhc3N3b3JkJzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0aS52YWwoaS5hdHRyKCdkZWZhdWx0VmFsdWUnKSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHR4ID0gaS5wYXJlbnQoKS5maW5kKCdpbnB1dFtuYW1lPScgKyBpLmF0dHIoJ25hbWUnKSArICctcG9seWZpbGwtZmllbGRdJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaS52YWwoKSA9PSAnJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGkuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHguc2hvdygpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGkuc2hvdygpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHguaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdjaGVja2JveCc6XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdyYWRpbyc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGkuYXR0cignY2hlY2tlZCcsIGkuYXR0cignZGVmYXVsdFZhbHVlJykpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICd0ZXh0JzpcclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3RleHRhcmVhJzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0aS52YWwoaS5hdHRyKCdkZWZhdWx0VmFsdWUnKSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaS52YWwoKSA9PSAnJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGkuYWRkQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aS52YWwoaS5hdHRyKCdwbGFjZWhvbGRlcicpKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0XHRcdFx0aS52YWwoaS5hdHRyKCdkZWZhdWx0VmFsdWUnKSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmVzIGVsZW1lbnRzIHRvL2Zyb20gdGhlIGZpcnN0IHBvc2l0aW9ucyBvZiB0aGVpciByZXNwZWN0aXZlIHBhcmVudHMuXHJcblx0ICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtZW50cyBFbGVtZW50cyAob3Igc2VsZWN0b3IpIHRvIG1vdmUuXHJcblx0ICogQHBhcmFtIHtib29sfSBjb25kaXRpb24gSWYgdHJ1ZSwgbW92ZXMgZWxlbWVudHMgdG8gdGhlIHRvcC4gT3RoZXJ3aXNlLCBtb3ZlcyBlbGVtZW50cyBiYWNrIHRvIHRoZWlyIG9yaWdpbmFsIGxvY2F0aW9ucy5cclxuXHQgKi9cclxuXHQkLnByaW9yaXRpemUgPSBmdW5jdGlvbigkZWxlbWVudHMsIGNvbmRpdGlvbikge1xyXG5cclxuXHRcdHZhciBrZXkgPSAnX19wcmlvcml0aXplJztcclxuXHJcblx0XHQvLyBFeHBhbmQgJGVsZW1lbnRzIGlmIGl0J3Mgbm90IGFscmVhZHkgYSBqUXVlcnkgb2JqZWN0LlxyXG5cdFx0XHRpZiAodHlwZW9mICRlbGVtZW50cyAhPSAnalF1ZXJ5JylcclxuXHRcdFx0XHQkZWxlbWVudHMgPSAkKCRlbGVtZW50cyk7XHJcblxyXG5cdFx0Ly8gU3RlcCB0aHJvdWdoIGVsZW1lbnRzLlxyXG5cdFx0XHQkZWxlbWVudHMuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0dmFyXHQkZSA9ICQodGhpcyksICRwLFxyXG5cdFx0XHRcdFx0JHBhcmVudCA9ICRlLnBhcmVudCgpO1xyXG5cclxuXHRcdFx0XHQvLyBObyBwYXJlbnQ/IEJhaWwuXHJcblx0XHRcdFx0XHRpZiAoJHBhcmVudC5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHQvLyBOb3QgbW92ZWQ/IE1vdmUgaXQuXHJcblx0XHRcdFx0XHRpZiAoISRlLmRhdGEoa2V5KSkge1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gQ29uZGl0aW9uIGlzIGZhbHNlPyBCYWlsLlxyXG5cdFx0XHRcdFx0XHRcdGlmICghY29uZGl0aW9uKVxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gR2V0IHBsYWNlaG9sZGVyICh3aGljaCB3aWxsIHNlcnZlIGFzIG91ciBwb2ludCBvZiByZWZlcmVuY2UgZm9yIHdoZW4gdGhpcyBlbGVtZW50IG5lZWRzIHRvIG1vdmUgYmFjaykuXHJcblx0XHRcdFx0XHRcdFx0JHAgPSAkZS5wcmV2KCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIENvdWxkbid0IGZpbmQgYW55dGhpbmc/IE1lYW5zIHRoaXMgZWxlbWVudCdzIGFscmVhZHkgYXQgdGhlIHRvcCwgc28gYmFpbC5cclxuXHRcdFx0XHRcdFx0XHRcdGlmICgkcC5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gTW92ZSBlbGVtZW50IHRvIHRvcCBvZiBwYXJlbnQuXHJcblx0XHRcdFx0XHRcdFx0JGUucHJlcGVuZFRvKCRwYXJlbnQpO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gTWFyayBlbGVtZW50IGFzIG1vdmVkLlxyXG5cdFx0XHRcdFx0XHRcdCRlLmRhdGEoa2V5LCAkcCk7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBNb3ZlZCBhbHJlYWR5P1xyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBDb25kaXRpb24gaXMgdHJ1ZT8gQmFpbC5cclxuXHRcdFx0XHRcdFx0XHRpZiAoY29uZGl0aW9uKVxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFx0JHAgPSAkZS5kYXRhKGtleSk7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBNb3ZlIGVsZW1lbnQgYmFjayB0byBpdHMgb3JpZ2luYWwgbG9jYXRpb24gKHVzaW5nIG91ciBwbGFjZWhvbGRlcikuXHJcblx0XHRcdFx0XHRcdFx0JGUuaW5zZXJ0QWZ0ZXIoJHApO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gVW5tYXJrIGVsZW1lbnQgYXMgbW92ZWQuXHJcblx0XHRcdFx0XHRcdFx0JGUucmVtb3ZlRGF0YShrZXkpO1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5KTsiXSwiZmlsZSI6InV0aWwuanMifQ==
