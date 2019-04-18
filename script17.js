window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let springPoint = {x: width/2, y: height/2};
    let weight = new Particle(
        width * Math.random(),
        height * Math.random(),
        0,
        0,
        0.5)

    let k = 0.1;
    let springLength = 100;

    weight.radius = 20;
    weight.friction = 0.9;
    //context.fillRect(0, 0, width, height);
    // context.translate(0, height / 2);
    // context.scale(1, -1);

    document.body.addEventListener('mousemove', (e) => {
        springPoint.x = e.clientX;
        springPoint.y = e.clientY;
    });

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        let dx = springPoint.x - weight.x;
        let dy = springPoint.y - weight.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let springForce = (distance - springLength) * k;
        let ax = dx / distance * springForce;
        let ay = dy / distance * springForce;

        weight.x += ax;
        weight.y += ay;

        context.beginPath();
        context.arc(
            weight.x,
            weight.y,
            weight.radius,
            0,
            Math.PI * 2,
            false
        )
        context.fill()

        context.beginPath();
        context.arc(
            springPoint.x,
            springPoint.y,
            4,
            0,
            Math.PI * 2,
            false
        )
        context.fill()

        context.beginPath();
        context.moveTo(weight.x, weight.y)
        context.lineTo(springPoint.x,springPoint.y)
        context.stroke();

        requestAnimationFrame(update);
    }
}