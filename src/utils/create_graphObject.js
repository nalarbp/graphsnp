import { createMCG } from "../algorithm/construct_mcg";
import { createCATHAI } from "../algorithm/construct_cathai";

/* Definition of graph object
it always returns an object
{
  creator : "mcg";
  nodes : mcg_graph.nodes;
  edges : mcg_graph.edges;
}

*/

export function createGraphObject(
  hammingMatrix,
  method,
  edgeCutoff,
  colDate,
  expDate
) {
  let graphObject = { creator: null, nodes: null, edges: null };
  switch (method) {
    case "mcg":
      let mcg_graph = createMCG(hammingMatrix, edgeCutoff);
      graphObject.creator = "mcg";
      graphObject.nodes = mcg_graph.nodes;
      graphObject.edges = mcg_graph.edges;
      break;
    case "cathai":
      let cathai_graph = createCATHAI(hammingMatrix, edgeCutoff);
      graphObject.creator = "cathai";
      graphObject.nodes = cathai_graph.nodes;
      graphObject.edges = cathai_graph.edges;
      break;

    default:
      break;
  }
  return graphObject;
}
