export function normalize(
  val: f32,
  valmin: f32,
  valmax: f32,
  min: f32,
  max: f32
): f32 {
  return ((val - valmin) / (valmax - valmin)) * (max - min) + min;
}

export function calculateIterations(
  a: f32,
  b: f32,
  ca: f32,
  cb: f32,
  maxIterations: f32
): f32 {
  let n: f32 = 0;

  while (a * a + b * b < 4 && n < maxIterations) {
    let a2 = a * a;
    let b2 = b * b;

    let twoAb: f32 = 2.0 * a * b;

    a = a2 - b2 + ca;
    b = twoAb + cb;

    n++;
  }
  return n;
}
