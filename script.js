window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    for (let index = 0; index < 100; index++) {
        particles.push(new Particle(width/2, height/2, Math.random() * 4 + 1, Math.random() * Math.PI * 2));
    }
    //context.fillRect(0, 0, width, height);
    // context.translate(0, height / 2);
    // context.scale(1, -1);

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        for (let index = 0; index < 100; index++) {
            let p = particles[index];
            p.update();

            context.beginPath();
            context.arc(p.position.getX(), p.position.getY(), 10, 0, Math.PI * 2, false)
            context.fill();
        }

        requestAnimationFrame(update);
    }
}