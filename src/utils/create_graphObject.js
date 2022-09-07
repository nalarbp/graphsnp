import { createCATHAI } from "../algorithm/construct_cathai";
import { createCGE } from "../algorithm/construct_cge";
import { createMCG } from "../algorithm/construct_mcg";
import { createMSCG } from "../algorithm/construct_mscg";
import { createSeqTrack } from "../algorithm/construct_seqtrack";

export function createGraphObject(
  hammingMatrix,
  method,
  edgeCutoff,
  categoricalMap,
  metadataMap,
  seq_len
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
    case "mscg":
      if (edgeCutoff) {
        let mscg_graph = createMSCG(hammingMatrix, edgeCutoff);
        graphObject.creator = "mscg";
        graphObject.nodes = mscg_graph.nodes;
        graphObject.edges = mscg_graph.edges;
        graphObject.clusterGroup = mscg_graph.clusterGroup;
      } else {
        alert("Require a cut-off. Please input one.");
      }
      break;
    case "cge":
      let cge_graph = createCGE(hammingMatrix, categoricalMap, edgeCutoff);
      graphObject.creator = "cge";
      graphObject.nodes = cge_graph.nodes;
      graphObject.edges = cge_graph.edges;
      break;
    case "seqtrack":
      let seqtk_graph = createSeqTrack(hammingMatrix, metadataMap, seq_len);
      graphObject.creator = "seqtrack";
      graphObject.nodes = seqtk_graph.nodes;
      graphObject.edges = seqtk_graph.edges;
      break;

    default:
      break;
  }
  return graphObject;
}

/* Definition of graph object:it always returns an object
{
  creator : "mcg";
  nodes : mcg_graph.nodes;
  edges : mcg_graph.edges;
}
*/
