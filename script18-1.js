window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let weight = new Particle(
        width * Math.random(),
        height * Math.random(),
        0,
        0,
        0)
    let springPoint = {
        x: width/2,
        y: height/2
    }
    weight.addSpring(springPoint, 0.1, 100);

    let springPoint2 = {
        x: utils.randomRange(0, width),
        y: utils.randomRange(0, height)
    }
    weight.addSpring(springPoint2, 0.1, 100);

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
        
        //weight.springTo(springPoint, k, springLength);
        weight.update()

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
        context.moveTo(springPoint2.x, springPoint2.y)
        context.lineTo(weight.x, weight.y)
        context.lineTo(springPoint.x,springPoint.y)
        context.stroke();

        requestAnimationFrame(update);
    }
}