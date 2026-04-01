/**
 * Neural Network Wireframe Data
 * 
 * Defines the 3D structure of a multi-layer neural network
 * Each edge is defined by two 3D points [x, y, z]
 * 
 * Structure:
 * - Input layer (8 nodes)
 * - Hidden layer 1 (12 nodes)
 * - Hidden layer 2 (10 nodes)
 * - Hidden layer 3 (8 nodes)
 * - Output layer (4 nodes)
 */

// Node positions for each layer [x, y, z]
export const NEURAL_NETWORK_NODES = {
  input: [
    [-1.5, 1.4, 0],
    [-1.5, 1.0, 0],
    [-1.5, 0.6, 0],
    [-1.5, 0.2, 0],
    [-1.5, -0.2, 0],
    [-1.5, -0.6, 0],
    [-1.5, -1.0, 0],
    [-1.5, -1.4, 0],
  ],
  hidden1: [
    [-0.8, 1.5, 0.2],
    [-0.8, 1.1, -0.1],
    [-0.8, 0.7, 0.15],
    [-0.8, 0.3, -0.05],
    [-0.8, -0.1, 0.1],
    [-0.8, -0.5, -0.15],
    [-0.8, -0.9, 0.05],
    [-0.8, -1.3, -0.1],
    [-0.8, 0.5, 0.3],
    [-0.8, -0.7, 0.25],
    [-0.8, 1.3, -0.2],
    [-0.8, -1.1, 0.2],
  ],
  hidden2: [
    [-0.1, 1.4, 0.1],
    [-0.1, 1.0, -0.15],
    [-0.1, 0.6, 0.2],
    [-0.1, 0.2, -0.1],
    [-0.1, -0.2, 0.15],
    [-0.1, -0.6, -0.05],
    [-0.1, -1.0, 0.1],
    [-0.1, -1.4, -0.15],
    [-0.1, 0.0, 0.25],
    [-0.1, -0.8, 0.2],
  ],
  hidden3: [
    [0.6, 1.2, 0.15],
    [0.6, 0.6, -0.1],
    [0.6, 0.0, 0.1],
    [0.6, -0.6, -0.15],
    [0.6, -1.2, 0.05],
    [0.6, 0.3, 0.2],
    [0.6, -0.3, -0.05],
    [0.6, 0.9, -0.2],
  ],
  output: [
    [1.3, 0.6, 0],
    [1.3, 0.2, 0],
    [1.3, -0.2, 0],
    [1.3, -0.6, 0],
  ],
}

// Generate all edges (connections between nodes)
export const NEURAL_NETWORK_EDGES: [number, number, number][][] = []

// Input to Hidden1 connections (sparse - not all-to-all for cleaner look)
const inputToHidden1Connections = [
  // Input 0 connects to hidden1 0, 1, 10
  [0, 0], [0, 1], [0, 10],
  // Input 1 connects to hidden1 0, 1, 2, 8
  [1, 0], [1, 1], [1, 2], [1, 8],
  // Input 2 connects to hidden1 2, 3, 8
  [2, 2], [2, 3], [2, 8],
  // Input 3 connects to hidden1 3, 4, 8, 9
  [3, 3], [3, 4], [3, 8], [3, 9],
  // Input 4 connects to hidden1 4, 5, 9
  [4, 4], [4, 5], [4, 9],
  // Input 5 connects to hidden1 5, 6, 9, 11
  [5, 5], [5, 6], [5, 9], [5, 11],
  // Input 6 connects to hidden1 6, 7, 11
  [6, 6], [6, 7], [6, 11],
  // Input 7 connects to hidden1 7, 10, 11
  [7, 7], [7, 10], [7, 11],
]

inputToHidden1Connections.forEach(([inputIdx, hiddenIdx]) => {
  const p1 = NEURAL_NETWORK_NODES.input[inputIdx]
  const p2 = NEURAL_NETWORK_NODES.hidden1[hiddenIdx]
  NEURAL_NETWORK_EDGES.push([[p1[0], p1[1], p1[2]], [p2[0], p2[1], p2[2]]])
})

// Hidden1 to Hidden2 connections
const hidden1ToHidden2Connections = [
  // hidden1 0 -> hidden2 0, 1
  [0, 0], [0, 1],
  // hidden1 1 -> hidden2 0, 1, 2
  [1, 0], [1, 1], [1, 2],
  // hidden1 2 -> hidden2 1, 2, 3
  [2, 1], [2, 2], [2, 3],
  // hidden1 3 -> hidden2 2, 3, 4, 8
  [3, 2], [3, 3], [3, 4], [3, 8],
  // hidden1 4 -> hidden2 3, 4, 5, 8
  [4, 3], [4, 4], [4, 5], [4, 8],
  // hidden1 5 -> hidden2 4, 5, 6, 9
  [5, 4], [5, 5], [5, 6], [5, 9],
  // hidden1 6 -> hidden2 5, 6, 7, 9
  [6, 5], [6, 6], [6, 7], [6, 9],
  // hidden1 7 -> hidden2 6, 7
  [7, 6], [7, 7],
  // hidden1 8 -> hidden2 2, 3, 8
  [8, 2], [8, 3], [8, 8],
  // hidden1 9 -> hidden2 5, 6, 9
  [9, 5], [9, 6], [9, 9],
  // hidden1 10 -> hidden2 0, 1
  [10, 0], [10, 1],
  // hidden1 11 -> hidden2 6, 7, 9
  [11, 6], [11, 7], [11, 9],
]

