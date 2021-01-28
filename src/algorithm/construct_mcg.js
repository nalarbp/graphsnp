//========================================== MCG ================================================
export function createMCG(mat, edgeCutoff) {
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
  return { nodes: taxaIDs, edges: graphMinEdges };
}
