function DistanceMatrix(distMatCSV, headers) {
  this.distMatCSV = distMatCSV;
  this.headers = headers;
}

DistanceMatrix.prototype.createMatrix = function () {
  //written in list of edge object [{source:A, target:B, value:Num}]
  //re-structure graph object in: adjacency list (Map) e.g {taxaU: [{target: taxaV, value: UV_value}], taxaV: [{target: taxaU, value: VU_value}]}
  let matrixMap = new Map();
  //for each row
  this.distMatCSV.forEach((row) => {
    let diagStat = "newRowStart";
    // in this row, for each column do:
    this.headers.forEach((t) => {
      //if headers == "" mean its the first column, ignore
      if (t !== "") {
        // idx = 1++
        let sourceTaxa = row[""];
        let targetTaxa = t;
        let snpDist = row[t];
        //console.log("++", diagStat, targetTaxa);

        //is it diagonal? if true mark it then skip, we dont need diagonal value
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
  });

  return matrixMap; //an adjacency Map
};

export default DistanceMatrix;
