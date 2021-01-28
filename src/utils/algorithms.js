const hammingDistance = require("hamming");
//========================================== MEG ================================================
/*Minimum Edges Graph Algorithm
This algoritm construct a list of isolate's (minimum) pairwise hamming distance
DEFINITION:
- A node represents isolate
- An edge represent a pairwise hamming distance (SNP distance) between two nodes
- A node has single or multiple edges to represent their pairwise distance to all the remainder nodes
- A minimum edge is an edge that its weight equal to the minimum value of a node's all edges
INPUT:
- Alignment of multi fasta SNPs sequence object 
- Sequence object structure is: {id: "name_of_isolate";string, sequence:"valid_dna_sequence";string, size:length_of_sequence;number}
- Each sequence must have identical length
PROCEDURE:
#Step 1: Construct an asymetric matrix of pairwise hamming distance and search the minimum edge for all nodes (combined step)
#Step 2: Filter the matrix to keep only edges that equal to the minimum value of the corresponding node's edges
#If succes return the matrix in form of list of edge object, otherwise return null
OUTPUT
- A list of edge list object (edges that equal to the minimum value only) 
- OR NUll
*/

export function createMCG(seq) {
  //Always assume seq is true, correct, and appropriate input (more than 2)
  //Construct the matrix, find the minimum edges and save it the list of objects
  let snpDist_df = [];
  let taxaIDs = [];
  let disMat = new Map();
  for (let i = 0; i < seq.length; i++) {
    taxaIDs.push(seq[i].id);
    if (i !== seq.length - 1) {
      //console.log(i, "===");
      const var1 = seq[i];
      const matrixCells = [];
      for (let j = i + 1; j < seq.length; j++) {
        const var2 = seq[j];
        let snpDist = hammingDistance(var1.sequence, var2.sequence);
        snpDist_df.push({ var1: var1.id, var2: var2.id, dist: snpDist });
        matrixCells.push({ col: var2.id, val: snpDist });
      }
      disMat.set(var1.id, matrixCells);
    } else {
      const var1 = seq[i];
      const matrixCells = [];
      disMat.set(var1.id, matrixCells);
    }
  }
  //Filter minimum
  let final_snpDist = [];
  taxaIDs.forEach((taxa) => {
    let taxa_df = snpDist_df.filter((t) => {
      return t.var1 == taxa || t.var2 == taxa;
    });

    let taxa_min = Math.min(...taxa_df.map((d) => d.dist)); //spread operator to extract elem from array

    let taxa_df_min = taxa_df
      .filter((e) => {
        return e.dist == taxa_min;
      })
      .filter(function (g) {
        let duplicatedG = final_snpDist.find(function (h) {
          return h.var1 === g.var1 && h.var2 === g.var2;
        });
        return !duplicatedG ? true : false;
        // if duplicatedG not found (undefined) (keep g), if inverseG exist (discard g )
        // not actually an inverse, since we created asymetric matrix, it
        // it was just a duplicated pairwise distance,
        // so h.var1 === g.var1 && h.var2 === g.var2 will works
      });
    final_snpDist = final_snpDist.concat(taxa_df_min);
  });
  // minDistances.forEach((d) => {
  //   let minDist = snpDist_df
  //     .filter((e) => {
  //       return e.var1 === d.id || e.var2 === d.id;
  //     })
  //     .filter((f) => {
  //       return f.dist === d.dist;
  //     })
  //     .filter(function (g) {
  //       let duplicatedG = final_snpDist.find(function (h) {
  //         return h.var1 === g.var1 && h.var2 === g.var2;
  //       });
  //       return !duplicatedG ? true : false;
  //       // if duplicatedG not found (undefined) (keep g), if inverseG exist (discard g )
  //       // not actually an inverse, since we created asymetric matrix, it
  //       // it was just a duplicated pairwise distance,
  //       // so h.var1 === g.var1 && h.var2 === g.var2 will works
  //     });
  //   //merge
  //   final_snpDist = final_snpDist.concat(minDist);
  // });

  return final_snpDist.length > 0
    ? { snpDistMat: disMat, snpDistDF: final_snpDist }
    : null;
}
//========================================== Single MEG ================================================
/* Similar with MEG but it only keep one minimum edges, instead of all minimum edges
 */
// function createSMEG(seq) {
//   let snpDist_df = [];
//   let minEdgeTracker = { s: null, t: null, dist: null };
//   for (let i = 0; i < seq.length - 1; i++) {
//     const var1 = seq[i];
//     minEdgeTracker.s = var1.id;
//     minEdgeTracker.dist = null;
//     for (let j = i + 1; j < seq.length; j++) {
//       const var2 = seq[j];
//       let snpDist = hammingDistance(var1.sequence, var2.sequence);
//       if (minEdgeTracker.dist === null) {
//         minEdgeTracker.t = var2.id;
//         minEdgeTracker.dist = snpDist;
//       } else {
//         if (snpDist < minEdgeTracker.dist) {
//           minEdgeTracker.t = var2.id;
//           minEdgeTracker.dist = snpDist;
//         }
//       }
//     }
//     snpDist_df.push(minEdgeTracker);
//   }
//   return snpDist_df.length > 0 ? snpDist_df : null;
// }

//========================================== SEQTRACK ================================================

export function createCATHAI(seq) {
  //Always assume seq is true, correct, and appropriate input (more than 2)
  //Construct the matrix
  let snpDist_df = [];
  let disMat = new Map();
  for (let i = 0; i < seq.length; i++) {
    if (i !== seq.length - 1) {
      const var1 = seq[i];
      const matrixCells = [];
      for (let j = i + 1; j < seq.length; j++) {
        const var2 = seq[j];
        let snpDist = hammingDistance(var1.sequence, var2.sequence);
        snpDist_df.push({ var1: var1.id, var2: var2.id, dist: snpDist });
        matrixCells.push({ col: var2.id, val: snpDist });
      }
      disMat.set(var1.id, matrixCells);
    } else {
      const var1 = seq[i];
      const matrixCells = [];
      disMat.set(var1.id, matrixCells);
    }
  }
  return snpDist_df.length > 0
    ? { snpDistMat: disMat, snpDistDF: snpDist_df }
    : null;
}
