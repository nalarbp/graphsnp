import { filterUnique } from "../utils/utils";

//========================================== MCG ================================================
import { filterUnique } from "../utils/utils";
const _ = require("lodash");

export function createCATHAI(mat, edgeCutoff) {
  //Assumed the input is true
  //Take an adjacency Map of pair-wise SNVs distance and edgecutoff (number > 0)
  //Return graph with only edge that have minimum value among other pair-wise sibling edges (format adjacency list)

  let nodeList = mat.keys();

  //Search for identical samples
  let raw_edgeList = _.cloneDeep(mat.entries());
  let zeroValueEdges = raw_edgeList.filter((e) => {
    return (e.value = 0);
  });
  let identicalSample = [];
  zeroValueEdges.forEach((f) => {
    identicalSample.push(f.source, f.target);
  });
  identicalSample.filter(filterUnique);

  return { nodes: nodeList, edges: edgeList };
}
