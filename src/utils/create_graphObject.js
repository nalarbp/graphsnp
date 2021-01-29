import { createMCG } from "../algorithm/construct_mcg";

export function createGraphObject(
  hammingMatrix,
  method,
  edgeCutoff,
  colDate,
  expDate
) {
  let graphObject = { oriMatrix: null, nodes: null, edges: null };
  switch (method) {
    case "mcg":
      let mcg_graph = createMCG(hammingMatrix, edgeCutoff);
      graphObject.oriMatrix = hammingMatrix;
      graphObject.nodeType = "singleton"; //singleton or compound
      graphObject.nodes = mcg_graph.nodes;
      graphObject.edges = mcg_graph.edges;
      break;
    case "cathai":
      break;

    default:
      break;
  }
  return graphObject;
}
