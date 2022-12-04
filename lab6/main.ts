import { INFINITY, OrientedGraph } from "./orientedGraph";

const incidenceMatrix1 = [
  [0, 5, INFINITY, 10],
  [INFINITY, 0, 3, INFINITY],
  [INFINITY, INFINITY, 0, 1],
  [INFINITY, INFINITY, INFINITY, 0],
];

const incidenceMatrix2 = [
  [0, 3, 8, INFINITY, -4],
  [INFINITY, 0, INFINITY, 1, 7],
  [INFINITY, 4, 0, -5, INFINITY],
  [2, INFINITY, INFINITY, 0, INFINITY],
  [INFINITY, INFINITY, INFINITY, 6, 0],
];

const graph = new OrientedGraph(incidenceMatrix1);
const shortestPath = graph.floydShortestPath();
graph.printGraph(shortestPath);

const graph2 = new OrientedGraph(incidenceMatrix2);
const shortestPath2 = graph2.floydShortestPath();
graph2.printGraph(shortestPath2);
