export function createDotPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  spacing: number = 20,
  dotSize: number = 1
) {
  ctx.fillStyle = "#ffffff";

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
