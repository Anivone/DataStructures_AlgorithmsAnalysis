import { OrientedGraph } from "./orientedGraph";
import { parseInputToAdjacentList, printStack } from "./utils";

const inputString = `
  5 -> 2, 0
  4 -> 0, 1
  3 -> 1
  2 -> 3
  1 -> !
  0 -> !
`

const adjacencyList = parseInputToAdjacentList(inputString);

const graph = new OrientedGraph(adjacencyList);

console.log(printStack(graph.topologicalSort()));
