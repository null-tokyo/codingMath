class Particle {
    constructor(x, y, speed, direction, grav = 0) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(direction) * speed;
        this.vy = Math.sin(direction) * speed;

        this.gravity = grav;

        this.mass = 1;

        this.radius = 0;
        this.friction = 1;
    }
    update() {
        //friction
        this.vx *= this.friction;
        this.vy *= this.friction;
        //gravity
        this.vy += this.gravity;
        //velocity
        this.x += this.vx;
        this.y +=  this.vy;
    }
    accelerate(ax, ay) {
        this.vx += ax;
        this.vy += ay;
    }
    angleTo (p2) {
        return Math.atan2(p2.y - this.y, p2.x - this.x);
    }
    distanceTo (p2) {
        let dx = p2.x - this.x;
        let dy = p2.y - this.y;

        return Math.sqrt(dx * dx +  dy * dy);
    }
    gravitateTo(p2) {
        let dx = p2.x - this.x;
        let dy = p2.y - this.y;
        let distSQ = dx * dx + dy * dy;
        let dist = Math.sqrt(distSQ);
        let force = p.mass / distSQ;

        let ax = dx / dist * force;
        let ay = dx / dist * force;

        this.vx += ax;
        this.vy += ay;


        // var grav = new Vector(0, 0),
        //     dist = this.distanceTo(p2);

        // grav.setLength(p2.mass / (dist * dist));
        // grav.setAngle(this.angleTo(p2));

        // this.velocity.addTo(grav);
    }
}