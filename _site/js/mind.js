/*jslint browser: true */
/*jslint undef: true */


var MIND = (function($){
    "use strict";

    // accepts a list of JSON key/value files and returns a data obj with contents
    function loadData(data, callback) {
        var count = 1,
            totalKeys = Object.keys(data).length;

        $.each(data, function(i){
            $.getJSON(data[i], function(json){
                data[i] = json; //TODO: add error handling
                if(count === totalKeys && callback) {
                    return callback(data);
                }
                count ++;
            });
        });
    }

    // load our local json files
    function preload(callback) {
        var files = {
                intellect: "/data/effects/intellect.json",
                thinker: "/data/effects/thinker.json",
                thought: "/data/effects/thought.json",
                overwhelmDeck: "/data/decks/overwhelmDeck.json",
                counterDeck: "/data/decks/counterDeck.json",
                sacrificeDeck: "/data/decks/sacrificeDeck.json",
                amnesiaDeck: "/data/decks/amnesiaDeck.json",
                judgeDeck: "/data/decks/judgeDeck.json",
                motherDeck: "/data/decks/motherDeck.json"
            };

        loadData(files, function(data){
            MIND.data = data;
            if(callback) {
                return callback();
            }
        });
    }

    function getCardsByType(type, card){
        var result = [];
        $.each(card, function(i){
            if (Array.isArray(type)) {
                $.each(type, function(x){
                    if(card[i].type === type[x]){
                        result.push(card[i]);
                    }
                });
            } else {
                if(card[i].type === type){
                    result.push(card[i]);
                }
            }
        });
        return result;
    }

    function calcPower(cost, effect) {
        var power = (cost * 4);
        if(effect){
            power += MIND.data.thought[effect].powerModifier;
        }
        return power;
    }

    function calcBreak(memory) {
        return 50 - (memory*3);
    }

    function cardHtml(card) {
        var cardDefaults = {
            type: "thought",
            name: "No Name",
            effect: null,
            cost: 1
        };
        card = $.extend( {}, cardDefaults, card );

        if(card.effect && typeof MIND.data[card.type][card.effect] !== "undefined") {
            card.effectDescription = MIND.data[card.type][card.effect].effect;
        } else {
            card.effect = false;
        }

        if(card.type === 'thought') {
            card.power = calcPower(card.cost, card.effect);
        }

        if(card.type === 'intellect' && typeof MIND.data.intellect[card.effect] !== "undefined") {
            card.cost = MIND.data.intellect[card.effect].cost;
            if (card.name === 'No Name') card.name = card.effect;
        }

        if(card.type === 'thinker') {
            card.cost = false;
            card.breakPoint = calcBreak(card.memory);
        }

        var html = [
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

        return _.template(html, card);
    }

    function deckHtml(deck){
        var html = [];
        $.each(deck, function(i){
            html.push(cardHtml(deck[i]));
        });
        return html;
    }

    preload(function(){
        Linc.setDefaults({
            context: $(document)
        });
        Linc.run();
    });


    return {
        calcPower: calcPower,
        calcBreak: calcBreak,
        cardHtml: cardHtml,
        deckHtml: deckHtml,
        getCardsByType: getCardsByType
    };

})(jQuery);
