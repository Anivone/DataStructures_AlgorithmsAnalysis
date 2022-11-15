export type CartesianCoordinates = {
  x: number;
  y: number;
}

export type PolarCoordinates = {
  distance: number;
  angle: number;
}

export enum Orientation {
  Collinear,
  Clockwise,
  Counterclockwise,
}