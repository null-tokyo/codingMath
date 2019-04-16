class Particle {
    constructor(x, y, speed, direction, grav = 0) {
        this.position = new Vector(x, y)

        this.velocity = new Vector(x, y);
        this.velocity.setLength(speed);
        this.velocity.setAngle(direction);

        this.gravity = new Vector(0, grav);

        this.mass = 1;

        this.radius = 0;
        this.friction = 1;
    }
    update() {
        this.velocity.multiplyBy(this.friction);
        this.velocity.addTo(this.gravity);
        this.position.addTo(this.velocity);
    }
    accelerate(accel) {
        this.velocity.addTo(accel)
    }
    angleTo (p2) {
        return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX());
    }
    distanceTo (p2) {
        let dx = p2.position.getX() - this.position.getX();
        let dy = p2.position.getY() - this.position.getY();

        return Math.sqrt(dx * dx +  dy * dy);
    }
    gravitateTo(p2) {
        var grav = new Vector(0, 0),
            dist = this.distanceTo(p2);

        grav.setLength(p2.mass / (dist * dist));
        grav.setAngle(this.angleTo(p2));

        this.velocity.addTo(grav);
    }
}