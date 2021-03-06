window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let sun1 = new Particle(300, 200, 0, 0);
    let sun2 = new Particle(800, 600, 0, 0);
    let emitter = {
        x: 100,
        y: 0
    }
    let particles = [];
    let numParticles = 100;

    sun1.mass = 10000;
    sun1.radius = 10;
    sun2.mass = 20000;
    sun2.radius = 20;

    for (let i = 0; i < numParticles; i++) {
        let p = new Particle(emitter.x, emitter.y, utils.randomRange(7, 8), Math.PI * 2 * 0.25 + Math.random() * 0.1);
        p.addGravitation(sun1);
        p.addGravitation(sun2);
        p.radius = 3;
        particles.push(p);
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        
        createCircle(sun1, 'yellow');
        createCircle(sun2, 'yellow');

        for (let i = 0; i < numParticles; i++) {
            let p = particles[i];
            p.update();
            createCircle(p, 'black');
        }

        requestAnimationFrame(update);
    }

    function createCircle(p, color) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(
            p.x,
            p.y,
            p.radius,
            0,
            Math.PI * 2,
            false
        )
        context.fill();
    }
}