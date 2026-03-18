class Graph {
    private adjacencyList: Map<number, number[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex: number): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(vertex1: number, vertex2: number): void {
        // For undirected graph, add both directions
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        this.adjacencyList.get(vertex1)!.push(vertex2);
        this.adjacencyList.get(vertex2)!.push(vertex1);
    }

    getNeighbors(vertex: number): number[] {
        return this.adjacencyList.get(vertex) || [];
    }

    printGraph(): void {
        for (let [vertex, neighbors] of this.adjacencyList) {
            console.log(vertex + " -> " + neighbors.join(", "));
        }
    }

    findConnectedComponents() {
        const visited = new Set<number>();
        let count = 0;

        for(let i = 0; i < this.adjacencyList.size; i++) {
            const stack: number[] = [];
            if(!visited.has(i)) {
                count += 1;
                stack.push(i);
                while(stack.length) {
                    const poppedNode = stack.pop()!;
                    const nodes = this.adjacencyList.get(poppedNode)!;
                    visited.add(poppedNode);
                    for(let j = 0; j < nodes.length; j++) {
                        if(!visited.has(nodes[j])) {
                            visited.add(nodes[j]);
                            stack.push(nodes[j]);
                        }
                    }
                }
            }
        }

        return count;
    }
}

const graph1 = new Graph();

let V = 4, edges = [[0,1],[1,2]];
V = 5, edges = [[0, 1], [1, 2], [3, 4]]
for(let i = 0; i < V; i++) {
    graph1.addVertex(i);
}

for(let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    graph1.addEdge(edge[0], edge[1]);
}

graph1.printGraph();

let result = graph1.findConnectedComponents()

console.log(result)