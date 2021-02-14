function Stay(pid, dateIn, dateOut, hospital, ward, bay, bed) {
  this.pid = pid;
  this.dateIn = dateIn;
  this.dateOut = dateOut;
  this.hospital = hospital;
  this.ward = ward;
  this.bay = bay;
  this.bed = bed;
}

Stay.prototype.getHighestLocation = function () {
  // return the highest available location in number format
  let res;
  if (this.hospital) {
    res = 1;
    if (this.ward) {
      res = 2;
      if (this.bay) {
        res = 3;
        if (this.bed) {
          res = 4;
        }
      }
    }
  }
  return res;
};

export default Stay;
