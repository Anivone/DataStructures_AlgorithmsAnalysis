import { IVertex } from "./types";

export class OrientedGraph {
  public vertices: Record<number, IVertex> = {};

  constructor(adjacencyList: Record<number, number[]> = {}) {
    this.parseAdjacencyList(adjacencyList);
  }

  private getTopologicalOrder(
    vertex: IVertex,
    stack: number[],
    visited: Record<number, boolean>
  ) {
    if (visited[vertex.data]) return;

    visited[vertex.data] = true;

    vertex.adjacentVertices.forEach((adjacentVertex) =>
      this.getTopologicalOrder(adjacentVertex, stack, visited)
    );

    stack.push(vertex.data);
  }

  public addVertex(key: number) {
    this.vertices[key] = new Vertex(key);
  }

  public addEdge(vertexKey: number, adjacentKey: number) {
    if (!this.vertices[adjacentKey])
      this.vertices[adjacentKey] = new Vertex(adjacentKey);

    this.vertices[vertexKey].adjacentVertices.push(this.vertices[adjacentKey]);
  }

  public topologicalSort(): number[] {
    const stack: number[] = [];
    const visited: Record<number, boolean> = {};

    const keys = Object.keys(this.vertices).map(Number);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (visited[key]) continue;
      this.getTopologicalOrder(this.vertices[key], stack, visited);
    }

    return stack;
  }

  private parseAdjacencyList(adjacencyList: Record<number, number[]>) {
    const keys = Object.keys(adjacencyList).map(Number);

    keys.forEach((key) => {
      if (!this.vertices[key]) {
        this.addVertex(key);
      }

      this.vertices[key].adjacentVertices = adjacencyList[key].map(
        (adjacentKey) => {
          if (!this.vertices[adjacentKey]) {
            this.vertices[adjacentKey] = new Vertex(adjacentKey);
          }

          return this.vertices[adjacentKey];
        }
      );
    });
  }
}

class Vertex implements IVertex {
  public data;
  public adjacentVertices;

  constructor(data: number, adjacentVertices: IVertex[] = []) {
    this.data = data;
    this.adjacentVertices = adjacentVertices;
  }
}
