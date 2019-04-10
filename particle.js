class Particle {
    constructor(x, y, speed, direction) {
        this.position = new Vector(x, y)
        this.velocity = new Vector(x, y);
        this.velocity.setLength(speed);
        this.velocity.setAngle(direction);
    }
    update() {
        this.position.addTo(this.velocity);
    }
}