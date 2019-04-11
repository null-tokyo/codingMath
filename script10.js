window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let ship = new Particle(width/2, height/2, 0, 0);
    let thrust = new Vector(0, 0);
    let angle = 0;
    let turningRight = false;
    let turningLeft = false;
    let thrusting = false;

    let p = new Particle(100, height, 10, -Math.PI / 2, 0.1);
    let gravity = new Vector(0, 0.1);

    //context.fillRect(0, 0, width, height);
    // context.translate(0, height / 2);
    // context.scale(1, -1);

    document.body.addEventListener("keydown",(event) => {
        console.log(event.keyCode)
        switch(event.keyCode) {
            case 38: //up
                thrusting = true;
                break;
            // case 40: //down
            //     thrusting = true;
            //     break;
            case 37: //left
                turningLeft = true;
                break;
            case 39: //right
                turningRight = true;
                break;
            default:
                break;
        }
    })

    document.body.addEventListener("keyup",(event) => {
        console.log(event.keyCode)
        switch(event.keyCode) {
            case 38: //up
                thrusting = false;
                break;
            // case 40: //down
            //     thrusting = false;
            //     break;
            case 37: //left
                turningLeft = false;
                break;
            case 39: //right
                turningRight = false;
                break;
            default:
                break;
        }
    })

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        if(turningLeft) {
            angle -= 0.05;
        }
        if(turningRight) {
            angle += 0.05;
        }

        thrust.setAngle(angle);

        if(thrusting) {
            thrust.setLength(0.1);
        }else{
            thrust.setLength(0);
        }

        ship.accelerate(thrust);
        ship.update();

        context.save();
        context.translate(ship.position.getX(), ship.position.getY());
        context.rotate(angle);

        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, 7);
        context.lineTo(-10, -7);
        context.lineTo(10, 0);
        if(thrusting) {
            context.moveTo(10, 0);
            context.moveTo(10, -2);
        }
        context.stroke();

        context.restore();

        // context.beginPath();
        // context.arc(ship.position.getX(), ship.position.getY(), 10, 0, Math.PI * 2, false)
        // context.fill();

        if(ship.position.getX() > width) {
            ship.position.setX(0)
        }
        if(ship.position.getX() < 0) {
            ship.position.setX(width)
        }
        if(ship.position.getY() > height) {
            ship.position.setY(0)
        }
        if(ship.position.getY() < 0) {
            ship.position.setY(height)
        }

        requestAnimationFrame(update);
    }
}