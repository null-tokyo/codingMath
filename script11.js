window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let sun = new Particle(width/2, height/2, 0, 0);
    let planet = new Particle(width/2 + 200, height/2, 10, -Math.PI/2, 0.5);
    console.log(planet.position)

    sun.mass = 30000;

    //context.fillRect(0, 0, width, height);
    // context.translate(0, height / 2);
    // context.scale(1, -1);
    update();

    function update() {
        context.clearRect(0, 0, width, height);

        planet.gravitateTo(sun);
        planet.update()

        context.beginPath();
        context.arc(sun.position.getX(), sun.position.getY(), 20, 0, Math.PI * 2, false)
        context.fill();

        context.beginPath();
        context.arc(planet.position.getX(), planet.position.getY(), 5, 0, Math.PI * 2, false)
        context.fill();

        console.log(planet.position)

        requestAnimationFrame(update);
    }
}