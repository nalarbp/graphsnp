function DistanceMatrix(distMatCSV) {
  this.distMatCSV = distMatCSV;
}

DistanceMatrix.prototype.createMatrix = function () {
  //written in list of edge object [{source:A, target:B, value:Num}]
  //re-structure graph object in: adjacency list (Map) e.g {taxaU: [{target: taxaV, value: UV_value}], taxaV: [{target: taxaU, value: VU_value}]}
  let matrixMap = new Map();
  //for each row
  for (let i = 0; i < this.distMatCSV.length; i++) {
    let row = this.distMatCSV[i];
    let colTaxas = Object.keys(row);
    let sourceTaxa = null;
    let diagStat = "newRowStart";
    // in this row, for each column do:
    colTaxas.forEach((t, idx) => {
      if (t === "") {
        sourceTaxa = row[t];
      } else {
        // idx = 1++
        let targetTaxa = t;
        let snpDist = parseFloat(row[t]);
        //console.log("++", diagStat, targetTaxa);

        //find diagonal
        if (
          sourceTaxa === targetTaxa &&
          (diagStat === "newRowStart" || diagStat === "lower")
        ) {
          diagStat = "diagonal";
        }

        //when its lower than the diagonal
        if (
          sourceTaxa !== targetTaxa &&
          (diagStat === "newRowStart" || diagStat === "lower")
        ) {
          diagStat = "lower";
          //lower
          //if map exist; retrieve, push and set
          if (matrixMap.get(sourceTaxa)) {
            let currentList = matrixMap.get(sourceTaxa);
            currentList.push({
              source: sourceTaxa,
              target: targetTaxa,
              value: snpDist,
              part: diagStat,
            });
            matrixMap.set(sourceTaxa, currentList);
          }
          //if no; create one and set
          else {
            let newList = [
              {
                source: sourceTaxa,
                target: targetTaxa,
                value: snpDist,
                part: diagStat,
              },
            ];
            matrixMap.set(sourceTaxa, newList);
          }
        }

        //when its upper than diagonal
        if (
          sourceTaxa !== targetTaxa &&
          (diagStat === "diagonal" || diagStat === "upper")
        ) {
          diagStat = "upper";
          //upper
          //if map exist; retrieve, push and set
          if (matrixMap.get(sourceTaxa)) {
            let currentList = matrixMap.get(sourceTaxa);
            currentList.push({
              source: sourceTaxa,
              target: targetTaxa,
              value: snpDist,
              part: diagStat,
            });
            matrixMap.set(sourceTaxa, currentList);
          }
          //if no; create one and set
          else {
            let newList = [
              {
                source: sourceTaxa,
                target: targetTaxa,
                value: snpDist,
                part: diagStat,
              },
            ];
            matrixMap.set(sourceTaxa, newList);
          }
        }
      }
    });
  }
  return matrixMap; //an adjacency Map
};

export default DistanceMatrix;
