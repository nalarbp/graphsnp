//========================================== CGE ================================================
/* Combined genomic epidemiology weighted graph
- get pair-wise SNPs distance
- get all available metadata matrix;
- create weigted graph
*/
import GraphEdgeList from "../model/graphEdgeList_prop";
const _ = require("lodash");
export function createCGE(rawMatrix, categoricalMap, edgeCutoff) {
  //Assumed the input is true
  //Take an adjacency matrix of pair-wise SNVs distance and edgecutoff (number > 0)
  //Return graph with only edge that have minimum value among other pair-wise sibling edges
  let mat = _.cloneDeep(rawMatrix);
  let edgeList = [];
  let nodeList = [];
  //Filter minimum
  mat.forEach((val, key) => {
    nodeList.push(key);
    //console.log("@@ --", key);
    let sortedRow = val.sort((a, b) => a.value - b.value);
    let minDist = sortedRow[0].value;
    //console.log("++", minDist);
    //find minimum threshold index
    let indexOnValueGreaterThanCutoff = 0;
    for (let i = 0; i < sortedRow.length; i++) {
      let cell = sortedRow[i];
      //console.log("==", i, cell.value, "==");
      if (cell.value === minDist) {
        indexOnValueGreaterThanCutoff = i;
      } else {
        indexOnValueGreaterThanCutoff = i;
        //console.log("++break", indexOnValueGreaterThanCutoff);
        break;
      }
    }
    //remove based on index
    sortedRow.splice(indexOnValueGreaterThanCutoff);

    //merge
    edgeList = edgeList.concat(sortedRow);
  });

  let graphEdgeList = new GraphEdgeList(nodeList, edgeList).getSymetricEdges();

  let newEdges = graphEdgeList.edges;
  newEdges.forEach((pe) => {
    pe.value = 1; // we give all edges with SNPs distance score 1 (as genetic/SNPs)
    if (edgeCutoff !== null && pe.value <= edgeCutoff) {
      pe.value = pe.value + 1; // Next we add 1 score if cuttof is applied and the SNPs is below the cutoff (significant SNPs)
    }
    //For every caterogical data available from metadata column add score 1 if they are in the same categorical group
    categoricalMap.forEach((val, key) => {
      if (val.indexOf(pe.source) !== -1 && val.indexOf(pe.target) !== -1) {
        pe.value = pe.value + 1;
      }
    });
  });

  //check available edges
  return { nodes: graphEdgeList.nodes, edges: newEdges };
}
