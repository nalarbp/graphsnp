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
      let snpDist = calculateHammingDistATGC(
        sourceTaxa.sequence,
        targetTaxa.sequence
      );
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

function calculateHammingDistATGC(s1, s2) {
  //ignore
  if (typeof s1 === "number" && !isNaN(s1)) {
    s1 = s1.toString();
  }
  if (typeof s2 === "number" && !isNaN(s2)) {
    s2 = s2.toString();
  }
  if (
    !(
      typeof s1 === "string" &&
      typeof s2 === "string" &&
      s1.length === s2.length
    )
  ) {
    return null;
  }

  var i = s1.length;
  var sum = 0;

  while (i--) {
    let s1_exclusiveATGC = ["A", "T", "G", "C", "a", "t", "g", "c"].includes(
      s1[i]
    );
    let s2_exclusiveATGC = ["A", "T", "G", "C", "a", "t", "g", "c"].includes(
      s2[i]
    );
    if (s1_exclusiveATGC && s2_exclusiveATGC) {
      if (s1[i] !== s2[i]) {
        sum++;
      }
    }
  }

  return sum;
}

export default HammingMatrix;
