/*
 * jquery.typingIntent.js
 * Amiel Martin
 * 2010-10-28
 *
 * Fire an event after the user has finished typing.
 */



;(function($) {

	$.fn.typingIntent = function(callback, immediate_callback, user_options) {
		var timer, options = $.extend({}, default_options, user_options);
            
		var handler = function(e) {
			var self = this;
			if (typeof immediate_callback === "function") {
				if ( immediate_callback.apply(self, [e]) === false ) return;
			}
			clearTimeout(timer);
			timer = setTimeout(function() { callback.apply(self, [e]); }, options.timeout);
		};
      
		return this.keyup(handler);
	};
	
	$.fn.typingIntent.default_options = {
		timout: 500
	};
})(jQuery);