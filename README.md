# e-corp-icon-auto-creator
E Corp 公司 Logo 图标自动创建工具。


## 笔记：

```
参考：
https://www.html5canvastutorials.com/
https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial
```

1. `<canvas>` 元素：

   1. canvas 默认大小：300 * 150 （px）
   2. 标签：

   ```html
   <canvas id="tutorial" width="150" height="150">不支持，替代内容。</canvas>
   ```

2. 渲染上下文（The rendering context）：

   ```javascript
   var canvas = document.getElementById('tutorial');
   var ctx = canvas.getContext('2d');
   ```

3. 画布栅格（canvas grid）与坐标空间：

   1. 栅格的起点为左上角（坐标为（0,0））

4. 矩形：

   ```javascript
   void ctx.fillRect(x, y, width, height);     // 填充
   void ctx.strokeRect(x, y, width, height);   // 绘制边框
   void ctx.clearRect(x, y, width, height);    // 清除
   void ctx.rect(x, y, width, height);         // 绘制矩形
   ```

5. 绘制路径：

   ```javascript
   void ctx.beginPath();       // 新建路径
   void ctx.closePath();       // 闭合路径
   
   void ctx.stroke();          // 绘制轮廓
   void ctx.stroke(path);
   
   void ctx.fill();            // 填充
   void ctx.fill(fillRule);    // [null, 'nonzero', 'evenodd']
   void ctx.fill(path, fillRule);
   
   void ctx.moveTo(x, y);      // 移动笔触
   
   void ctx.lineTo(x, y);      // 线
   
   // 圆弧
   void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
   void ctx.arcTo(x1, y1, x2, y2, radius);
   
   // 弧度（radians） to 角度（degress）
   radians = (Math.PI/180) * degrees;
   
   void ctx.quadraticCurveTo(cpx, cpy, x, y);              // 绘制二次贝塞尔曲线
   void ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);   // 绘制三次贝塞尔曲线
   ```

6. `Path2D`：

   ```javascript
   new Path2D();       // 空的 Path 对象
   new Path2D(path);   // 克隆 Path 对象
   new Path2D(d);      // 从 SVG 建立 Path 对象
   ```

7. 色彩（Color）：

   ```javascript
   ctx.fillStyle = color;      // 填充
   ctx.strokeStyle = color;    // 轮廓
   ```

8. 透明度（Transparency）：

   ```javascript
   ctx.globalAlpha = value;
   ```

9. 线型（Line styles）：

   ```javascript
   ctx.lineWidth = value;        // 设置线宽
   
   ctx.lineCap = "butt";         // 设置线条末端样式
   ctx.lineCap = "round";        
   ctx.lineCap = "square";
   
   ctx.lineJoin = "bevel";       // 设定两线条之间合并的样式
   ctx.lineJoin = "round";
   ctx.lineJoin = "miter";
   
   ctx.miterLimit = value;       // 两线相交，交接处的最大长度
   
   ctx.getLineDash();
   
   void ctx.setLineDash(segments);
   
   ctx.lineDashOffset = value;
   ```

10. 渐变（Gradients）：

    ```javascript
    CanvasGradient ctx.createLinearGradient(x0, y0, x1, y1);
    CanvasGradient ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    
    void gradient.addColorStop(offset, color);
    ```

11. 图案样式（Patterns）：

    ```javascript
    CanvasPattern ctx.createPattern(image, repetition);
    ```

12. 阴影（Shadows）：

    ```javascript
    ctx.shadowOffsetX = offset;
    ctx.shadowOffsetY = offset;
    ctx.shadowBlur = level;
    ctx.shadowColor = color;
    ```

13. 绘制文本：

    ```javascript
    void ctx.fillText(text, x, y [, maxWidth]);
    void ctx.strokeText(text, x, y [, maxWidth]);
    
    // 样式
    ctx.font = value;
    ctx.textAlign = "left" || "right" || "center" || "start" || "end";
    ctx.textBaseline = 
        "top" || "hanging" || "middle" || "alphabetic" || "ideographic" || "bottom";
    ctx.direction = "ltr" || "rtl" || "inherit";
    
    // 预测量文本宽度
    TextMetrics ctx.measureText(text);
    
    ```

14. 获得需要绘制的图片：

    ```javascript
    HTMLImageElement;
    HTMLVideoElement;
    HTMLCanvasElement;
    ImageBitmap;
    
    
    // 由零开始创建图像
    var img = new Image();   // 创建一个<img>元素
    img.onload = function(){
      // 执行drawImage语句
    }
    img.src = 'myImage.png'; // 设置图片源地址
    
    
    // 通过 data: url 方式嵌入图像
    img.src = 'data:image/gif;base64,R0lGODlh...XiGBYAOw==';
    ```
    
