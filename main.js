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

    // 统计像素分布情况，用以分析规律。
    let pixList = {};


    for (let i = 0, len = data.length; i < len; i += 4) {
        let red = data[i];
        let green = data[i + 1];
        let blue = data[i + 2];
        let alpha = data[i + 3];

        imgPixSet.push({red, green, blue, alpha});

        let key = red + ',' + green + ',' + blue + ',' + alpha;
        if(pixList[key]) ++pixList[key];
        else pixList[key] = 1;

    }

    console.log(pixList);
};

img.src = 'ecorp_logo_white.png';
// img.src = 'th.jfif';
