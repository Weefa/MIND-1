/*jslint browser: true */
/*jslint undef: true */



var Dealer = (function(){
	"use strict";

	var deck    = MIND.deck.overwhelm.card,
		hand    = [],
		field   = [],
		discard = [];

	function generateDeck(length) {
		var array = [];
		for (i = 0; i < length; i++) array.push('Card ' + i);
		return array;
	}

	function shuffleDeck(deck) {
		var temp, random;
		for (i = 0; i < deck.length; i++) {
			random       = Math.floor(Math.random() * deck.length);
			temp         = deck[i];
			deck[i]      = deck[random];
			deck[random] = temp;
		}
	}

	function drawFrom(pile, number) {
		var cards = [];
		for (i = 0; i < number; i++) cards.push(pile.shift());
		return cards;
	}

    function playfrom(pile, i) {
        return pile.splice(i, 1);
    }

	function addTo(pile, cards) {
		for (i = 0; i < cards.length; i++) pile.push(cards[i]);
	}
	
	return {
		generateDeck: generateDeck,
		shuffleDeck: shuffleDeck,
		drawFrom: drawFrom,
		playfrom: playfrom,
		addTo: addTo
	};
	
})();













