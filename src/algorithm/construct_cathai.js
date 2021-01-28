//========================================== CATHAI ================================================
export function createCATHAI(mat, edgeCutoff) {
  //Assumed the input is true
  //Take an adjacency matrix of pair-wise SNVs distance and edgecutoff (number > 0)
  //Return graph with all edges that pass the cut-off criterion
  let taxaIDs = mat.matrix_headers;
  let taxaMatrix = mat.matrix_cells;

  //Filter minimum
  let graphCATHAI = [];
  taxaIDs.forEach((taxa) => {
    let taxa_df = taxaMatrix
      .filter((t) => {
        return t.source == taxa || t.target == taxa;
      })
      .filter(function (g) {
        let duplicatedG = graphCATHAI.find(function (h) {
          return h.source === g.source && h.target === g.target;
        });
        return !duplicatedG ? true : false;
      });
    graphCATHAI = graphCATHAI.concat(taxa_df);
  });

  //Filter by cut-off
  if (edgeCutoff && edgeCutoff > 0) {
    graphCATHAI = graphCATHAI.filter((e) => {
      return e.value < edgeCutoff;
    });
  }
  return { nodes: taxaIDs, edges: graphCATHAI };
}
