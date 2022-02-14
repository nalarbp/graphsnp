//========================================== Minimum Spanning Cut-Off Graph ================================================
import GraphEdgeList from "../model/graphEdgeList_prop";
import { findConnectedComponents } from "./cluster_fcc";
import { min } from "d3-array";
const kruskalMST = require("kruskal-mst");
const _ = require("lodash");
export function createMSCG(rawMatrix, edgeCutoff) {
  //Assumed the input is true
  //Take an adjacency Map of pair-wise SNVs distance and edgecutoff (number > 0)
  //Return graph with only edge that have minimum value among other pair-wise sibling edges (format adjacency list)
  let mat = _.cloneDeep(rawMatrix);

  let minDistLut = new Map();
  let nodeList_CATHAI = [];
  let edgeList_CATHAI = [];

  mat.forEach((val, key) => {
    //1. create LUT containing all key and their minimum dist ======

    //2. perform CATHAI  ======
    //+save nodes
    nodeList_CATHAI.push(key);
    //+remove edges below the cut-off
    if (edgeCutoff !== null && edgeCutoff > 0) {
      let filteredVal = val.filter((e) => {
        return e.value <= edgeCutoff;
      });
      //+merge them
      edgeList_CATHAI = edgeList_CATHAI.concat(filteredVal);
    }
  });

  //remove inverse duplicates edges
  let graphEdgeList = new GraphEdgeList(
    nodeList_CATHAI,
    edgeList_CATHAI
  ).getSymetricEdges();
  let graphObject_simplified = {
    nodes: graphEdgeList.nodes,
    edges: graphEdgeList.edges,
  };

  //3. perform FCC
  let fcc_clusters = findConnectedComponents(graphObject_simplified);

  //4. build the MSCG
  let nodelist_MSCG = [];
  let edgelist_MSCG = [];
  let singletons = fcc_clusters.members.filter((d) => {
    if (d.clusterID === "na") {
      return true;
    } else {
      return false;
    }
  });

  //+create relationship between identified clusters and other singleton
  if (fcc_clusters.group.length > 0) {
    for (let i = 0; i < fcc_clusters.group.length; i++) {
      let sourceClusterID = "Group " + (i + 1);

      let sourceClusterMembers = fcc_clusters.group[i];
      nodelist_MSCG.push({
        id: sourceClusterID,
        data: {
          type: "compound",
          size: sourceClusterMembers.length,
          contents: sourceClusterMembers,
        },
      });

      //+get pairwise cluster to cluster
      for (let j = i + 1; j < fcc_clusters.group.length; j++) {
        let targetClusterID = "Group " + (j + 1);
        if (sourceClusterID !== targetClusterID) {
          let targetClusterMembers = fcc_clusters.group[j];
          let minDist = [];
          sourceClusterMembers.forEach((sc) => {
            targetClusterMembers.forEach((tc) => {
              let dist = mat
                .get(sc)
                .filter((d) => (d.target === tc ? true : false));
              minDist.push(dist[0].value);
            });
          });
          //create edgelist
          edgelist_MSCG.push({
            source: sourceClusterID,
            target: targetClusterID,
            value: min(minDist),
          });
        }
      }

      //+get pairwise cluster to singletons
      for (let k = 0; k < singletons.length; k++) {
        let targetSingleton = singletons[k].sample;
        let minDistCS = [];
        sourceClusterMembers.forEach((sc) => {
          let dist = mat
            .get(sc)
            .filter((d) => (d.target === targetSingleton ? true : false));
          minDistCS.push(dist[0].value);
        });
        //create edgelist
        edgelist_MSCG.push({
          source: sourceClusterID,
          target: targetSingleton,
          value: min(minDistCS),
        });
      }
    }
  }

  //+create relationship between singleton to singleton
  if (singletons.length > 0) {
    for (let l = 0; l < singletons.length; l++) {
      //add singleton as node
      let sourceS = singletons[l].sample;
      nodelist_MSCG.push({
        id: sourceS,
        data: {
          type: "singleton",
          size: null,
          contents: null,
        },
      });

      for (let m = l + 1; m < singletons.length; m++) {
        let targetS = singletons[m].sample;
        if (sourceS !== targetS) {
          //create edgelist between singletons
          let sourceS_LUT = mat.get(sourceS).filter((s) => {
            if (s.target === targetS) {
              return true;
            } else {
              return false;
            }
          });

          edgelist_MSCG.push({
            source: sourceS,
            target: targetS,
            value: sourceS_LUT[0].value,
          });
        }
      }
    }
  }

  //5. Perform MST
  //+transform edges
  let kruskalEdges = edgelist_MSCG.map((d) => {
    return { from: d.source, to: d.target, weight: d.value };
  });
  let mstEdges = kruskalMST.kruskal(kruskalEdges);

  //+transfom back
  let finalEdges = mstEdges.map((d) => {
    return { source: d.from, target: d.to, value: d.weight };
  });

  return {
    nodes: nodelist_MSCG,
    edges: finalEdges,
    clusterGroup: fcc_clusters,
  };
}
