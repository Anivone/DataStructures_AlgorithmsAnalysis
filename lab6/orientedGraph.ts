export const INFINITY = Number.MAX_SAFE_INTEGER;

export class OrientedGraph {
  public graph: number[][];

  constructor(graph: number[][]) {
    this.graph = graph;
  }

  public floydShortestPath(): number[][] {
    const length = this.graph.length;
    const dist = Array.from(Array(length), () => new Array(length).fill(0));
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        dist[i][j] = this.graph[i][j];
      }
    }

    for (let k = 0; k < length; k++) {
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }

    return dist;
  }

  public printGraph(graph: number[][]) {
    let result = "";
    for (let i = 0; i < graph.length; i++) {
      for (let j = 0; j < graph.length; j++) {
        result += graph[i][j] === INFINITY ? "-" : graph[i][j];
        if (j !== graph.length - 1) {
          result += " ";
        }
      }
      result += "\n";
    }
    console.log(result);
  }
}
