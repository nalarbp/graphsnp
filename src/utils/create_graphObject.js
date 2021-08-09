import { createMCG } from "../algorithm/construct_mcg";
import { createCATHAI } from "../algorithm/construct_cathai";
import { createCGE } from "../algorithm/construct_cge";
import { createSMSO } from "../algorithm/construct_smso";
import { createSeqTrack } from "../algorithm/construct_seqtrack";

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
  categoricalMap,
  patientMovementData,
  metadataMap,
  trans_locLevel,
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
    case "hierSnpsMetaStayOverlap":
      let hierStayOverlap_graph = createSMSO(
        hammingMatrix,
        edgeCutoff,
        patientMovementData,
        metadataMap,
        trans_locLevel
      );
      graphObject.creator = "hierSnpsMetaStayOverlap";
      graphObject.nodes = hierStayOverlap_graph.nodes;
      graphObject.edges = hierStayOverlap_graph.edges;
      break;

    default:
      break;
  }
  return graphObject;
}
