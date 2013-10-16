/*jslint browser: true */
/*jslint undef: true */


var MIND = (function(){
    "use strict";

    function filterDeckByType(type, deck) {
        var result = [];
        for (var i = 0; i < deck.length; i++) {
            if (Array.isArray(type)) {
                for (var x = 0; x < type.length; x++) {
                    if(deck[i].type === type[x]) result.push(deck[i]);
                }
            } else if (deck[i].type === type) {
                result.push(deck[i]);
            }
        }
        return result;
    }

    function calcPower(cost, effect) {
        var power = (cost * 4);
        if(effect) power += MIND.effect.thought[effect].powerModifier;
        return power;
    }

    function calcBreak(memory) {
        return 50 - (memory * 3);
    }

    function cardData(card) {

        if(card.effect && typeof MIND.effect[card.type][card.effect] !== "undefined") {
            card.effectDescription = MIND.effect[card.type][card.effect].effect;
        } else {
            card.effect = false;
        }

        if(card.type === 'thought') {
            card.power = calcPower(card.cost, card.effect);
        }

        if(card.type === 'intellect' && typeof MIND.effect.intellect[card.effect] !== "undefined") {
            card.cost = MIND.effect.intellect[card.effect].cost;
            if (typeof card.name === 'undefined') card.name = card.effect;
        }

        if(card.type === 'thinker') {
            card.cost = false;
            card.breakPoint = calcBreak(card.memory);
        }

        return card;
    }

    function cardHtml(card) {
        var data = cardData(card),
            html = [
                '<div class="wl-card--<%= type %> wl-card">',
                    '<div class="top">',
                        '<div class="stats">',
                            '<% if(type != "thinker"){ %>',
                                '<div class="stat">',
                                    '<span class="label"><%= type %></span>',
                                '</div>',
                            '<% } %>',
                            '<% if(type == "thinker"){ %>',
                                '<div class="stat--cost stat">',
                                    '<span class="label">Memory</span>',
                                    '<span class="value"><%= memory %></span>',
                                '</div>',
                                '<div class="stat--power stat">',
                                    '<span class="label">Break</span>',
                                    '<span class="value"><%= breakPoint %></span>',
                                '</div>',
                            '<% } %>',
                            '<% if(cost){ %>',
                                '<div class="stat--cost stat">',
                                    '<span class="label">Cost</span>',
                                    '<span class="value"><%= cost %></span>',
                                '</div>',
                            '<% } %>',
                            '<% if(type == "thought"){ %>',
                                '<div class="stat--power stat">',
                                    '<span class="label">Power</span>',
                                    '<span class="value"><%= power %></span>',
                                '</div>',
                            '<% } %>',
                        '</div>',
                        '<div class="name"><%= name %></div>',
                    '</div>',
                    '<% if(effect){ %>',
                        '<div class="effect-wrapper">',
                            '<div class="effect">',
                                '<strong class="effect-name"><%= effect %></strong> - <span class="effect-description"><%= effectDescription %></span>',
                            '</div>',
                        '</div>',
                    '<% } %>',
                '</div>'
            ].join('');
        return _.template(html, data);
    }

    function deckHtml(deck) {
        var html = [];
        for (var i = 0; i < deck.length; i++) html.push(cardHtml(deck[i]));
        return html;
    }

    return {
        effect: {},
        deck: {},
        calcPower: calcPower,
        calcBreak: calcBreak,
        cardData: cardData,
        cardHtml: cardHtml,
        deckHtml: deckHtml,
        filterDeckByType: filterDeckByType
    };

})();
