window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    //context.fillRect(0, 0, width, height);
    // context.translate(0, height / 2);
    // context.scale(1, -1);

    let r0 = {
        x: Math.random() * width,
        y: Math.random() * height,
        width: 50 + Math.random() * 100,
        height: 50 + Math.random() * 100
    }

    let r1 = {
        x: Math.random() * width,
        y: Math.random() * height,
        width: 50 + Math.random() * 100,
        height: 50 + Math.random() * 100
    }

    document.body.addEventListener('mousemove', (e) => {
        r0.x = e.clientX;
        r0.y = e.clientY;
        if(utils.rectIntersect(r0, r1)) {
            context.fillStyle = "#f66"
        } else {
            context.fillStyle = "#CCC"
        }
    });

    update();

    function update() {
        //context.fillStyle = "#CCC"

        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.rect(r0.x, r0.y, r0.width, r0.height);
        context.rect(r1.x, r1.y, r1.width, r1.height);
        context.fill();
        
        requestAnimationFrame(update);
    }
}