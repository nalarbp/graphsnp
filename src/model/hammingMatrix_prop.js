const hammingDistance = require("hamming");

function HammingMatrix(seqInJSON) {
  //make sure seqInJSON is true, containing at least 2 ids and sequences
  this.seq = seqInJSON;
  this.seqIDs = seqInJSON.map((s) => s.id);
}

HammingMatrix.prototype.getHammingMatrix = function () {
  //generate upper matrix of pairwise SNVs distance based on hamming distance
  //written in list of edge object [{source:A, target:B, value:Num}]
  //re-structure graph object in: adjacency list (Map) e.g {taxaU: [{target: taxaV, value: UV_value}], taxaV: [{target: taxaU, value: VU_value}]}
  let seq = this.seq;
  let ids = this.seqIDs;
  let matrixMap = new Map();
  for (let i = 0; i < ids.length - 1; i++) {
    let sourceTaxa = seq[i];
    for (let j = i + 1; j < seq.length; j++) {
      let targetTaxa = seq[j];
      let snpDist = hammingDistance(sourceTaxa.sequence, targetTaxa.sequence);
      //upper
      if (matrixMap.get(sourceTaxa.id)) {
        let currentList = matrixMap.get(sourceTaxa.id);
        currentList.push({
          source: sourceTaxa.id,
          target: targetTaxa.id,
          value: snpDist,
          part: "upper",
        });
        matrixMap.set(sourceTaxa.id, currentList);
      } else {
        let newList = [
          {
            source: sourceTaxa.id,
            target: targetTaxa.id,
            value: snpDist,
            part: "upper",
          },
        ];
        matrixMap.set(sourceTaxa.id, newList);
      }
      //lower
      if (matrixMap.get(targetTaxa.id)) {
        let currentList = matrixMap.get(targetTaxa.id);
        currentList.push({
          source: targetTaxa.id,
          target: sourceTaxa.id,
          value: snpDist,
          part: "lower",
        });
        matrixMap.set(targetTaxa.id, currentList);
      } else {
        let newList = [
          {
            source: targetTaxa.id,
            target: sourceTaxa.id,
            value: snpDist,
            part: "lower",
          },
        ];
        matrixMap.set(targetTaxa.id, newList);
      }
    }
  }
  return matrixMap; //an adjacency Map
};

// HammingMatrix.prototype.getUpperMatrix = function () {
//   //generate upper matrix of pairwise SNVs distance based on hamming distance
//   //written in list of edge object [{source:A, target:B, value:Num}]
//   //re-structure graph object in: adjacency list (object) e.g {taxaU: [{target: taxaV, value: UV_value}], taxaV: [{target: taxaU, value: VU_value}]}
//   let seq = this.seq;
//   let ids = this.seqIDs;
//   let upper_matrix = [];
//   for (let i = 0; i < ids.length - 1; i++) {
//     let source = seq[i];
//     for (let j = i + 1; j < seq.length; j++) {
//       let target = seq[j];
//       let snpDist = hammingDistance(source.sequence, target.sequence);
//       upper_matrix.push({
//         source: source.id,
//         target: target.id,
//         value: snpDist,
//       });
//     }
//   }
//   return { matrix_headers: ids, matrix_cells: upper_matrix };
// };

// HammingMatrix.prototype.getNodesEdges = function () {
//   //generate object of nodes and edges {nodes: ['A', 'B', ...], edges: [{source:A, target:B, value:Num}, ...]}
//   return { nodes: this.seqIDs, edges: this.getUpperMatrix() };
// };

export default HammingMatrix;
