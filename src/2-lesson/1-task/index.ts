import { renderGrayscale } from "./grayscale";
import { renderInverse } from "./inverse";
import { uploadImage } from "./upload";

// Uint8ClampedArray !!!!

// | 255 | 45 | 0   | 1  |
// | 245 | 32 | 178 | 11 |
// Use Matrix instead data[i] = 255 - data[i];
// columnNumber = 3
// Math.floor(8 / columnNumber) + 8 % columnNumber
// class Matrix {
//   buffer;

//   constructor(x, y) {
//     this.buffer = new Uint8ClampedArray(x * y);
//   }

//   get(x, y) {
//     this.buffer[Math.floor(y / x) + y % x]
//   }
// }
// Inversed 157 ^ 255 = 255 - 157
// Фильтр Ланцоша (сглаживание и другие, хорошая оптимизация)

const canvas = <HTMLCanvasElement>document.getElementById('original');
const modifiedCanvas = <HTMLCanvasElement>document.getElementById('modified');
const uploadInput = <HTMLInputElement>document.getElementById('upload-image');
const inverseBtn = document.getElementById('inverse-btn');
const grayscaleBtn = document.getElementById('grayscale-btn');

const renderImage = (img: HTMLImageElement, canvas: HTMLCanvasElement) => {
  const ctx = canvas?.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx?.drawImage(img, 0, 0, img.width, img.height);
}

uploadInput?.addEventListener('change', (evt) => {
  uploadImage(evt).then((img: HTMLImageElement) => {
    renderImage(img, canvas)
  })
});

inverseBtn?.addEventListener('click', () => {
  renderInverse(canvas, modifiedCanvas);
})

grayscaleBtn?.addEventListener('click', () => {
  renderGrayscale(canvas, modifiedCanvas);
})