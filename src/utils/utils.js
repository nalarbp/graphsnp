const hammingDistance = require("hamming");

export function filterUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function generateCytoscapeGraph(seq, colDate, expDate, settings) {
  let graph;
  switch (settings.method) {
    case "slv":
      if (seq) {
        let snpDist_df = createMEG(seq);
        if (snpDist_df) {
          //create cytoscape data structure
          //let data = [{ data: { id: id, label: name } },
          //            { data: {source: s, target: t, weight: w} }  ]
          let cytoscapeData = [];
          let nodes = seq
            .map((d) => {
              return d.id;
            })
            .filter(filterUnique);
          //adding nodes data
          nodes.forEach((d) => {
            cytoscapeData.push({ data: { id: d } });
          });
          //adding edges data
          snpDist_df.forEach(function (d) {
            cytoscapeData.push({
              data: {
                source: d.var1,
                target: d.var2,
                weight: d.dist,
                dir: "none",
              },
            });
          });
          graph = cytoscapeData;
        }
      }
      break;
    case "cathai":
      break;

    default:
      break;
  }
  return graph;
}

function createMEG(seq) {
  let snpDist_df = [];
  let minDistances = [];
  //
  for (let i = 0; i < seq.length - 1; i++) {
    const var1 = seq[i];
    let minTracker = { id: var1.id, dist: null };
    //console.log(minTracker.id, var1.id);
    for (let j = i + 1; j < seq.length; j++) {
      const var2 = seq[j];
      let snpDist = hammingDistance(var1.sequence, var2.sequence);
      snpDist_df.push({ var1: var1.id, var2: var2.id, dist: snpDist });
      //console.log(minTracker.dist, snpDist);
      if (minTracker.dist === null) {
        minTracker.dist = snpDist;
      } else {
        if (snpDist < minTracker.dist) {
          minTracker.dist = snpDist;
        }
      }
    }
    minDistances.push(minTracker);
  }
  let final_snpDist = [];
  //console.log(minDistances);
  minDistances.forEach((d) => {
    //filter edges to minimum only
    let minDist = snpDist_df
      .filter((e) => {
        return e.var1 === d.id || e.var2 === d.id;
      })
      .filter((f) => {
        return f.dist === d.dist;
      });
    //console.log(minDist, snpDist_df.length);
    //merge
    final_snpDist = final_snpDist.concat(minDist);
  });

  return final_snpDist.length > 0 ? final_snpDist : null;
}

function createSMEG(seq) {
  let snpDist_df = [];
  let minEdgeTracker = { s: null, t: null, dist: null };
  for (let i = 0; i < seq.length - 1; i++) {
    const var1 = seq[i];
    minEdgeTracker.s = var1.id;
    minEdgeTracker.dist = null;
    for (let j = i + 1; j < seq.length; j++) {
      const var2 = seq[j];
      let snpDist = hammingDistance(var1.sequence, var2.sequence);
      if (minEdgeTracker.dist === null) {
        minEdgeTracker.t = var2.id;
        minEdgeTracker.dist = snpDist;
      } else {
        if (snpDist < minEdgeTracker.dist) {
          minEdgeTracker.t = var2.id;
          minEdgeTracker.dist = snpDist;
        }
      }
    }
    snpDist_df.push(minEdgeTracker);
  }
  return snpDist_df.length > 0 ? snpDist_df : null;
}
