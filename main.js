let canvas = document.getElementById('main-canvas');
let ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(20, 30);
ctx.lineTo(40, 60);
ctx.lineWidth = 12;
ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
ctx.lineCap = 'butt';
ctx.stroke();

ctx.beginPath();
ctx.moveTo(60, 90);
ctx.lineTo(80, 120);
ctx.lineWidth = 12;
ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
ctx.lineCap = 'round';
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100, 150);
ctx.lineTo(120, 180);
ctx.lineWidth = 12;
ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
ctx.lineCap = 'square';
ctx.stroke();

let x = 180;
let y = 240;
let redius = 24;
let startAngle = .5 * Math.PI;
let endAngle = 1.5 * Math.PI;
let counterClockWise = false;
ctx.beginPath();
ctx.arc(x, y, redius, startAngle, endAngle, counterClockWise);
ctx.lineWidth = 16;
ctx.strokeStyle = 'rgba(127, 127, 127, 0.5)';
ctx.lineCap = 'round';
ctx.stroke();

ctx.beginPath();
ctx.moveTo(240, 40);
ctx.quadraticCurveTo(280, 330, 320, 50);
ctx.lineWidth = 16;
ctx.strokeStyle = 'rgba(127, 127, 127, 0.5)';
ctx.lineCap = 'round';
ctx.stroke();

ctx.beginPath();
ctx.moveTo(340, 120);
ctx.bezierCurveTo(360, 50, 380, 45, 420, 95);
ctx.lineWidth = 2;
ctx.strokeStyle = 'rgba(127, 127, 127, 0.5)';
ctx.lineCap = 'round';
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100, 20);
ctx.lineTo(200, 160);
ctx.quadraticCurveTo(230, 200, 250, 120);
ctx.bezierCurveTo(290, -40, 300, 200, 400, 150);
ctx.lineTo(500, 90);
ctx.lineWidth = 5;
ctx.strokeStyle = 'blue';
ctx.lineCap = 'round';
ctx.fillStyle = 'rgba(142, 214, 255, 0.8)';
ctx.fill();
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.rect(300, 200, 100, 100);
// let grd = ctx.createLinearGradient(300, 200, 400, 300);
let grd = ctx.createRadialGradient(320, 220, 3, 320, 220, 30);
grd.addColorStop(0, '#8ed6ff');
grd.addColorStop(1, '#004cb3');
ctx.fillStyle = grd;
ctx.fill();
ctx.lineWidth = 1;
ctx.strokeStyle = 'blue';
ctx.stroke();

ctx.font = 'italic 40px Microsoft Yahei';
ctx.fillStyle = 'red';
// ctx.textAlign = 'center';
// ctx.textBaseline = 'middle';
// ctx.fillText('Hola Mundo!', 120, 120);
ctx.strokeText('Hola Mundo!', 120, 120);