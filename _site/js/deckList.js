Linc.add('deckList', function () {
	$('[data-card-list]').each(function(){
		var $this = $(this),
			options = $this.data('card-list');
		
		console.log(options.deck);

		if(1){
			var deck = MIND.data[options.deck].card,
				cards = MIND.getCardsByType(options.type, deck);
			$this.append(MIND.deckHtml(cards));
		}
	});
 });