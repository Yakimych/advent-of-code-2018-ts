import { Point } from "./inputData";

export const applyVelocity = (point: Point, times: number): Point => ({
  ...point,
  x: point.x + point.speedX * times,
  y: point.y + point.speedY * times,
});
