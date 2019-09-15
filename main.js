(function () {
    let img = new Image();

    img.onload = function (ev) {
        let imgWidth = this.width;      // 505
        let imgHeight = this.height;    // 695
        imgHeight -= 170;               // 525

        let canvas = document.getElementById('main-canvas');
        canvas.width = imgWidth;
        canvas.height = imgHeight;

        let ctx = canvas.getContext('2d');
        // ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this, 0, 0, imgWidth, imgHeight, 0, 0, imgWidth, imgHeight);

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
        let tmpAhpla = 255, outlinePoints = [];
        let timer = setInterval(() => {
            let point = x + y * imgWidth;
            let ahpla = imgPixSet[point];

            // console.log('(' + x + ', ' + y + ') => ' + ahpla);

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

            if (tmpAhpla !== ahpla) {
                let isIn = ahpla === 0;
                let type = isIn ? 'in' : 'out';
                let points = {x: isIn ? x : x - 1, y, type};
                console.log('(' + points.x + ', ' + points.y + ') => ' + type);
                outlinePoints.push(points);
            }

            tmpAhpla = ahpla;

            ctx.putImageData(newImageData, 0, 0);

            if (y + 1 >= imgHeight && x >= imgWidth) {
                clearInterval(timer);
            } else if (x >= imgWidth) {
                x = 0;
                y++;
            } else x++;
        }, 1);
    };

    img.src = 'ecorp_logo_white.png';
    // img.src = 'th.jfif';
})();