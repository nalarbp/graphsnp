const hammingDistance = require("hamming");

function HammingMatrix(seqInJSON) {
  //make sure seqInJSON is true, containing at least 2 ids and sequences
  this.seq = seqInJSON;
  this.seqIDs = seqInJSON.map((s) => s.id);
}

HammingMatrix.prototype.getUpperMatrix = function () {
  //generate upper matrix of pairwise SNVs distance based on hamming distance
  //written in list of edge object [{source:A, target:B, value:Num}]
  let seq = this.seq;
  let ids = this.seqIDs;
  let upper_matrix = [];
  for (let i = 0; i < ids.length - 1; i++) {
    let source = seq[i];
    for (let j = i + 1; j < seq.length; j++) {
      let target = seq[j];
      let snpDist = hammingDistance(source.sequence, target.sequence);
      upper_matrix.push({
        source: source.id,
        target: target.id,
        value: snpDist,
      });
    }
  }
  return { matrix_headers: ids, matrix_cells: upper_matrix };
};

HammingMatrix.prototype.getNodesEdges = function () {
  //generate object of nodes and edges {nodes: ['A', 'B', ...], edges: [{source:A, target:B, value:Num}, ...]}
  return { nodes: this.seqIDs, edges: this.getUpperMatrix() };
};

export default HammingMatrix;
