import { getHighestLocation } from "../utils/utils";

function StayList(stayList) {
  this.stays = stayList; // [patientStay]
}

StayList.prototype.getRangeOfStays = function () {
  // return the earliest and latest admission in and out
  let earliestIn, latestOut;
  if (Array.isArray(this.stays) && this.stays.length > 0) {
    this.stays.forEach((d) => {
      if (earliestIn) {
        earliestIn = earliestIn > d.start_date ? d.start_date : earliestIn;
      } else {
        earliestIn = d.start_date;
      }

      if (latestOut) {
        latestOut = latestOut < d.end_date ? d.end_date : latestOut;
      } else {
        latestOut = d.end_date;
      }
    });
  }
  return { start_date: earliestIn, end_date: latestOut };
};

StayList.prototype.getLocationLevel = function () {
  //console.log("called", this.stays);
  // return score of deepest location level from all stay object
  // 1=hospital, 2=ward, 3=bay, 4=bed
  let locLevel;
  //console.log(this.stays);
  if (Array.isArray(this.stays) && this.stays.length > 0) {
    //console.log(this.stays);
    this.stays.forEach((s) => {
      let highestLevelStay = getHighestLocation(s);
      if (locLevel) {
        if (highestLevelStay > locLevel) {
          locLevel = highestLevelStay;
        }
      } else {
        locLevel = highestLevelStay;
      }
    });
  }
  //console.log(locLevel);
  return locLevel;
};

export default StayList;
