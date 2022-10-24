import { Stack } from "./stack";

const validateNumber = (value: number, values: number[]) => {
  if (values.indexOf(value) !== -1)
    throw new Error(
      `Input values must be unique. Number ${value} is already provided`
    );
};

export const fillStackFromString = (
  sequence: string,
  stack: Stack<number>
): void => {
  const values: number[] = [];
  let value = "";
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] === " ") {
      validateNumber(Number(value), values);
      values.push(Number(value));
      value = "";

      continue;
    }

    value += sequence[i];

    if (i === sequence.length - 1) {
      validateNumber(Number(value), values);
      values.push(Number(value));
    }
  }

  if (values.length <= 1 || values.length >= 256) {
    throw new Error("The length of stack (N) should be 1 < N < 256");
  }

  values.forEach((item) => stack.push(item));
};

export const getAverage = (inputStack: Stack<number>) => {
  const stack = inputStack.copy();
  let sum = 0;
  const count = stack.size;

  while (!stack.isEmpty()) {
    sum += stack.pop();
  }

  return sum / count;
};
