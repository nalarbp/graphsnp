//========================================== CATHAI ================================================
import GraphEdgeList from "../model/graphEdgeList_prop";
const _ = require("lodash");
export function createCATHAI(rawMatrix, edgeCutoff) {
  //Assumed the input is true
  //Take an adjacency Map of pair-wise SNVs distance and edgecutoff (number > 0)
  //Return graph with only edge <= cut-off
  let mat = _.cloneDeep(rawMatrix);
  let edgeList = [];
  let nodeList = [];
  mat.forEach((val, key) => {
    nodeList.push(key);
    let sortedRow = val;

    //Filter by cut-off
    if (edgeCutoff && edgeCutoff > 0) {
      sortedRow = sortedRow.filter((e) => {
        return e.value <= edgeCutoff;
      });
    }

    //merge
    edgeList = edgeList.concat(sortedRow);
  });

  //remove inverse duplicates edges
  let graphEdgeList = new GraphEdgeList(nodeList, edgeList).getSymetricEdges();

  return { nodes: graphEdgeList.nodes, edges: graphEdgeList.edges };
}
