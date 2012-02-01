/*
 * jQuery typing intent plugin
 * Amiel Martin
 * Carnes Media
 * 2012-01-19
 *
 * Runs a callback not just on keyup, but after a user has typed something.
 * The idea is similar to hoverIntent.
 *
 * Examples:
 *
 *    $('input#url').typing_intent(function() {
 *      $.get('/validate_url', { url: this.value });
 *    });
 *
 *    var ajax;
 *    $('input#url').typing_intent(function() {
 *      ajax = $.get('/validate_url', { url: this.value });
 *    }, function() {
 *      ajax.abort();
 *    }, { timeout: 2000 });
 *
 */

;(function($) {
    var ti;

    ti = $.fn.typing_intent = function(callback, immediate_callback, user_options) {
        var timer, options = $.extend({}, ti.default_options, user_options);

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

    ti.default_options = {
        timeout: 1500
    };
})(jQuery);

