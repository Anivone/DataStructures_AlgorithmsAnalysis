export const parseInputToAdjacentList = (
  input: string
): Record<number, number[]> => {
  const adjacentList: Record<number, number[]> = {};

  input.split("\n").forEach((line) => {
    if (line.includes("->")) {
      const [key, adjacencies] = line.split("->").map((part) => part.trim());
      adjacentList[Number(key)] =
        adjacencies === "!"
          ? []
          : adjacencies.split(",").map((part) => Number(part.trim()));
    }
  });

  return adjacentList;
};

export const printStack = <T>(stack: T[]) => {
  let result = "[";
  while (stack.length) {
    result += `${stack.pop()}, `;
  }
  result = result.slice(0, result.length - 2);
  result += "]";
  return result;
}
