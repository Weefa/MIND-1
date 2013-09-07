Linc.add('cardCreator', function () {
    $('.wl-create-card').each(function(){
        var $this = $(this),
            $button = $this.find('.new'),
            $panel = $this.find('.panel'),
            $cardName = $this.find('.wl-card .name'),
            $cardCost = $this.find('.wl-card .stat--cost .value'),
            $cardMemory = $this.find('.wl-card .stat--cost .value'),
            $cardBreak = $this.find('.wl-card .stat--power .value'),
            $cardPower = $this.find('.wl-card .stat--power .value'),
            $cardEffect = $this.find('.wl-card .effect'),
            $inputName = $this.find('input[name="thought-name"]'),
            $inputCost = $this.find('input[name="thought-cost"]'),
            $inputMemory = $this.find('input[name="memory"]'),
            $sumbmitButton = $this.find('button[type=submit]'),
            $effectList = $this.find('.wl-effect-list'),
            $form = $this.find('form'),
            cardType = $this.data('type'),
            effectCost = 0;


        function getEffects() {
            var items = [];
            $.each(MIND.data[cardType], function(i) {
                var powerModifier = MIND.data[cardType][i].powerModifier,
                    cost = MIND.data[cardType][i].cost,
                    value = i,
                    name = MIND.data[cardType][i].name,
                    effect = MIND.data[cardType][i].effect;
                items.push('<li class="effect-item"><label class="effect"><input class="radio" type="radio" name="card-effect" data-cost="' + cost + '" data-power-cost="' + powerModifier + '" value="' + value + '" /><span class="select"><span class="name">' + name + '</span> - <span class="effect-description">' + effect + '</span></span></span></label></li>');
            });
            $effectList.append(items.join(''));
            bindFormControlls();
        }

        function modifyPower() {
            var cost = $inputCost.val(),
                power = cost * 4,
                totalPower = power + effectCost;

            $cardCost.html(cost);
            $cardPower.html(totalPower);

            if(totalPower < 0) {
                $sumbmitButton.attr('disabled', true);
                $cardPower.parent().addClass('invalid');
                if(!$this.find('.power-err').length){
                    $sumbmitButton.parent().append('<span class="power-err err">Power cannot be less than 0.</span>');
                }
            } else {
                $sumbmitButton.attr('disabled', false);
                $this.find('.power-err').remove();
                $cardPower.parent().removeClass('invalid');
            }
        }

        function bindFormControlls() {
            var $inputEffect = $this.find('input[name="card-effect"]');

            $button.on("click", function(e){
                e.preventDefault();
                $this.addClass('is-expanded');
            });

            $panel.find('.close').on("click", function(e){
                e.preventDefault();
                $this.removeClass('is-expanded');
            });

            $inputName.on("keyup", function(){
                var val = $(this).val();

                if(val.length) {
                    $cardName.html(val);
                } else {
                    $cardName.html($inputName.prop('placeholder'));
                }
            });

            $inputCost.on("change", function(){
                modifyPower();
            });

            $inputEffect.on("change", function(){
                var val = $(this).val(),
                    $cur = $this.find('input[name="card-effect"]:checked').parent(),
                    name = $cur.find('.name').html(),
                    description = $cur.find('.effect-description').html();

                if(val.length) {
                    if(cardType === 'intellect') {
                        $cardName.html(name);
                        $cardCost.html($(this).data('cost'));
                    }
                    if(cardType === 'thought') {
                        effectCost = $(this).data('power-cost');
                    }
                    $cardEffect.find('.effect-name').html(name);
                    $cardEffect.find('.effect-description').html(description);
                    $cardEffect.removeClass('no-effect');
                } else {
                    effectCost = 0;
                    $cardEffect.addClass('no-effect');
                }
                if(cardType === 'thought') {
                    modifyPower();
                }
            });

            $inputMemory.on('change', function(e){
                var cardMemory = $inputMemory.val();
                $cardMemory.html(cardMemory);
                $cardBreak.html(MIND.calcBreak(cardMemory));
            });

            $form.on('submit', function(e){
                e.preventDefault();
                var card = {
                    "type": cardType,
                    "name": $inputName.val(),
                    "cost": $inputCost.val(),
                    "effect": $this.find('input[name="card-effect"]:checked').val(),
                    "memory": $inputMemory.val()
                },
                $scroller = $this.closest('.wl-card-shelf').find('.wl-horizontal-scroller');
                
                $scroller.prepend(MIND.cardHtml(card));

                Linc.run('delete', {context: $scroller.find('.wl-card:first-child')});
            });
        }

        function init() {
            getEffects();
        }

        init();
    });
 });


Linc.add('delete', function () {
    $('.wl-horizontal-scroller .wl-card').each(function(i){
        var $this = $(this);
        $this
            .append('<button class="delete wl-card">Delete Card</button>')
            .find('.delete')
            .on('click', function(e){
                $this.remove();
            });
    });
});


