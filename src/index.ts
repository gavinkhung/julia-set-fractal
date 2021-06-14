const maxIterations = 8;
const width = 360;
const height = 240;
let angle = 0;

const canvas = document.getElementById('plane') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = width;
canvas.height = height;

const normalize = (
  val: number,
  valmin: number,
  valmax: number,
  min: number,
  max: number
): number => {
  return ((val - valmin) / (valmax - valmin)) * (max - min) + min;
};

const draw = (ca: number, cb: number) => {
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      // a is the real part and b is the imaginary part
      let a = normalize(x, 0, width, -2, 2);
      let b = normalize(y, 0, height, -2, 2);
      let n = 0;

      while (Math.pow(a, 2) + Math.pow(b, 2) < 4 && n < maxIterations) {
        let a2 = Math.pow(a, 2);
        let b2 = Math.pow(b, 2);

        let twoAb = 2 * a * b;

        a = a2 - b2 + ca;
        b = twoAb + cb;

        n++;
      }
      // let brightness = normalize(n, 0, maxIterations, 0, 1);
      // brightness = normalize(Math.sqrt(brightness), 0, 1, 0, 255);
      if (n === maxIterations) {
        context.fillStyle = `rgb(0, 0, 0)`;
      } else if (n >= 7) {
        context.fillStyle = `rgb(255, 0, 0)`;
      } else if (n >= 6) {
        context.fillStyle = `rgb(255, 165, 0)`;
      } else if (n >= 5) {
        context.fillStyle = `rgb(255, 255, 0)`;
      } else if (n >= 4) {
        context.fillStyle = `rgb(0, 128, 128)`;
      } else if (n >= 3) {
        context.fillStyle = `rgb(50, 64, 255)`;
      } else if (n >= 2) {
        context.fillStyle = `rgb(0, 0, 128)`;
      } else {
        context.fillStyle = `rgb(0, 0, 64)`;
      }
      context.fillRect(x, y, 1, 1);
    }
  }
};

canvas.addEventListener('mousemove', (event: MouseEvent) => {
  const ca = normalize(event.screenX, 0, width, -1, 1);
  const cb = normalize(event.screenY, 0, height, -1, 1);
  console.log(ca, cb);
  draw(ca, cb);
});

// setInterval(() => {
//   const ca = Math.sin(angle * Math.PI);
//   const cb = Math.cos(angle);
//   draw(ca, cb);

//   angle += 0.05;
// }, 5);
draw(-0.8, 0.156);
