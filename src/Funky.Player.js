/**
 * Funky Levels by index
 * @type {{}}
 */
Funky.Player = function () {
    this.id = 0; // The unique id of the player
    this.type = 'circle'; // Todo
    this.body = Matter.Bodies.circle(10, 1000, 10, {
        mass: 1,
        // friction: .01,
        // frictionStatic: 0
    });
    this.movement = {
        x: 0,
        y: 0
    };
    this.isJumping = false;

    this.add = function() {
        Funky.players.push(this);
        Matter.World.add(Funky.engine.world, [this.body]);
    };

    this.remove = function() {
        Matter.World.remove(Funky.engine.world, this.body);
        var index = Funky.players.indexOf(this);
        Funky.players.splice(index);
    };

    this.move = function(x, y) {
        this.movement = {
            x: x * .005,
            y: 0
        };
    };

    this.jump = function() {
        if (this.isJumping) {
            return;
        }
        console.log('jump');
        Matter.Body.applyForce( this.body, {
            x: this.body.position.x,
            y: this.body.position.y
        }, {x: 0, y: -0.05});
        // this.isJumping = true;
    };

    this.update = function (event) {

        console.log(this.body.velocity.x);
        if (this.body.velocity.x > 15) {
            return;
        }
        if (this.body.velocity.x < -15) {
            return;
        }
        // x = x * .01;
        Matter.Body.applyForce(this.body, {
            x: this.body.position.x,
            y: this.body.position.y
        }, {x: this.movement.x, y: this.movement.y});
        // if this moveY === 0, isJumping = false;
        // And maybe if has been going down
    }
};