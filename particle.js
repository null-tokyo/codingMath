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

        this.springs = [];
        this.gravitations = [];

    }
    update() {
        this.handleSprings();
        this.handleGravitation();
        //friction
        this.vx *= this.friction;
        this.vy *= this.friction;
        //gravity
        this.vy += this.gravity;
        //velocity
        this.x += this.vx;
        this.y +=  this.vy;
    }
    handleSprings() {
        for (let i = 0; i < this.springs.length; i++) {
            let spring = this.springs[i];
            this.springTo(spring.point, spring.k, spring.length);
        }
    }
    addSpring(point, k, length) {
        this.removeSpring(point);
        this.springs.push({
            point: point,
            k: k,
            length: length || 0
        });
    }
    removeSpring(point) {
        for (let i = 0; i < this.springs.length; i++) {
            if(point === this.springs[i]) {
                this.springs.splice(i, 1);
                return;
            }
        }
    }
    handleGravitation() {
        for (let i = 0; i < this.gravitations.length; i++) {
            this.gravitateTo(this.gravitations[i]);
        }
    }
    addGravitation(p) {
        this.removeGravitation(p);
        this.gravitations.push(p)
    }
    removeGravitation(p) {
        for (let i = 0; i < this.gravitations.length; i++) {
            if(p === this.gravitations[i]) {
                this.gravitation.splice(i, 1);
                return;
            }
        }
    }
    getSpeed() {
        return Math.sqrt(this.vx * this.vx +  this.vy * this.vy);
    }
    setSpeed(speed) {
        let heading = this.getHeading();
        this.vx = Math.cos(heading) * speed;
        this.vy = Math.sin(heading) * speed;
    }
    getHeading() {
        return Math.atan2(this.vy, this.vx);
    }
    setHeading(heading) {
        let speed = this.setSpeed();
        this.vx = Math.cos(heading) * speed;
        this.vy = Math.sin(heading) * speed;
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
        let force = p2.mass / distSQ;

        let ax = dx / dist * force;
        let ay = dy / dist * force;

        this.vx += ax;
        this.vy += ay;
    }
    springTo(point, k, length) {
        let dx = point.x - this.x;
        let dy = point.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let springForce = (distance - length || 0) * k;
        this.vx += dx / distance * springForce;
        this.vy += dy / distance * springForce;
    }
}