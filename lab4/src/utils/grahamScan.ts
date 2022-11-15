import { CartesianCoordinates, Orientation } from "./types";

const ORIGIN_POINT: CartesianCoordinates = { x: 0, y: 0 };

export const parseInput = (input: string): CartesianCoordinates[] => {
  return input
    .split(",")
    .map((item) => item.trim().slice(1, -1))
    .map((pointString) => {
      const [x, y] = pointString.split(";").map((item) => item.trim());
      return { x: parseInt(x), y: parseInt(y) };
    });
};

export const grahamScan = (points: CartesianCoordinates[]) => {
  const replacedPoints = replaceMinimumPoint(points);
  const [minimumPoint] = replacedPoints;

  const sortedPoints = replacedPoints.sort(compare);

  let m = 1;
  for (let i = 1; i < sortedPoints.length; i++) {
    while (
      i < sortedPoints.length - 1 &&
      getOrientation(minimumPoint, sortedPoints[i], sortedPoints[i + 1]) === 0
    ) {
      i++;
    }
    sortedPoints[m] = sortedPoints[i];
    m++;
  }

  if (m < 3) return;

  const stack = [sortedPoints[0], sortedPoints[1], sortedPoints[2]];

  for (let i = 3; i < m; i++) {
    while (true) {
      if (
        stack.length < 2 ||
        getOrientation(
          stack[stack.length - 2],
          stack[stack.length - 1],
          sortedPoints[i]
        ) >= 2
      ) {
        break;
      }

      stack.pop();
    }

    stack.push(sortedPoints[i]);
  }

  return stack;
};

const replaceMinimumPoint = (
  points: CartesianCoordinates[]
): CartesianCoordinates[] => {
  let minimumPoint: CartesianCoordinates | null = null;
  let minimumIndex = 0;

  points.forEach((point, index) => {
    if (!minimumPoint) minimumPoint = point;

    if (minimumPoint.y === point.y) {
      minimumPoint = minimumPoint.x > point.x ? point : minimumPoint;
    } else if (minimumPoint.y > point.y) {
      minimumPoint = point;
      minimumIndex = index;
    }
  });

  [points[0], points[minimumIndex]] = [points[minimumIndex], points[0]];
  return points;
};

const getSquareDistance = (
  point1: CartesianCoordinates,
  point2: CartesianCoordinates
) => {
  return (
    (point1.x - point2.x) * (point1.x - point2.x) +
    (point1.y - point2.y) * (point1.y - point2.y)
  );
};

const compare = (
  point1: CartesianCoordinates,
  point2: CartesianCoordinates
) => {
  const orientation = getOrientation(ORIGIN_POINT, point1, point2);
  if (orientation === Orientation.Collinear) {
    return getSquareDistance(ORIGIN_POINT, point2) >=
      getSquareDistance(ORIGIN_POINT, point1)
      ? -1
      : 1;
  } else {
    return orientation === Orientation.Counterclockwise ? -1 : 1;
  }
};

export const getOrientation = (
  point1: CartesianCoordinates,
  point2: CartesianCoordinates,
  point3: CartesianCoordinates
): Orientation => {
  const value =
    (point2.y - point1.y) * (point3.x - point2.x) -
    (point2.x - point1.x) * (point3.y - point2.y);

  if (value === 0) return Orientation.Collinear;

  return value > 0 ? Orientation.Clockwise : Orientation.Counterclockwise;
};
