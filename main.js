(function () {
    let metaData = [
        {x: 276.376618, y: 0.070598},
        {x: 332.461321, y: 83.687786},
        {x: 167.532938, y: 195.316099},
        {x: 196.949304, y: 238.390042},
        {x: 349.374905, y: 135.068043},
        {x: 405.461160, y: 218.687546},
        {x: 252.999979, y: 321.999969},
        {x: 281.930864, y: 365.396297},
        {x: 447.688423, y: 253.535471},
        {x: 503.461450, y: 336.687978},
        {x: 227.312677, y: 523.464790},
        {x: 0.537380, y: 186.312286},
    ];

    let canvas = document.getElementById('main-canvas');
    canvas.width = 640;
    canvas.height = 640;

    let ctx = canvas.getContext('2d');
    // ctx.imageSmoothingEnabled = false;


    ctx.beginPath();

    metaData.forEach((item, idx) => {
        idx === 0 ? ctx.moveTo(item.x, item.y) : ctx.lineTo(item.x, item.y);
    });

    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.closePath();

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(127, 1, 105, .25)';

    ctx.lineCap = ['butt', 'round', 'square'][0];
    ctx.lineJoin = ['bevel', 'round', 'miter'][0];
    ctx.miterLimit = 0;

    ctx.stroke();

    ctx.fillStyle = 'rgba(127, 1, 105, .125)';

    ctx.fill();


})();