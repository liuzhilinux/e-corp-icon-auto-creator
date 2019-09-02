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

        imgPixSet.push({red, green, blue, alpha});

        let colorDeep = (red + green + blue) / 3;
        let alhpa = 255 - alpha;

        newImageData.data[i] = alhpa;
        newImageData.data[i + 1] = alhpa;
        newImageData.data[i + 2] = alhpa;
        newImageData.data[i + 3] = colorDeep;
    }

    ctx.putImageData(newImageData, 0, 0);
};

img.src = 'ecorp_logo_white.png';
// img.src = 'th.jfif';