15. 绘制图片：

    ```javascript
    void ctx.drawImage(image, dx, dy);
    // 缩放（Scaling）
    void ctx.drawImage(image, dx, dy, dWidth, dHeight);
    // 切片（Slicing）
    void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    ```

16. 状态的保存和恢复（Saving and restoring state）：

     ```javascript
    void ctx.save();
    void ctx.restore();
     ```
    
17. 移动（Translating）：

    ```javascript
    void ctx.translate(x, y);
    ```

18. 旋转（Rotating）：

    ```javascript
    void ctx.rotate(angle);
    ```

19. 缩放（Scaling）；

    ```javascript
    void ctx.scale(x, y);
    ```

20. 变形（Transforms）；

    ```javascript
    // m11  m21  dx
    // m12  m22  dy
    //   0    0   1
    void ctx.transform(m11, m12, m21, m22, dx, dy);
    void ctx.setTransform(m11, m12, m21, m22, dx, dy);
    void ctx.resetTransform(); // => ctx.setTransform(1, 0, 0, 1, 0, 0);
    // m11：水平方向的缩放
    // m12：水平方向的倾斜偏移
    // m21：竖直方向的倾斜偏移
    // m22：竖直方向的缩放
    // dx：水平方向的移动
    // dy：竖直方向的移动
    ```

21. 组合（Compositing）：

    ```javascript
    ctx.globalCompositeOperation = type;
    
    // 裁切路径
    void ctx.clip();
    void ctx.clip(fillRule);
    void ctx.clip(path, fillRule);
    ```

22. 基本的动画：

    ```javascript
    window.requestAnimationFrame(callback);
    ```

23. 像素操作：

    ```javascript
    ImageData ctx.createImageData(width, height);
    ImageData ctx.createImageData(imagedata);
    
    ImageData ctx.getImageData(sx, sy, sw, sh);
    
    void ctx.putImageData(imagedata, dx, dy);
    void ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
    
    // Uint8ClampedArray array
    var myImageData = ctx.createImageData(width, height);
    var myImageData = ctx.createImageData(anotherImageData);
    
    var imagedata = new ImageData(array, width, height);
    var imagedata = new ImageData(width, height);
    
    imagedata.data;
    imagedata.height;
    imagedata.width;
    
    // 保存图片
    canvas.toDataURL(type, encoderOptions);
    canvas.toBlob(callback, type, encoderOptions);
    ```

24. 点击区域（hit region）：

    ```javascript
    void ctx.addHitRegion(options);
    void ctx.removeHitRegion(id);
    void ctx.clearHitRegions();
    ```

25. 焦点圈：

    ```javascript
    void ctx.drawFocusIfNeeded(element);
    void ctx.drawFocusIfNeeded(path, element);
    void ctx.scrollPathIntoView();
    void ctx.scrollPathIntoView(path);
    ```

---


