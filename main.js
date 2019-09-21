(function () {
    let img = new Image();

    img.onload = function (ev) {
        /*
         (276, 0) {(275, 1), (277, 1)}
         (1, 187) {([-1, 1], 187), ([0, 1], 186)}

         (349, 135) {(348, 136), (350, 136)}


         (332, 83)
         */
        let imgWidth = this.width;      // 505
        let imgHeight = this.height;    // 695
        imgHeight -= 170;               // 525

        let canvas = document.getElementById('main-canvas');
        canvas.width = imgWidth;
        canvas.height = imgHeight;

        let ctx = canvas.getContext('2d');
        // ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this, 0, 0, imgWidth, imgHeight, 0, 0, imgWidth, imgHeight);

        let addMouseEvt = () => {
            function writeMessage(canvas, message) {
                let el = document.querySelector('#msg-box');
                el.innerText = message;
            }

            function drawGuideLine(x, y) {
                let imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
                let iData = imageData.data;

                for (let i = 0, len = iData.length; i < len; i += 4) {
                    let cx = parseInt(i / 4 % imgWidth);
                    let cy = parseInt(i / 4 / imgWidth);

                    if (0 === iData[i]) {
                        'use magic';
                    } else if (cx === x || cy === y) {
                        imageData.data[i] = 0;
                        imageData.data[i + 1] = 0;
                        imageData.data[i + 2] = 255;
                        imageData.data[i + 3] = 255;
                    }

                    if (i >= iData.length - 4) {
                        setTimeout(() => {
                            ctx.putImageData(imageData, 0, 0);
                            setTimeout(() => restoreImg(x, y), 133);
                        }, 133);
                    }
                }
            }

            function restoreImg(x, y) {
                let imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
                let iData = imageData.data;

                for (let i = 0, len = iData.length; i < len; i += 4) {
                    let cx = parseInt(i / 4 % imgWidth);
                    let cy = parseInt(i / 4 / imgWidth);

                    if (cx === x || cy === y) {
                        'use magic';
                    } else if (255 === iData[i + 2]) {
                        imageData.data[i] = 255;
                        imageData.data[i + 1] = 255;
                        imageData.data[i + 2] = 255;
                        imageData.data[i + 3] = 255;
                    }

                    if (i >= iData.length - 4) ctx.putImageData(imageData, 0, 0);
                }

                ctx.putImageData(imageData, 0, 0);
            }

            function getMousePos(canvas, evt) {
                var rect = canvas.getBoundingClientRect();
                return {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                };
            }

            canvas.addEventListener('mousedown', function (evt) {
                var mousePos = getMousePos(canvas, evt);
                var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
                writeMessage(canvas, message);
                drawGuideLine(mousePos.x, mousePos.y);
            }, false);
        };

        let imgData = ctx.getImageData(0, 0, imgWidth, imgHeight);
        let data = imgData.data;

        let imgPixSet = [];
        let newImageData = ctx.createImageData(imgWidth, imgHeight);

        for (let i = 0, len = data.length; i < len; i += 4) {
            let alpha = data[i + 3];
            let ahpla = 255 - alpha;
            ahpla = ahpla > 127 ? 255 : 0;

            newImageData.data[i] = ahpla;
            newImageData.data[i + 1] = ahpla;
            newImageData.data[i + 2] = ahpla;
            newImageData.data[i + 3] = 255;

            imgPixSet.push(ahpla);
        }

        ctx.putImageData(newImageData, 0, 0);

        let x = 0, y = 0;
        let tmpAhpla = 255, tmpPoints = [];
        let tmpCnt = 0, tmpType = '';

        let timer = setInterval(() => {
            let point = x + y * imgWidth;
            let ahpla = imgPixSet[point];

            let isIn = ahpla === 0;
            let type = isIn ? 'in' : 'out';

            if ('in' === tmpType && 'out' === type) tmpCnt++;
            if (0 === x) {
                tmpCnt = 0;

                let cArr = [];

                tmpPoints.forEach((item, idx) => {
                    let cx = item.x;
                    let cy = item.y;
                    let ct = item.type;

                    cx = cx.toString();
                    cx = cx.length === 2 ? ' ' + cx : cx;
                    cx = cx.length === 1 ? '  ' + cx : cx;

                    cy = cy.toString();
                    cy = cy.length === 2 ? ' ' + cy : cy;
                    cy = cy.length === 1 ? '  ' + cy : cy;

                    ct = ct.length === 2 ? ' ' + ct : ct;

                    cArr.push(idx + ' -> (' + cx + ', ' + cy + ') ' + ct);
                });

                console.log(cArr.join('   | '));

                tmpPoints = [];
            }

            // console.log('(' + x + ', ' + y + ') => ' + ahpla + ' - ' + type + ' : ' + tmpCnt);

            if (tmpAhpla === ahpla && 0 === ahpla) {
                newImageData.data[4 * point] = 255;
                newImageData.data[4 * point + 1] = 255;
                newImageData.data[4 * point + 2] = 255;

            }

            if (0 === tmpAhpla && 255 === ahpla) {
                newImageData.data[4 * point - 4] = 0;
                newImageData.data[4 * point - 3] = 0;
                newImageData.data[4 * point - 2] = 0;
            }

            if (tmpAhpla !== ahpla) tmpPoints.push({x: isIn ? x : x - 1, y, type});

            tmpAhpla = ahpla;
            tmpType = type;

            ctx.putImageData(newImageData, 0, 0);
            if (y + 1 >= imgHeight && x + 1 >= imgWidth) {
                clearInterval(timer);
                addMouseEvt();
            } else if (x >= imgWidth) {
                x = 0;
                y++;
            } else x++;
        }, 1);
    };

    img.src = 'ecorp_logo_white.png';
    // img.src = 'th.jfif';
})();