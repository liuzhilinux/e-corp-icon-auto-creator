(function () {
    for (let i = 0; i < 254; i++) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        let ol = document.getElementById('ech-list');

        li.appendChild(span);
        ol.appendChild(li);
    }

    /**
     * Set ECH item lenght.
     * @param idx
     * @param len
     */
    function setEchLength(idx, len) {
        let span = document.querySelectorAll('#ech-list li:nth-child(' + idx + ') span')[0];
        span.style.width = len + 'px';
    }

    /**
     * Get the current length of the ECH item.
     * @param idx
     * @returns {number}
     */
    function getEchLength(idx) {
        let span = document.querySelectorAll('#ech-list li:nth-child(' + idx + ') span')[0];
        let width = span.style.width;
        return width ? parseInt(width.replace('px', '')) : 0;
    }

    /**
     * Set the current length text (number) to the item inside.
     * @param idx
     */
    function setEchLengthText(idx) {
        let li = document.querySelectorAll('#ech-list li:nth-child(' + idx + ')')[0];
        let span = li.childNodes[0];
        let width = span.style.width;
        let newSpan = document.createElement('span');
        newSpan.innerText = width ? parseInt(width.replace('px', '')) : 0;
        li.appendChild(newSpan);
    }

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

            newImageData.data[i] = ahpla;
            newImageData.data[i + 1] = ahpla;
            newImageData.data[i + 2] = ahpla;
            newImageData.data[i + 3] = 255;

            imgPixSet.push(ahpla);
        }

        ctx.putImageData(newImageData, 0, 0);

        let x = 0, y = 0;
        let tmpAhpla = 0;
        let timer = setInterval(() => {
            let point = x + y * imgWidth;
            let ahpla = imgPixSet[point];

            console.log('(' + x + ', ' + y + ') => ' + ahpla);
            if (ahpla && 0 !== ahpla && 255 !== ahpla) setEchLength(ahpla, getEchLength(ahpla) + 1);

            newImageData.data[4 * point] = 255 - ahpla;
            newImageData.data[4 * point + 1] = 255 - ahpla;
            newImageData.data[4 * point + 2] = 255 - ahpla;

            newImageData.data[4 * point - 4] = tmpAhpla;
            newImageData.data[4 * point - 3] = tmpAhpla;
            newImageData.data[4 * point - 2] = tmpAhpla;

            tmpAhpla = ahpla;

            ctx.putImageData(newImageData, 0, 0);

            if (y + 1 >= imgHeight && x >= imgWidth) {
                clearInterval(timer);

                for (let i = 0; i < 254; i++) {
                    setEchLengthText(i + 1);
                }

                return false;
            } else if (x >= imgWidth) {
                x = 0;
                y++;
            } else x++;
        }, 1);
    };

    img.src = 'ecorp_logo_white.png';
    // img.src = 'th.jfif';
})();