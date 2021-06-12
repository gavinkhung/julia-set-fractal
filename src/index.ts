const maxIterations = 16;
const width = 320;
const height = 320;
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
      let a = normalize(x, 0, width, -1, 1);
      let b = normalize(y, 0, height, -1, 1);
      let n = 0;

      while (n < maxIterations) {
        let a2 = Math.pow(a, 2);
        let b2 = Math.pow(b, 2);

        if (a2 + b2 > 8) {
          break;
        }
        let twoAb = 2 * a * b;

        a = a2 - b2 + ca;
        b = twoAb + cb;

        n++;
      }
      if (n == maxIterations) {
        context.fillStyle = 'rgb(255, 255, 255)';
        context.fillRect(x, y, 1, 1);
      } else {
        context.fillStyle = 'rgb(0, 0, 0)';
        context.fillRect(x, y, 1, 1);
      }
    }
  }
};

// canvas.addEventListener('mousemove', (event: MouseEvent) => {
//   const ca = normalize(event.screenX, 0, width, -2, 2);
//   const cb = normalize(event.screenY, 0, height, -2, 2);
//   console.log(ca, cb);
//   draw(ca, cb);
// });

setInterval(() => {
  const ca = Math.sin(angle * Math.PI);
  const cb = 0; //Math.cos(angle);
  draw(ca, cb);

  angle += 0.05;
}, 100);
