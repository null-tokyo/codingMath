window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];

    //context.fillRect(0, 0, width, height);
    // context.translate(0, height / 2);
    // context.scale(1, -1);
    for (let index = 0; index < 100; index++) {
        particles.push(
            new Particle(
                width/2,
                height,
                Math.random() * 8 + 5,
                -Math.PI / 2 + Math.random() * 0.2 - 0.1,
                0.1
            )
        );
        particles[index].radius = Math.random() * 10 + 5;
    }
    update();

    function update() {
        context.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            let p =  particles[i]

            p.update()

            context.beginPath();
            context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false)
            context.fill();

            if(p.position.getY() - p.radius > height) {
                p.position.setX(width/2);
                p.position.setY(height);
                p.velocity.setLength(Math.random() * 8 + 5)
                p.velocity.setAngle(-Math.PI / 2 + Math.random() * 0.2 - 0.1)
            }
        }
        
        requestAnimationFrame(update);
    }

    function removeDeadParticles() {
        for (let i = particles.length - 1; i > 0; i--) {
            let p = particles[i];
            if(p.position.getX() - p.radius > width ||
                p.position.getX() + p.radius < 0 ||
                p.position.getY() - p.radius > height ||
                p.position.getY() + p.radius < 0) {
                    particles.splice(i, 1)
            }
        }
    }
}