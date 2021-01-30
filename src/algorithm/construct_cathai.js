//========================================== MCG ================================================
export function createCATHAI(mat, edgeCutoff) {
  //Assumed the input is true
  //Take an adjacency Map of pair-wise SNVs distance and edgecutoff (number > 0)
  //Return graph with only edge that have minimum value among other pair-wise sibling edges (format adjacency list)

  let edgeList = [];
  let nodeList = [];
  //Filter minimum
  mat.forEach((val, key) => {
    nodeList.push(key);
    //console.log("@@ --", key);
    let sortedRow = val.sort((a, b) => a.value - b.value);

    //Filter by cut-off
    if (edgeCutoff && edgeCutoff > 0) {
      sortedRow = sortedRow.filter((e) => {
        return e.value < edgeCutoff;
      });
    }

    //merge
    edgeList = edgeList.concat(sortedRow);
  });

  //remove inverse duplicates edges
  let tracker = new Map();
  edgeList = edgeList.filter(function (g) {
    let currentPair = g.source.concat("-", g.target);
    let inversePair = g.target.concat("-", g.source);

    let inverseEdge = edgeList.find(function (h) {
      return h.source === g.target && h.target === g.source;
    });

    if (inverseEdge) {
      if (tracker.get(inversePair) || tracker.get(currentPair)) {
        return false;
      } else {
        tracker.set(currentPair, true);
        tracker.set(inversePair, true);
        return true;
      }
    } else {
      tracker.set(currentPair, true);
      tracker.set(inversePair, true);
      return true;
    }
  });

  return { nodes: nodeList, edges: edgeList };
}
