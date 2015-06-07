/*global TAFFY, XRegExp, Chance */

/* Globals */

var activeSession = {
    "name": "", // Name and ID of the current session.
    "gameID": "",
    "game": {
        "day": 0, // From 0 counting up till there's a winner.
        "time": "", // Morning-> Midday-> Evening-> Midnight Looping.
        "castID": "", // ID of the current cast set.
        "eventSetID": "", // ID of the current event set.
        "itemSetID": "", // ID of the current item set.
        "settingsID": "" // ID of the current settings.
    },
    "cast": [], // Cast set Filter. Array of Character IDs.
    "eventSet": [], //  Event set Filter. Array of Event IDs.
    "itemSet": [], // Item set Filter. Array of Item IDs.
    "settings": {} 
};
var characters = TAFFY().store("characters");
var events = TAFFY().store("events");
var items = TAFFY().store("items");


/* Prototype Factories */

function createRandomCharacters(ammount) {
    var characters;
    if(ammount == 1)
        characters = createRandomCharacter();
    else {
        characters = [];
        for(var count = 0; count < ammount; ++count)
            characters.push(createRandomCharacter());
    }
    
    return characters;
}

function createRandomCharacter() {
    var character;
    
    character = createCharacter();
    
    return character;
}

function createCharacter(name, nickname, pic, deathpic, stats, inventory) {

    if(name !=null && typeof name != 'string') {
        if (name.name != null && typeof name.name == 'string') {
            var character = name;
            name = character.name;
            nickname = character.nickname;
            pic = character.pic;
            deathpic = character.deathpic;
            stats = character.stats;
            inventory = character.inventory;
        }
    }

    if (name == null || typeof name != 'string')
        name = "";
    if (nickname == null || typeof nickname != 'string')
        nickname = "";
    if (pic == null || typeof pic != 'string')
        pic = "White";
    if (deathpic == null || typeof deathpic != 'string')
        deathpic = "BW";
    if (stats == null)
        stats = {};
    if (stats.brave == null || isNaN(stats.brave))
        stats.brave = 5;
    if (stats.lewd == null || isNaN(stats.lewd))
        stats.lewd = 5;
    if (inventory == null)
        inventory = {};

    return {
        'name': name,
        'nickname': nickname,
        'pic': pic,
        'deathpic': deathpic,
        'stats': stats,
        'inventory': inventory
    };
}

function createItem(name, type) {

    if (name.name != null && typeof name.name == 'string') {
        var item = name;
        name = item.name;
        type = item.type;
    }

    if (name == null || typeof name != 'string')
        name = "";
    if (name == null || typeof name != 'string')
        name = "";

    return {
        'name': name,
        'type': type
    };
}

function createEvent(eventText, rarity, participentsAmt, participents, tags, requires, fatal) {

    if (eventText.eventText != null && typeof eventText.eventText == 'string') {
        var event = eventText;
        eventText = event.eventText;
        rarity = event.rarity;
        participentsAmt = event.participentsAmt;
        participents = event.participents;
        tags = event.tags;
        requires = event.requires;
        fatal = event.fatal;
    }

    if (eventText == null || typeof eventText != 'string')
        eventText = "";
    if (rarity == null || isNaN(rarity))
        rarity = 0.5;
    if (participents == null)
        participents = [];
    if (tags == null)
        tags = [];

    return {
        'rarity': rarity,
        'participentsAmt': participentsAmt,
        'participents': participents,
        'tags': tags
    };
}

function getEventString(event) {
    var eventString = event.eventText;
    for (var count = 0; count < event.participentsAmt.length; ++count)
        eventString = XRegExp.replace(eventString, '<participent' + count + '>', event.participents[count].name);

    return eventString;
}

function createSession() {
    var newSession = {
        'game': {
            'cast': []
        },
        'eventSet': [],
        'itemSet': [],
        'settings': {}
    };

    for (var count = 0; count < 24; ++count)
        newSession.game.cast.push(createRandomCharacter());

    return newSession;
}



/* Storage */

//Session, Game, Cast, Characters, EventSet, ItemSet

function saveToStorage(type, dataName) {
    //$.jStorage.set(type + "." + dataName,);
}

function loadFromStorage(type, dataName) {
    if(type == "session") {
        activeSession = $.jStorage.get(type + "." + dataName);
        $.jStorage.set("activeSession", dataName);
    }
    else if(type == "game") {
        
    }
    else {
        //active
    }
}

function deleteFromStorage(type, dataName) {
    $.jStorage.deleteKey(type + "." + dataName);
}

function exportJSON(type) {
    return JSON.stringify(activeSession);
}

function importJSON(type, dataJSON, destination) {
    var importedData = JSON.parse(dataJSON);
    if (destination == "STORAGE")
        $.jStorage.set(type + "." + importedData.name, importedData)
    else
        $.jStorage.set("activeSession", importedData);
}

/* Database */

function filterDB( filters ) {
    
}

/* Logic */

function resetGame() {
    activeSession.game.day = 0;
    activeSession.game.time = "Morning";
}

function nextTime(current) {
    var next = "";
    
    if(current === "Morning")
        next = "Midday"; 
    else if(current === "Midday")
        next = "Evening";
    else if(current === "Evening")
        next = "Midnight";
    else 
        next = "Morning";
    
    return next;
}

function simulate() {
    var game = activeSession.game;
    var cast = activeSession.cast;
    var itemSet = activeSession.itemSet;
    var eventSet = activeSession.eventSet;
    
    if(game.time === "Midnight")
        game.day++;
    game.time = nextTime(game.time); 
    
  
}

function startSim() {
    
}

/* Main */



$(document).ready(function() {
    jQuery.Animation.prefilter(function(element, properties, options) {
        if (options.overrideOverflow) {
            jQuery(element).css("overflow", options.overrideOverflow);
        }
    });
    
    $("#sidebar").load("./widget/sidebar.html");
    
    $("#editmenu").hide();
    
    $(".nav-menu-button").click(function () {
        $("#nav").toggleClass('active');
    });
    
    $(".accordian-menu").hover(function () {
        if(!$(this).hasClass(".accordian-clicked"))
            $(this).children(".accordian-menu-ul").stop(true,true).slideDown({"duration": 750, "easing": "linear", "overrideOverflow": "visible"});
    }, function () {
        if(!$(this).hasClass(".accordian-clicked"))
            $(this).children(".accordian-menu-ul").stop(true,true).slideUp({"duration": 750, "easing": "linear", "overrideOverflow": "visible"});
    });
    
    $(".accordian-menu-button").click(function() {
        var parent = $(this).parent(".accordian-menu");
        var menu = $(this).siblings(".accordian-menu-ul");
        
        if(parent.hasClass(".accordian-clicked")) {
            parent.removeClass(".accordian-clicked");
            menu.hide();
        }
        else {
            parent.addClass(".accordian-clicked");
            menu.show();
        }
    });

    
    $(window).bind('hashchange', function(){
        var hash = location.hash.slice(1)
        
        console.log(hash);
        
        if(hash != "")
            $("#main").load("./pg/" + hash + ".html");
        else
            $("#main").load("./pg/home.html");
        
        document.title = "Thirsty Games " + hash;

    }).trigger('hashchange');

    var activeSession = loadFromStorage($.jStorage.get("activeSession"));
    if (activeSession == null)
        activeSession = createSession();
        
});

