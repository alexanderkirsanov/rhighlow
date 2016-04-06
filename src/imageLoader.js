const ImageLoader = {
    loadImage(url) {
        const image = new Image();
        image.src = url;
        return new Promise((resolve, reject) => {
            image.addEventListener('load', () => {
                resolve(image);
            }, false);
            image.addEventListener('error', () => {
                console.error('IMAGE FAIL', image);
                reject(image);
            }, false);
        });
    },

    loadImages(urls) {
        console.log(urls);
        const promises = urls.map(this.loadImage.bind(this));
        return Promise.all(promises);
    }
};

export default ImageLoader;
