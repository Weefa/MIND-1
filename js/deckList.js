Linc.add('deckList', function () {
	$('[data-card-list]').each(function(){
		var $this = $(this),
			options = $this.data('card-list');

		if(typeof MIND.deck[options.deck] !== 'undefined'){
			var deck = MIND.deck[options.deck].card,
				cards = MIND.getCardsByType(options.type, deck);
			$this.append(MIND.deckHtml(cards));
		} else { console.log('undefined', options); }
	});
 });