const main = () => {
  console.log('hello');
  console.log('hello');

  const canvas = document.getElementById('plane') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.width = window.outerWidth;
  canvas.height = window.innerHeight;

  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      context.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
      context.fillRect(x, y, 1, 1);
    }
  }
};
main();
