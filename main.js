function draw() {
    var canvas = document.getElementById('main-canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var rectangle = new Path2D();
        rectangle.rect(10, 10, 50, 50);

        var circle = new Path2D();
        circle.moveTo(125, 35);
        circle.arc(100, 35, 25, 0, 2 * Math.PI);

        ctx.stroke(rectangle);
        ctx.fill(circle);

        var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
        ctx.stroke(p);
    }
}

draw();
