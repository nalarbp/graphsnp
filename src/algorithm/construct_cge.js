//========================================== CGE ================================================
/* Combined genomic epidemiology weighted graph
- get pair-wise SNPs distance
- get all available metadata matrix
- create weigted graph
*/
export function createCGE(mat, metadataObj, edgeCutoff) {
  //Assumed the input is true
  //Take an adjacency matrix of pair-wise SNVs distance and edgecutoff (number > 0)
  //Return graph with only edge that have minimum value among other pair-wise sibling edges
  let taxaIDs = mat.matrix_headers;
  let taxaMatrix = mat.matrix_cells;

  //Filter minimum
  let graphMinEdges = [];
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
  graphMinEdges.forEach((j) => {
    j.value = 1;
  });

  for (let x = 0; x < taxaIDs.length; x++) {
    let var1 = taxaIDs[x];
    for (let y = x + 1; y < taxaIDs.length - 1; y++) {
      let var2 = taxaIDs[y];
      //for each available categorical information

      const element = array[y];
    }
    const element = array[x];
  }
  //check available edges
  return { nodes: taxaIDs, edges: graphMinEdges };
}
