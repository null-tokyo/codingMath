window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let p0 = new Particle(
        utils.randomRange(0, width),
        utils.randomRange(0, height),
        utils.randomRange(0, 50),
        utils.randomRange(0, Math.PI * 2),
    )
    let p1 = new Particle(
        utils.randomRange(0, width),
        utils.randomRange(0, height),
        utils.randomRange(0, 50),
        utils.randomRange(0, Math.PI * 2)
    )
    let p2 = new Particle(
        utils.randomRange(0, width),
        utils.randomRange(0, height),
        utils.randomRange(0, 50),
        utils.randomRange(0, Math.PI * 2)
    )



    let k = 0.01;
    let separation = 100;

    p0.radius = 20;
    p0.friction = 0.9;
    p1.radius = 20;
    p1.friction = 0.9;
    p2.radius = 20;
    p2.friction = 0.9;
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

        spring(p0, p1, separation)
        spring(p1, p2, separation)
        spring(p2, p0, separation)

        p0.update()
        p1.update()
        p2.update()

        context.beginPath();
        context.arc(
            p0.position.getX(),
            p0.position.getY(),
            p0.radius,
            0,
            Math.PI * 2,
            false
        )
        context.fill()

        context.beginPath();
        context.arc(
            p1.position.getX(),
            p1.position.getY(),
            p1.radius,
            0,
            Math.PI * 2,
            false
        )
        context.fill()

        context.beginPath();
        context.arc(
            p2.position.getX(),
            p2.position.getY(),
            p2.radius,
            0,
            Math.PI * 2,
            false
        )
        context.fill()

        context.beginPath()
        context.moveTo(p0.position.getX(), p0.position.getY())
        context.lineTo(p1.position.getX(), p1.position.getY())
        context.lineTo(p2.position.getX(), p2.position.getY())
        context.lineTo(p0.position.getX(), p0.position.getY())
        context.stroke()

        requestAnimationFrame(update);
    }

    function spring(p0, p1, separation) {
        let distance = p0.position.subscract(p1.position)
        //distance.setLength(distance.getLength() - separation)
        let springForce = distance.multiply(k)

        p1.velocity.addTo(springForce);
        p0.velocity.subscractFrom(springForce);
    }
}