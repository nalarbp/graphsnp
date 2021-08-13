//========================================== SeqTrack ================================================
/* Adapted from SeqTrack algorithm implemented in:
- paper
*/
import GraphEdgeList from "../model/graphEdgeList_prop";
import Moment from "moment";
import { extendMoment } from "moment-range";

const _ = require("lodash");
const moment = extendMoment(Moment);
var dbinom = require("@stdlib/stats-base-dists-binomial-pmf");

export function createSeqTrack(
  rawMatrix,
  metadataMap,
  snpSeq_len,
  mut_rate = null
) {
  let hammingDistMat = _.cloneDeep(rawMatrix);
  //list of case
  let cases = []; //list of case object [ {id: caseID, date: caseDate}, ...  ]
  metadataMap.forEach((val, key) => {
    cases.push({ id: key, date: val.sample_date });
  });
  // console.log("cases:", cases);

  //error check
  let paramsError = false;
  //check for consistency of id between sequence and metadata
  for (let i = 0; i < cases.length; i++) {
    let aCase = cases[i];
    let caseInAlignment = hammingDistMat.has(aCase.id);
    if (!caseInAlignment) {
      paramsError = true;
      alert(
        "Case id in metadata is not consistent with taxa id in alignment:" +
          aCase.id
      );
      break;
    }
  }
  //other check

  //Fun 4: Running selAmongAncestors
  function selAmongAncestors(
    aCase,
    ancesWithLowestSNPdist,
    snpLen = snpSeq_len,
    mu = mut_rate,
    metadata = metadataMap
  ) {
    //if proximity matrix is available do here:
    //but not now, because we dont have one in graphsnp

    if (ancesWithLowestSNPdist.length > 1) {
      let ancesWithLowestSNPdist_wDate = ancesWithLowestSNPdist
        .map((d) => {
          d["date"] = moment(metadata.get(d.id).sample_date);
          return d;
        })
        .sort((a, b) => a.date > b.date);

      // if mutation rate not available, choose the oldest one

      if (!mut_rate || !snpLen) {
        let oldestAnces = ancesWithLowestSNPdist_wDate[0];
        return { ances: oldestAnces.id, snpDist: oldestAnces.snpDist };
      } else {
        console.log("with mutation");
        let case_date = moment(aCase.date);
        let ancesWithLowestSNPdist_wDayDiff = ancesWithLowestSNPdist_wDate.map(
          (a) => {
            let timeDiff = case_date.diff(a.date, "days");
            let prob = dbinom(a.snpDist, timeDiff * snpLen, mu);
            a["dayDiff"] = timeDiff;
            a["probability"] = prob;
            return a;
          }
        );
        let sorted_ancesWithLowestSNPdist_wDayDiff =
          ancesWithLowestSNPdist_wDayDiff.sort(
            (a, b) => a.probability < b.probability
          );
        let mostProbableAnces = sorted_ancesWithLowestSNPdist_wDayDiff[0];
        // improvement: if there are two equaly most probable ances, return all.
        return {
          ances: mostProbableAnces.id,
          snpDist: mostProbableAnces.snpDist,
        };
      }
    }
  }

  //Fun 3: Get snp distances between case to its ances candidates, then select the lowest
  function compareAncesSNPdist(aCase, ancesCanditates, hammingDistMat) {
    let snpDistAnces = [];
    for (let i = 0; i < ancesCanditates.length; i++) {
      const ancesCandId = ancesCanditates[i].id;
      // edgesOfAnces is a list of object paired (both dir)
      let edgesOfAnces = hammingDistMat.get(ancesCandId).filter((d) => {
        if (d.target === aCase.id) {
          return true;
        } else {
          return false;
        }
      });

      snpDistAnces.push({ id: ancesCandId, snpDist: edgesOfAnces[0].value });
    }

    snpDistAnces.sort((a, b) => a.snpDist - b.snpDist);
    // console.log("snpDistAnces", snpDistAnces);
    //which ances has the lowest SNP dist?
    let lowestSNPdistAnces = snpDistAnces.filter((e) => {
      if (e.snpDist === snpDistAnces[0].snpDist) {
        return true;
      } else {
        return false;
      }
    });
    // console.log("lowestSNPdistAnces", lowestSNPdistAnces);
    return lowestSNPdistAnces;
  }

  //Fun 2: Running and calling selAmongAncestors
  function findAncestor(aCase, cases, hammingDistMat) {
    //Search and return 1 best ancestor for a caseID, from the list of available cases
    //+based on case's collection date, and (if available) mutation rate and haplo length
    //+(length of snp sites)
    let bestAncestor = { ances: null, snpDist: null };
    //1. Find ancestor candidates: other case(s) which collected before this caseId
    let candid = cases.filter((c) => {
      if (c.date < aCase.date) {
        return true;
      } else {
        return false;
      }
    });
    //2. Check whether this case have ancestor(s) or not. If no its the index case (ancestor = 'NA')
    //+ if has multiple canditates, run selAmongAncestors to choose 1 most likely candidate

    // if it is index case, set ances to NA, return bestAnces
    if (candid.length === 0) {
      bestAncestor.ances = "NA";
      bestAncestor.snpDist = "NA";
      // console.log("index case:", bestAncestor);
      return bestAncestor; // fun stop here
    }

    // if it is the second case (only have 1 candidate). set ances to identified ances, return bestAnces
    else if (candid.length === 1) {
      bestAncestor.ances = candid[0].id;
      let candidHamDist = hammingDistMat.get(candid[0].id).filter((d) => {
        let cond = d.target === aCase.id ? true : false;
        return cond;
      });
      bestAncestor.snpDist = candidHamDist[0].value;
      // console.log("second case:", bestAncestor);
      return bestAncestor; // fun stop here
    }

    // any other cases (multiple candidates were found)
    else {
      //filter candidates based on their snp distance, get candidate(s) with the least snpDist
      let ancesWithLowestSNPdist = compareAncesSNPdist(
        aCase,
        candid,
        hammingDistMat
      ); //return a list of ances(s) [{}, {}]

      //check if ancesWithLowestSNPdist is more than 1
      if (ancesWithLowestSNPdist.length > 1) {
        let selectedAnces = selAmongAncestors(aCase, ancesWithLowestSNPdist);
        bestAncestor.ances = selectedAnces.ances;
        bestAncestor.snpDist = selectedAnces.snpDist;
        return bestAncestor;
      } else {
        //ancesWithLowestSNPdist is a list of one object [{ances: 'ancesID', snpDist: number}]
        bestAncestor.ances = ancesWithLowestSNPdist[0].id;
        bestAncestor.snpDist = ancesWithLowestSNPdist[0].snpDist;
        return bestAncestor;
      }
    }
  }

  // PERFORM THIS FUN IF ALL REQUIREMENTS ARE MET
  if (!paramsError) {
    //initial result
    let res = new Map();
    for (let index = 0; index < cases.length; index++) {
      const thisCase = cases[index];
      //Fun 1: calling findAncestor function
      let ancestor = findAncestor(thisCase, cases, hammingDistMat); //must return one best ancestor object for this caseId {ances: sample_id, snpDist= null}
      //set the ancestor of this case to the result map
      res.set(thisCase.id, ancestor);
    }

    //create a final graph object from the res map object
    let final_graph = { nodes: [], edges: [] };
    res.forEach((v, k) => {
      final_graph.nodes.push(k);
      if (v.ances !== "NA") {
        final_graph.edges.push({
          source: v.ances,
          target: k,
          value: v.snpDist,
          dir: "forward",
        });
      }
    });
    //final_graph.nodes.push("NA");

    //return final graph

    return final_graph;
  } else {
    let final_graph = { nodes: null, edges: null };
    return final_graph;
  }
}
