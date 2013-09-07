/*jslint browser: true */

(function ($) {
    "use strict";


$.fn.wlToggleClass = function(options) {
    var defaults = {
        "on" : "click",
        "togglerClass" : "is-active",
        "targetClass" : "is-active"
    };

    return this.each(function(i) {
        var $this    = $(this),
            data     = $this.data('toggleclass'),
            options  = ( $.parseJSON( data ) ? $.parseJSON( data ) : data),
            settings = $.extend( {}, defaults, options ),
            on       = ( settings.on == 'hover' ? 'mouseenter mouseleave' : settings.on ),
            $toggler = ( settings.toggler ? $this.find(settings.toggler) : $this),
            $target  = ( settings.target ? $this.find(settings.target) : $this);


        $toggler.bind(on, function(e){
            e.preventDefault();
            $toggler.toggleClass(settings.togglerClass);
            if(settings.targetClass != settings.togglerClass) {
                $target.toggleClass(settings.targetClass);
            }
        });

    });
};

} (jQuery));

