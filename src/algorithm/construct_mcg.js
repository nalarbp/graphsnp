//========================================== MCG ================================================
export function createMCG(mat, edgeCutoff) {
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

/*
    let taxaIDs = mat.keys();

  taxaIDs.forEach((taxa) => {
    let taxa_df = taxaMatrix.filter((t) => {
      return t.source == taxa || t.target == taxa;
    });
    let taxa_min = Math.min(...taxa_df.map((d) => d.value)); //spread operator to extract elem from array
    let taxa_df_min = taxa_df
      .filter((e) => {
        return e.value == taxa_min;
      })
      .filter(function (g) {
        let duplicatedG = graphMinEdges.find(function (h) {
          return h.source === g.source && h.target === g.target;
        });
        return !duplicatedG ? true : false;
      });
    graphMinEdges = graphMinEdges.concat(taxa_df_min);
  });

  //Filter by cut-off
  if (edgeCutoff && edgeCutoff > 0) {
    graphMinEdges = graphMinEdges.filter((e) => {
      return e.value < edgeCutoff;
    });
  }
  */
