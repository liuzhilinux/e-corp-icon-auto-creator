let img = new Image();

img.onload = function (ev) {
    let imgWidth = this.width;      // 505
    let imgHeight = this.height;    // 695

    let canvas = document.getElementById('main-canvas');
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    let ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0, imgWidth, imgHeight, 0, 0, imgWidth, imgHeight);

    let imgData = ctx.getImageData(0, 0, imgWidth, imgHeight);
    let data = imgData.data;

    let imgPixSet = [];
    let newImageData = ctx.createImageData(imgWidth, imgHeight);

    for (let i = 0, len = data.length; i < len; i += 4) {
        let red = data[i];
        let green = data[i + 1];
        let blue = data[i + 2];
        let alpha = data[i + 3];

        // imgPixSet.push({red, green, blue, alpha});

        // let colorDeep = (red + green + blue) / 3;
        let ahpla = 255 - alpha;

        newImageData.data[i] = ahpla;
        newImageData.data[i + 1] = ahpla;
        newImageData.data[i + 2] = ahpla;
        newImageData.data[i + 3] = 255;

        imgPixSet.push(ahpla);
    }

    ctx.putImageData(newImageData, 0, 0);

    for (let i = 0; i < imgHeight; i++) {      // 纵坐标。
        for (let j = 0; j < imgWidth; j++) {   // 横坐标。
            let point = i * imgWidth + j;
            let ahpla = imgPixSet[point];

            newImageData.data[4 * point] = 255 - ahpla;
            newImageData.data[4 * point + 1] = 255 - ahpla;
            newImageData.data[4 * point + 2] = 255 - ahpla;
        }
    }

    ctx.putImageData(newImageData, 0, 0);

};

img.src = 'ecorp_logo_white.png';
// img.src = 'th.jfif';
