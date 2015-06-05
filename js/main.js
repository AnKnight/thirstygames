/* Globals */

var activeSession;

/* Prototype Factories */

function createRandomCharacter() {
    
    return createCastMember();
}

function createCastMember(name, nickname, pic, deathpic, stats, inventory) {
    
    if(name == null || typeof name != 'string')
        name = "";
    if(nickname == null || typeof nickname != 'string')
        nickname = "";
    if(pic == null || typeof pic != 'string')
        pic = "White";
    if(deathpic == null || typeof deathpic != 'string')
        deathpic = "BW";
    if(stats == null)
        stats = {};
    if(stats.brave == null || isNaN(stats.brave))
        stats.brave = 5; 
    if(stats.lewd == null || isNaN(stats.lewd))
        stats.lewd = 5;
    if(inventory == null)
        inventory = {};
    
    return {
        'name': name,
        'nickname': nickname,
        'pic': pic,
        'deathpic': deathpic,
        'stats' : stats,
        'inventory': inventory
    };
}

function createItem(name, type) {
    return {
        'name': name,
        'type': type
    };
}

function createEvent(eventText, rarity, participentsAmt, participents, tags, requires, fatal) {
    
    if(eventText == null || typeof eventText != 'string')
        eventText = "";
    if(rarity == null || isNaN(rarity))
        rarity = 0.5; 
    if(participents == null)
        participents = [];
    if(tags == null)
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
    for(var count = 0; count < event.participentsAmt.length; ++count)
        eventString = XRegExp.replace(eventString, '<participent' + count +'>', event.participents[count].name);
        
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
    
    for(var count = 0; count < 24; ++count)
        newSession.game.cast.push(createRandomCharacter());
        
    return newSession;
}

/* Storage */

function saveSession(sessionName) {
    $.jStorage.set("sessions." + sessionName, activeSession);
}

function loadSession(sessionName) {
    activeSession = $.jStorage.get("sessions." + sessionName);
    $.jStorage.set("activeSession", sessionName);
}

function deleteSession(sessionName) {
    $.jStorage.deleteKey("sessions." + sessionName);
}

function exportSession() {
    return JSON.stringify(activeSession);
}

function importSession(sessionJSON) {
    activeSession = JSON.parse(sessionJSON);
    $.jStorage.set("activeSession", activeSession.name);
}

function saveGame(gameName) {
    $.jStorage.set("sessions." + gameName, activeSession.game);
}

function loadGame(gameName) {
    activeSession.game = $.jStorage.get("games." + gameName);
}

function deleteGame(gameName) {
    $.jStorage.deleteKey("games." + gameName);
}

function exportGame() {
   return JSON.stringify(activeSession.game);
}

function importGame(gameInput) {
    var game = JSON.parse(gameInput);
    $.jStorage.set("games." + game.name, game);
}

function saveEventSet(eventSetName) {
    $.jStorage.set("eventSets." + eventSetName, activeSession.eventSet);
}

function loadEventSet(eventSetName) {
    activeSession.eventSet = $.jStorage.get("eventSets." + eventSetName);
}

function deleteEventSet(eventSetName) {
    $.jStorage.deleteKey("eventSets." + eventSetName);
}

function exportEventSet() {
   return JSON.stringify(activeSession.eventSet);
}

function importEventSet(eventSetInput) {
    var eventSet = JSON.parse(eventSetInput);
    $.jStorage.set("eventSets." + eventSet.name, eventSet);
}

function saveItemSet(itemSetName) {
    $.jStorage.set("itemSets." + itemSetName, activeSession.itemSet);
}

function loadItemSet(itemSetName) {
    activeSession.eventSet = $.jStorage.get("itemSets." + itemSetName);
}

function deleteItemSet(itemSetName) {
    $.jStorage.deleteKey("itemSets." + itemSetName);
}

function exportItemSet() {
   return JSON.stringify(activeSession.itemSet);
}

function importItemSet(itemSetInput) {
    var itemSet = JSON.parse(itemSetInput);
    $.jStorage.set("itemSets." + itemSet.name, itemSet);
}

function saveSettings(settingsName) {
    $.jStorage.set("settings." + settingsName, activeSession.settings);
}

function loadSettings(settingsName) {
    activeSession.eventSet = $.jStorage.get("settings." + settingsName);
}

function deleteSettings(settingsName) {
    $.jStorage.deleteKey("settings." + settingsName);
}

function exportSettings() {
   return JSON.stringify(activeSession.settingsName);
}

function importSettings(settingsInput) {
    var settings = JSON.parse(settingsInput);
    $.jStorage.set("settings." + settings.name, settings);
}

/* Logic */

function simulate() {
    
}

/* Main */

$( document ).ready(function() {
    $( "#sidebar" ).load( "./widget/sidebar.html" );
    
    var activeSession = loadSession($.jStorage.get("activeSession"));
    if(activeSession == null)
        activeSession = createSession();
});