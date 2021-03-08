//========================================== SMSO ================================================
/*
Create a directed graph object that edges represent transmissions
Directed edges was created only if pair-wise of isolates has transmission signal
Transmission signal were if transmission score >= 1, created by check patient stay overlap hiearchiely

*/

import GraphEdgeList from "../model/graphEdgeList_prop";
import Moment from "moment";
import { extendMoment } from "moment-range";
import StayList from "../model/stayList_prop";
import {
  getHighestLocation,
  filterInverseSymEdges,
  getOverlapLocationLevel,
} from "../utils/utils";

const moment = extendMoment(Moment);
const _ = require("lodash");

export function createSMSO(
  rawMatrix,
  edgeCutoff,
  rawPatientMovementData,
  metadata,
  trans_locLevel
) {
  //Assumed the input is true
  //Take an adjacency matrix of pair-wise SNVs distance and edgecutoff (number > 0)
  //Return graph with only edge <= cut-off
  let mat = _.cloneDeep(rawMatrix);
  let patientMovementData = _.cloneDeep(rawPatientMovementData);
  let edgeList = [];
  let nodeList = [];
  mat.forEach((val, key) => {
    nodeList.push(key);
    let sortedRow = val;

    //Filter by cut-off
    if (edgeCutoff && edgeCutoff > 0) {
      sortedRow = sortedRow.filter((e) => {
        return e.value <= edgeCutoff;
      });
    }

    //merge
    edgeList = edgeList.concat(sortedRow);
  });

  //Asses transmission signal on each edge
  let directedEdges = [];
  let undirectedEdges = [];
  if (edgeList.length > 0) {
    for (let i = 0; i < edgeList.length; i++) {
      let e = edgeList[i];
      //get pid
      let p1_id = metadata.get(e.source).patient_id;
      let p2_id = metadata.get(e.target).patient_id;

      let p1_sampleDate = moment(metadata.get(e.source).sample_date);
      let p2_sampleDate = moment(metadata.get(e.target).sample_date);

      //get the stays
      let p1_stays = patientMovementData.get(p1_id)
        ? new StayList(patientMovementData.get(p1_id))
        : null;

      let p2_stays = patientMovementData.get(p2_id)
        ? new StayList(patientMovementData.get(p2_id))
        : null;

      //console.log(p1_id, p1_stays_obj instanceof StayList);
      //console.log(p1_id, p1_stays_obj);

      //if we have stays data for both isolates, do, else return 0 and break
      //console.log(p1_id, p1_stays);
      if (
        p1_stays instanceof StayList &&
        p2_stays instanceof StayList &&
        Array.isArray(p1_stays.stays) &&
        Array.isArray(p2_stays.stays) &&
        p1_stays.stays.length > 0 &&
        p2_stays.stays.length > 0
      ) {
        //which location level do these patients shared? hospital=1? ward=2? bay=3? bed=4?
        //console.log(p1_stays_obj);
        //console.log(p1_stays_obj.getLocationLevel());
        let p1_locLevel = p1_stays.getLocationLevel();
        let p2_locLevel = p2_stays.getLocationLevel();
        let common_locLevel = Math.min(p1_locLevel, p2_locLevel)
          ? Math.min(p1_locLevel, p2_locLevel)
          : null;

        //console.log(common_locLevel, p1_locLevel, p2_locLevel);

        //if they dont shared any location, not even hospital, return e as undirected with score = 1 (genomic only)
        if (!common_locLevel) {
          e["dir"] = "none";
          e.value = 1;
          undirectedEdges.push(e);
        } else {
          //if they share location, at least hospital
          //check whether that had any overlap admission
          let p1_rangeOfStay = p1_stays.getRangeOfStays();
          let p2_rangeOfStay = p2_stays.getRangeOfStays();

          let p1_range = moment.range(
            p1_rangeOfStay.start_date.startOf("day"),
            p1_rangeOfStay.end_date.endOf("day")
          );
          let p2_range = moment.range(
            p2_rangeOfStay.start_date.startOf("day"),
            p2_rangeOfStay.end_date.endOf("day")
          );
          let is_p1_p2_overlap = p1_range.overlaps(p2_range);
          if (is_p1_p2_overlap) {
            //they do have overlap
            //compare the highest common level of location (common_locLevel) for both patients

            if (p2_sampleDate.isAfter(p1_sampleDate, "day")) {
              let transmissionScore = calculateTransScore(
                p1_id,
                p2_id,
                p1_stays,
                p2_stays,
                common_locLevel
              );
              e["dir"] = "forward";
              e.value = 1 + transmissionScore;
              directedEdges.push(e);
            } else {
              e["dir"] = "none";
              e.value = 1;
              undirectedEdges.push(e);
            }
          } else {
            //they dont have any overlap
            e["dir"] = "none";
            e.value = 1;
            undirectedEdges.push(e);
          }
        }
      } else {
        e["dir"] = "none";
        e.value = 1;
        undirectedEdges.push(e);
      }
    }
  }

  //let clean_undirectedEdges = filterInverseSymEdges(undirectedEdges);
  //merge edges

  directedEdges = directedEdges.filter((e) => {
    return e.value >= trans_locLevel;
  });

  //SCORING: 1: snps only, 2: snps+hospital, 3: snps+ ward, 4: snps+bay, 5: snps+bed

  //return nodes and edges with direction property
  //[edgeList[0]]

  return { nodes: nodeList, edges: directedEdges };
}

function calculateTransScore(p1, p2, p1_stays, p2_stays, common_locLevel) {
  let scoreOverlap = 0;

  //filter stays to only to the level of both patients shared location
  let p1_stays_common = p1_stays.stays.filter((s) => {
    return getHighestLocation(s) === common_locLevel;
  });
  let p2_stays_common = p2_stays.stays.filter((st) => {
    return getHighestLocation(st) === common_locLevel;
  });

  //console.log(p1_stays_common, p2_stays_common);

  //at the level of

  //compared each stays, get the least common location level, save to store, if we found bigger score, update
  for (let i = 0; i < p1_stays_common.length; i++) {
    let p1_stay = p1_stays_common[i];
    let p1_stay_range = moment.range(
      p1_stay.start_date.startOf("day"),
      p1_stay.end_date.endOf("day")
    );

    for (let j = 0; j < p2_stays_common.length; j++) {
      let p2_stay = p2_stays_common[j];
      let p2_stay_range = moment.range(
        p2_stay.start_date.startOf("day"),
        p2_stay.end_date.endOf("day")
      );

      let is_stays_overlap = p1_stay_range.overlaps(p2_stay_range);

      if (is_stays_overlap) {
        let overlapDur = p1_stay_range.intersect(p2_stay_range).diff("days");

        if (overlapDur <= 7) {
          //need to find, at which location level they were overlap
          //check the deepest one

          let loc_comm_score = getOverlapLocationLevel(p1_stay, p2_stay);

          if (p1 === "P-13" && p2 === "P-18") {
            //console.log("???", is_stays_overlap);
            //console.log("+++", overlapDur, "days");
            console.log(loc_comm_score);
            console.log(
              "p1",
              p1_stay.hospital_id,
              p1_stay.ward_id,
              p1_stay.bay_id,
              p1_stay.bed_id
            );
            console.log(
              "p2",
              p2_stay.hospital_id,
              p2_stay.ward_id,
              p2_stay.bay_id,
              p2_stay.bed_id
            );
          }
          if (loc_comm_score > scoreOverlap) {
            scoreOverlap = loc_comm_score;
          }
        }
      }
    }
  }
  return scoreOverlap;
  //SCORING: 1: hospital, 2: ward, 3: bay, 4: bed
}
