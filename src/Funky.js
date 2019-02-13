/**
 * Required Matter js
 * @type {{}}
 */
var Funky = Funky || {

    settings: {
        width: 1920,
        height: 1080
    },

    engine: {},
    world: {},
    render: {},
    currentLevelIndex: 0,
    players: [],
    blaPlayer: {},

    /**
     * Run once, at the loading of the page
     */
    init: function () {

        // Create canvas
        var element = document.createElement('div');
        element.setAttribute('id', 'game');
        document.body.appendChild(element);

        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
        this.render = Matter.Render.create({
            element: document.getElementById('game'),
            engine: this.engine,
            options: {
                width: this.settings.width,
                height: this.settings.height,
                background: 'transparent',
                wireframes: false,
                showAngleIndicator: false
            }
        });

        // run the engine
        Matter.Engine.run(this.engine);
        // run the renderer
        Matter.Render.run(this.render);

        window.addEventListener('resize', function() { Funky.resizeGame(); }, false);
        window.addEventListener('orientationchange', function() { Funky.resizeGame(); }, false);
        this.resizeGame();
        this.run();

        return;
        this.blaPlayer = new Funky.Player();
        this.blaPlayer.add();

        window.addEventListener('keyup', function(e) {
            if (e.key === " ") {
                Funky.blaPlayer.jump();
            }
            if (e.key === "a") {
                Funky.blaPlayer.move(-0.05, 0);
            }
            if (e.key === "d") {
                Funky.blaPlayer.move(0.05, 0);
            }
            }, false);
    },

    update: function(event) {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].update();
        }
    },

    /**
     * Resize the canvas and keep the aspect ratio of this settings.
     */
    resizeGame: function () {
        var gameArea = document.getElementById('game');
        var widthToHeight = this.settings.width / this.settings.height;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
        } else {
            newHeight = newWidth / widthToHeight;
        }
        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight-80 + 'px';

        gameArea.style.marginTop = -newHeight / 2 + 'px';
        gameArea.style.marginLeft = -newWidth / 2 + 'px';
    },

    /**
     * Set the events of the game.
     * Examples: https://github.com/liabru/matter-js/blob/master/examples/events.js
     */
    setEvents: function() {

        Matter.Events.on(this.engine, 'afterUpdate', function (event) { Funky.update(event); });

    },

    /**
     * Run a level
     */
    run: function () {
        // Clear engine?
        //this.engine.clear();
        this.addWalls();

        if (Funky.Levels[this.currentLevelIndex] === null) {
            this.currentLevelIndex = 0;
        }
        // Still null?
        if (Funky.Levels[this.currentLevelIndex] === null) {
            console.warn("No levels.");
            return false;
        }
        var currentLevel = Funky.Levels[this.currentLevelIndex];
        var bodies = [];
        for (var i = 0; i < currentLevel.objects.length; i++) {
            var object = currentLevel.objects[i];
            var body = {}; // The Matter body
            switch (object.type) {
                case 'rectangle':
                    body = Matter.Bodies.rectangle(
                        object.position.x,
                        object.position.y,
                        object.size.width,
                        object.size.height,
                        object.options
                    );
                    break;
                default:
                    console.warn(object.type + ' body not found or implemented.');
            }
            if (body === null) {
                console.warn('No body found.');
                continue;
            }
            bodies.push(body);
        }
        Matter.World.add(this.engine.world, bodies);
        this.setEvents();
    },

    /**
     * Add collision walls on each side
     * @todo is there an easier way?
     */
    addWalls: function () {

        // create two boxes and a ground
        var boxA = Matter.Bodies.rectangle(400, 600, 80, 80);
        var boxB = Matter.Bodies.rectangle(450, 700, 80, 80);

        var halfWidth = this.settings.width / 2;
        var halfHeight = this.settings.height / 2;
        var ground = Matter.Bodies.rectangle(halfWidth, this.settings.height, this.settings.width, 10, {isStatic: true});
        var roof = Matter.Bodies.rectangle(halfWidth, 0, this.settings.width, 10, {isStatic: true});
        var wallLeft = Matter.Bodies.rectangle(0, halfHeight, 10, this.settings.height, {isStatic: true});
        var wallRight = Matter.Bodies.rectangle(this.settings.width, halfHeight, 10, this.settings.height, {isStatic: true});
        Matter.World.add(this.engine.world, [
            boxA,
            boxB,
            ground,
            roof,
            wallLeft,
            wallRight
        ]);
    }
};