interface exportedFunctions extends WebAssembly.Exports {
  normalize: (
    val: number,
    valmin: number,
    valmax: number,
    min: number,
    max: number
  ) => number;
  calculateIterations: (
    a: number,
    b: number,
    ca: number,
    cb: number,
    maxIterations: number
  ) => number;
}
fetch('optimized.wasm')
  .then((response) => response.arrayBuffer())
  .then((buffer) => WebAssembly.instantiate(buffer))
  .then((module) => {
    const { normalize, calculateIterations } = module.instance
      .exports as exportedFunctions;

    const maxIterations = 8;
    const width = 360;
    const height = 240;
    let angle = 0;

    const canvas = document.getElementById('plane') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const complexReal = document.getElementById(
      'complex-real'
    ) as HTMLParagraphElement;
    const complexImag = document.getElementById(
      'complex-imag'
    ) as HTMLParagraphElement;

    canvas.width = width;
    canvas.height = height;

    const draw = (ca: number, cb: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          // a is the real part and b is the imaginary part
          let a = normalize(x, 0, width, -2, 2);
          let b = normalize(y, 0, height, -2, 2);
          let n = 0;

          n = calculateIterations(a, b, ca, cb, maxIterations);

          if (n === maxIterations) {
            context.fillStyle = 'rgb(0, 0, 0)';
          } else if (n >= 7) {
            context.fillStyle = 'rgb(255, 0, 0)';
          } else if (n >= 6) {
            context.fillStyle = 'rgb(255, 165, 0)';
          } else if (n >= 5) {
            context.fillStyle = 'rgb(255, 255, 0)';
          } else if (n >= 4) {
            context.fillStyle = 'rgb(0, 128, 128)';
          } else if (n >= 3) {
            context.fillStyle = 'rgb(50, 64, 255)';
          } else if (n >= 2) {
            context.fillStyle = 'rgb(0, 0, 128)';
          } else {
            context.fillStyle = 'rgb(0, 0, 64)';
          }
          context.fillRect(x, y, 1, 1);
        }
      }
    };

    // canvas.addEventListener('mousemove', (event: MouseEvent) => {
    //   const ca = normalize(event.screenX, 0, width, -1, 1);
    //   const cb = normalize(event.screenY, 0, height, -1, 1);
    //   draw(ca, cb);
    // });
    // draw(-0.8, 0.156);

    setInterval(() => {
      const ca = Math.sin(angle * Math.PI);
      const cb = Math.cos(angle);
      draw(ca, cb);
      complexReal.textContent = 'Real: ' + ca.toFixed(4).toString();
      complexImag.textContent = 'Imaginary: ' + cb.toFixed(4).toString();

      angle += 0.05;
    }, 50);
  });
