let canvas = document.getElementById('main-canvas');
let ctx = canvas.getContext('2d');

let x = 0;
let y = 0;
let r = 50;

let w = 200;
let h = 100;

// ctx.save();
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(2, 1);

ctx.beginPath();
ctx.arc(x, y, r, 0, 2 * Math.PI, false);

ctx.restore();

ctx.fillStyle = '#8ed6ff';
ctx.shadowColor = '#999';
ctx.shadowBlur = 20;
ctx.shadowOffsetX = 15;
ctx.shadowOffsetY = 15;
ctx.fill();


ctx.lineWidth = 1;
ctx.strokeStyle = 'black';

ctx.stroke();
