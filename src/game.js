window.addEventListener('load', function() { Funky.init(); });

COUCHFRIENDS.on('player.join', function(data) {
    var player = new Funky.Player();
    player.id = data.id;
    player.add();
});

COUCHFRIENDS.on('player.left', function(data) {
    for (var i = 0; i < Funky.players.length; i++) {
        if (Funky.players[i].id === data.player.id) {
            Funky.players[i].remove();
            break;
        }
    }
});

COUCHFRIENDS.on('player.buttonUp', function(data) {
    for (var i = 0; i < Funky.players.length; i++) {
        if (Funky.players[i].id === data.player.id) {
            Funky.players[i].jump();
            break;
        }
    }
});

COUCHFRIENDS.on('player.orientation', function(data) {
    for (var i = 0; i < Funky.players.length; i++) {
        if (Funky.players[i].id === data.player.id) {
            Funky.players[i].move(data.x, data.y);
            break;
        }
    }
});