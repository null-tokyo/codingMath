class Vector {
    constructor(x = 1, y = 0) {
        this.x = x;
        this.y = y;
    }
    setX(val) {
        this.x = val;
    }
    getX(val) {
        return this.x;
    }
    setY(val) {
        this.y = val;
    }
    getY(val) {
        return this.y;
    }
    setAngle(angle) {
        let length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
    getAngle() {
        return Math.atan2(this.y, this.x)
    }
    setLength(length) {
        let angle = this.getAngle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    add(v) {
        return new Vector(this.x + v.getX(), this.y + v.getY())
    }
    subscract(v) {
        return new Vector(this.x - v.getX(), this.y - v.getY())
    }
    multiply(val) {
        return new Vector(this.x * val, this.y * val)
    }
    divide(val) {
        return new Vector(this.x / val, this.y / val)
    }
    addTo(v) {
        this.x += v.getX();
        this.y += v.getY();
    }
    subscractFrom(v) {
        this.x -= v.getX();
        this.y -= v.getY();
    }
    multiplyBy(val) {
        this.x *= val;
        this.y *= val;
    }
    divideBy(val) {
        this.x /= val;
        this.y /= val;
    }
}