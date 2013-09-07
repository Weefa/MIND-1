Linc.add('cardShelf', function () {
    $('.wl-card-shelf').each(function(){
        var $this = $(this),
            $wrapper = $this.find('.wrapper'),
            $item = $this.find('.wrapper-item'),
            width = 500; //434 add form width TODO: THIS IS CRAPPY

        $item.each(function(){
            var itemWidth = $(this).width();
            width += itemWidth;
        });
        $wrapper.css('width', width);
    });
 });