1. [html5 Canvas Tutorials](https://www.html5canvastutorials.com/)

2. Init:

   ```javascript
   var canvas = document.getElementById('myCanvas');
   var context = canvas.getContext('2d');
   ```

3. Line:

   ```javascript
   context.beginPath();
   context.moveTo(100, 150);
   context.lineTo(450, 50);
   // set line Width
   context.lineWidth = 15;
   // set line color
   context.strokeStyle = '#ff0000';
   // set line cap
   context.lineCap = 'butt'; // ['butt', 'round', 'square']
   // set line Join
   context.lineJoin = 'miter'; // ['miter', 'round', 'bevel']
   // rounded corners
   context.arcTo(rectX, rectY, rectX + rectWidth, rectY + cornerRadius, cornerRadius);
   // complete custom shape
   context.closePath();
   context.stroke();
   ```

4. Arc:

   ```javascript
   context.beginPath();
   context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
   context.lineWidth = 15;
   ```

5. Quadratic Curve:

   ```javascript
   context.quadraticCurveTo(288, 0, 388, 150);
   ```

6. Bezier Curve:

   ```javascript
   context.bezierCurveTo(140, 10, 388, 10, 388, 170);
   ```

7. Rectangle:

   ```javascript
   context.rect(188, 50, 200, 100);
   context.fillStyle = 'yellow';
   context.fill();
   ```

8. Circle:

   ```javascript
   context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
   context.fillStyle = 'green';
   context.fill();
   ```

9. Linear Gradient:

   ```javascript
   // add linear gradient
   var grd = context.createLinearGradient(0, 0, canvas.width, canvas.height);
   // light blue
   grd.addColorStop(0, '#8ED6FF');   
   // dark blue
   grd.addColorStop(1, '#004CB3');
   
   context.fillStyle = grd;
   ```

10. Radial Gradient:

    ```javascript
    // create radial gradient
    var grd = context.createRadialGradient(238, 50, 10, 238, 50, 300);
    // light blue
    grd.addColorStop(0, '#8ED6FF');
    // dark blue
    grd.addColorStop(1, '#004CB3');
    
    context.fillStyle = grd;
    ```

11. Canvas Pattern:

    ```javascript
    var pattern = context.createPattern(imageObj, 'repeat');
    // ['repeat', 'repeat-x', 'repeat-y', 'no-repeat']
    
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = pattern;
    context.fill();
    ```

12. Canvas Image:

    ```javascript
    context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height);
    
    // draw cropped image
    context.drawImage(imageObj, x, y, w, h, destX, destY, destW, destH);
    ```

13. Text:

    ```javascript
    context.font = 'italic 40pt Calibri';
    // ['normal', 'italic', 'bold']
    
    context.fillStyle = 'blue'; 
    
    // textAlign aligns text horizontally relative to placement
    context.textAlign = 'center';
    // ['start', 'end', 'left', 'center', 'right']
    
    // textBaseline aligns text vertically relative to font style
    context.textBaseline = 'middle';
    // ['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom']
    
    context.fillText('Hello World!', 150, 100);
    
    // get text metrics
    var metrics = context.measureText(text);
    var width = metrics.width;
    
    context.strokeText('Hello World!', x, y);
    ```

14. Translate Transform:

    ```javascript
    // translate context to center of canvas
    context.translate(canvas.width / 2, canvas.height / 2);
    
    // scale y component
    context.scale(1, 0.5);
    
    // rotate 45 degrees clockwise
    context.rotate(Math.PI / 4);
    
    // = Custom Transform =
    
    // translation matrix:
    //  1  0  tx
    //  0  1  ty
    //  0  0  1
    var tx = canvas.width / 2;
    var ty = canvas.height / 2;
    
    // apply custom transform
    context.transform(1, 0, 0, 1, tx, ty);
    
    // = Shear Transform =
    
    // shear matrix:
    //  1  sx  0
    //  sy  1  0
    //  0   0  1
    var sx = 0.75;
    // .75 horizontal shear
    var sy = 0;
    // no vertical shear
    
    // translate context to center of canvas
    context.translate(canvas.width / 2, canvas.height / 2);
    
    // apply custom transform
    context.transform(1, sy, sx, 1, 0, 0);
    
    // = Mirror Transform =
    
    // translate context to center of canvas
    context.translate(canvas.width / 2, canvas.height / 2);
    
    // flip context horizontally
    context.scale(-1, 1);
    
    
    
    // save state
    context.save();
    
    // restore state 3
    context.restore();
    
    ```

15. Composites:

    ```javascript
    // Shadow
    context.rect(188, 40, 200, 100);
    context.fillStyle = 'red';
    context.shadowColor = '#999';
    context.shadowBlur = 20;
    context.shadowOffsetX = 15;
    context.shadowOffsetY = 15;
    context.fill();
    
    // Global Alpha
    context.globalAlpha = 0.5;
    
    // Clipping Region
    context.clip();
    
    // Global Composite Operations
    // set global composite
    tempContext.globalCompositeOperation = thisOperation;
    /*
    ["source-atop", "source-in", "source-out",
     "source-over", "destination-atop", "destination-in",
     "destination-out", "destination-over", "lighter",
     "darker", "xor", "copy"]
    */
    ```

16. Image Data & URLs:

    ```javascript
    var imageData = context.getImageData(imageX, imageY, imageWidth, imageHeight);
    var data = imageData.data;
    
    // iterate over all pixels
    for(var i = 0, n = data.length; i < n; i += 4) {
        var red = data[i];
        var green = data[i + 1];
        var blue = data[i + 2];
        var alpha = data[i + 3];
    }
    
    // overwrite original image
    context.putImageData(imageData, x, y);
    
    // save canvas image as data url (png format by default)
    var dataURL = canvas.toDataURL();
    
    
    ```

17. Animation:

    ```javascript
    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    ```

18. Mouse Coordinates:

    ```html
    <!DOCTYPE HTML>
    <html>
      <head>
        <style>
          body {
            margin: 0px;
            padding: 0px;
          }
        </style>
      </head>
      <body data-rsssl=1>
        <canvas id="myCanvas" width="578" height="200"></canvas>
        <script>
          function writeMessage(canvas, message) {
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.font = '18pt Calibri';
            context.fillStyle = 'black';
            context.fillText(message, 10, 25);
          }
          function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
              x: evt.clientX - rect.left,
              y: evt.clientY - rect.top
            };
          }
          var canvas = document.getElementById('myCanvas');
          var context = canvas.getContext('2d');
    
          canvas.addEventListener('mousemove', function(evt) {
            var mousePos = getMousePos(canvas, evt);
            var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
            writeMessage(canvas, message);
          }, false);
        </script>
      </body>
    </html>
    ```