hidden1ToHidden2Connections.forEach(([h1Idx, h2Idx]) => {
  const p1 = NEURAL_NETWORK_NODES.hidden1[h1Idx]
  const p2 = NEURAL_NETWORK_NODES.hidden2[h2Idx]
  NEURAL_NETWORK_EDGES.push([[p1[0], p1[1], p1[2]], [p2[0], p2[1], p2[2]]])
})

// Hidden2 to Hidden3 connections
const hidden2ToHidden3Connections = [
  // hidden2 0 -> hidden3 0, 1, 7
  [0, 0], [0, 1], [0, 7],
  // hidden2 1 -> hidden3 0, 1, 2
  [1, 0], [1, 1], [1, 2],
  // hidden2 2 -> hidden3 1, 2, 3, 5
  [2, 1], [2, 2], [2, 3], [2, 5],
  // hidden2 3 -> hidden3 2, 3, 4, 5, 6
  [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
  // hidden2 4 -> hidden3 3, 4, 5, 6
  [4, 3], [4, 4], [4, 5], [4, 6],
  // hidden2 5 -> hidden3 4, 5, 6
  [5, 4], [5, 5], [5, 6],
  // hidden2 6 -> hidden3 4, 5, 6
  [6, 4], [6, 5], [6, 6],
  // hidden2 7 -> hidden3 4, 5, 6
  [7, 4], [7, 5], [7, 6],
  // hidden2 8 -> hidden3 2, 3, 5
  [8, 2], [8, 3], [8, 5],
  // hidden2 9 -> hidden3 5, 6
  [9, 5], [9, 6],
]

hidden2ToHidden3Connections.forEach(([h2Idx, h3Idx]) => {
  const p1 = NEURAL_NETWORK_NODES.hidden2[h2Idx]
  const p2 = NEURAL_NETWORK_NODES.hidden3[h3Idx]
  NEURAL_NETWORK_EDGES.push([[p1[0], p1[1], p1[2]], [p2[0], p2[1], p2[2]]])
})

// Hidden3 to Output connections
const hidden3ToOutputConnections = [
  // hidden3 0 -> output 0, 1
  [0, 0], [0, 1],
  // hidden3 1 -> output 0, 1
  [1, 0], [1, 1],
  // hidden3 2 -> output 0, 1, 2
  [2, 0], [2, 1], [2, 2],
  // hidden3 3 -> output 1, 2, 3
  [3, 1], [3, 2], [3, 3],
  // hidden3 4 -> output 1, 2, 3
  [4, 1], [4, 2], [4, 3],
  // hidden3 5 -> output 1, 2
  [5, 1], [5, 2],
  // hidden3 6 -> output 2, 3
  [6, 2], [6, 3],
  // hidden3 7 -> output 0
  [7, 0],
]

hidden3ToOutputConnections.forEach(([h3Idx, outIdx]) => {
  const p1 = NEURAL_NETWORK_NODES.hidden3[h3Idx]
  const p2 = NEURAL_NETWORK_NODES.output[outIdx]
  NEURAL_NETWORK_EDGES.push([[p1[0], p1[1], p1[2]], [p2[0], p2[1], p2[2]]])
})

// Add some internal layer connections (dendrite-like internal structure)
// These add visual complexity and depth
export const INTERNAL_CONNECTIONS: [number, number, number][][] = []

// Some connections within hidden1 layer
const hidden1Internal = [
  [[-0.8, 1.5, 0.2], [-0.8, 1.3, -0.2]],
  [[-0.8, 1.3, -0.2], [-0.8, 1.1, -0.1]],
  [[-0.8, 0.7, 0.15], [-0.8, 0.5, 0.3]],
  [[-0.8, 0.5, 0.3], [-0.8, 0.3, -0.05]],
  [[-0.8, -0.5, -0.15], [-0.8, -0.7, 0.25]],
  [[-0.8, -0.9, 0.05], [-0.8, -1.1, 0.2]],
  [[-0.8, -1.1, 0.2], [-0.8, -1.3, -0.1]],
]
INTERNAL_CONNECTIONS.push(...hidden1Internal)

// Some connections within hidden2 layer
const hidden2Internal = [
  [[-0.1, 1.4, 0.1], [-0.1, 1.0, -0.15]],
  [[-0.1, 0.6, 0.2], [-0.1, 0.0, 0.25]],
  [[-0.1, 0.0, 0.25], [-0.1, -0.2, 0.15]],
  [[-0.1, -0.6, -0.05], [-0.1, -0.8, 0.2]],
  [[-0.1, -1.0, 0.1], [-0.1, -1.4, -0.15]],
]
INTERNAL_CONNECTIONS.push(...hidden2Internal)

// Combine all edges
export const ALL_NEURAL_EDGES = [...NEURAL_NETWORK_EDGES, ...INTERNAL_CONNECTIONS]

export default ALL_NEURAL_EDGES
