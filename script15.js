window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let springPoint = new Vector(width/2, height/2);
    let weight = new Particle(width * Math.random(), height * Math.random(), 0, 0)
    
    let k = 0.1;

    weight.radius = 20;
    weight.friction = 0.9;

    //context.fillRect(0, 0, width, height);
    // context.translate(0, height / 2);
    // context.scale(1, -1);

    document.body.addEventListener('mousemove', (e) => {
        springPoint.setX(e.clientX);
        springPoint.setY(e.clientY);
    });

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        let distance = springPoint.subscract(weight.position)
        let springForce = distance.multiply(k)

        weight.velocity.addTo(springForce)

        weight.update()

        context.beginPath();
        context.arc(
            weight.position.getX(),
            weight.position.getY(),
            weight.radius,
            0,
            Math.PI * 2,
            false
        )
        context.fill()

        context.beginPath();
        context.arc(
            springPoint.getX(),
            springPoint.getY(),
            4,
            0,
            Math.PI * 2,
            false
        )
        context.fill()

        context.beginPath();
        context.moveTo(weight.position.getX(), weight.position.getY())
        context.lineTo(springPoint.getX(),springPoint.getY())
        context.stroke();

        requestAnimationFrame(update);
    }
}