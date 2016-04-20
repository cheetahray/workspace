(function (factory) {
    "use strict";

    if (typeof define === 'function' && define.amd) { // AMD
        define(['jquery'], factory);
    }
    else if (typeof exports == "object" && typeof module == "object") { // CommonJS
        module.exports = factory(require('jquery'));
    }
    else { // Browser
        factory(jQuery);
    }
}) (function($, undefined) {
    "use strict";

    $.fn.percircle = function(options) {
        // default options
        var defaultOptions = {
            animate: true
        };
        
        // extend with any provided options
        if (!options) options = {};
        $.extend(options, defaultOptions);
        
        var rotationMultiplier = 3.6;
        
        // for each element matching selector
        return this.each(function(){
            var percircle = $(this);
            // add percircle class for styling
            if (!percircle.hasClass('percircle')) percircle.addClass('percircle');
            // apply options
            if (typeof(percircle.attr('data-animate')) !== 'undefined') options.animate = percircle.attr('data-animate') == 'true';
            if (options.animate) percircle.addClass('animate');
            
            //if (typeof(percircle.attr('data-perclock')) !== 'undefined') options.perclock = percircle.attr('data-perclock') =='false';
            
            var percent = percircle.attr('data-percent') || options.percent || 0;
            var perclock = percircle.attr('data-perclock') || options.perclock || 0;

            if (percircle.attr('data-text').indexOf("icon-flash") > 0) {
                if (!percircle.hasClass('perclock')) percircle.addClass('perclock');

                myVar = setInterval(function(){
                    var text = percircle.attr('data-text') || options.text || percent + '%';
                    percircle.html('<span>'+text+'</span>');
                    // add divs for structure
                    $('<div class="slice"><div class="bar"></div><div class="fill"></div></div>').appendTo(percircle);
                    if (count == percent)
                        count = 0;
                    else if (count == 0 && percent % 10 != 0)
                        count = percent % 10;
                    else if (percent - count < 10)
                        count = percent;
                    else
                        count = count + 10;
                    //var seconds = d.getSeconds();
                    if (count > 50){
                        percircle.addClass('gt50');
                        $('.bar', percircle).css({
                            '-webkit-transform' : 'rotate(180deg)',
                            '-moz-transform'    : 'rotate(180deg)',
                            '-ms-transform'     : 'rotate(180deg)',
                            '-o-transform'      : 'rotate(180deg)',
                            'transform'         : 'rotate(180deg)'
                        });
                    }
                    else
                        percircle.removeClass('gt50');
                    var rotationDegrees = 3.6 * count;  // temporary clockwise rotation value
                    $('.bar', percircle).css({
                        '-webkit-transform' : 'rotate(' + rotationDegrees + 'deg)',
                        '-moz-transform'    : 'rotate(' + rotationDegrees + 'deg)',
                        '-ms-transform'     : 'rotate(' + rotationDegrees + 'deg)',
                        '-o-transform'      : 'rotate(' + rotationDegrees + 'deg)',
                        'transform'         : 'rotate(' + rotationDegrees + 'deg)'
                    });
                }, 1000);
            }
            else if (!perclock) {
                if (percent > 50) percircle.addClass('gt50');
                var text = percircle.attr('data-text') || options.text || percent + '%';
                $('<span>'+text+'</span>').appendTo(percircle);
                // add divs for structure
                $('<div class="slice"><div class="bar"></div><div class="fill"></div></div>').appendTo(percircle);
                if (percent > 50)
                $('.bar', percircle).css({
                  '-webkit-transform' : 'rotate(180deg)',
                  '-moz-transform'    : 'rotate(180deg)',
                  '-ms-transform'     : 'rotate(180deg)',
                  '-o-transform'      : 'rotate(180deg)',
                  'transform'         : 'rotate(180deg)'
                });
                var rotationDegrees = rotationMultiplier * percent;
                // set timeout causes the animation to be visible on load
                setTimeout(function(){
                    $('.bar', percircle).css({
                      '-webkit-transform' : 'rotate(' + rotationDegrees + 'deg)',
                      '-moz-transform'    : 'rotate(' + rotationDegrees + 'deg)',
                      '-ms-transform'     : 'rotate(' + rotationDegrees + 'deg)',
                      '-o-transform'      : 'rotate(' + rotationDegrees + 'deg)',
                      'transform'         : 'rotate(' + rotationDegrees + 'deg)'
                    });
                }, 0);
            } else {
                if (!percircle.hasClass('perclock')) percircle.addClass('perclock');
                
                setInterval(function(){ 
                    var d = new Date(); // without params it defaults to "now"
                    var text = getPadded(d.getHours()) + ":" + getPadded(d.getMinutes()) + ":" + getPadded(d.getSeconds());
                    
                    percircle.html('<span>'+text+'</span>');
                    // add divs for structure
                    $('<div class="slice"><div class="bar"></div><div class="fill"></div></div>').appendTo(percircle);
                    
                    var seconds = d.getSeconds();
                    if (seconds === 0) percircle.removeClass('gt50');
                    if (seconds > 30){
                        percircle.addClass('gt50');
                        $('.bar', percircle).css({
                          '-webkit-transform' : 'rotate(180deg)',
                          '-moz-transform'    : 'rotate(180deg)',
                          '-ms-transform'     : 'rotate(180deg)',
                          '-o-transform'      : 'rotate(180deg)',
                          'transform'         : 'rotate(180deg)'
                        });
                    }
                    
                    var rotationDegrees = 6 * seconds;  // temporary clockwise rotation value
                    $('.bar', percircle).css({
                      '-webkit-transform' : 'rotate(' + rotationDegrees + 'deg)',
                      '-moz-transform'    : 'rotate(' + rotationDegrees + 'deg)',
                      '-ms-transform'     : 'rotate(' + rotationDegrees + 'deg)',
                      '-o-transform'      : 'rotate(' + rotationDegrees + 'deg)',
                      'transform'         : 'rotate(' + rotationDegrees + 'deg)'
                    });
                }, 1000);
            }
			
			if (percent > 60 ) {
				$(this).addClass('green').removeClass('yellow');
			} else if (percent > 30 && percent <= 60) {
				$(this).addClass('yellow').removeClass('green');
			} else {
				$(this).removeClass('green yellow');
			}
            
            // display a presentable format of current time
            var getPadded = function(val){
                return val < 10 ? ('0' + val) : val;
            };
        });
    };
});