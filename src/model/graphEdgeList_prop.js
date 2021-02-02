function GraphsymEdges(nodes, edges) {
  //instance of edge list that take an adjacency map object
  this.nodes = nodes;
  this.edges = edges;
}

GraphsymEdges.prototype.getSymetricEdges = function () {
  let symEdges = this.edges;
  let tracker = new Map();
  symEdges = symEdges.filter(function (g) {
    let currentPair = g.source.concat("-", g.target);
    let inversePair = g.target.concat("-", g.source);

    let inverseEdge = symEdges.find(function (h) {
      return h.source === g.target && h.target === g.source;
    });

    if (inverseEdge) {
      if (tracker.get(inversePair) || tracker.get(currentPair)) {
        return false;
      } else {
        tracker.set(currentPair, true);
        tracker.set(inversePair, true);
        return true;
      }
    } else {
      tracker.set(currentPair, true);
      tracker.set(inversePair, true);
      return true;
    }
  });
  return new GraphsymEdges(this.nodes, symEdges);
};

GraphsymEdges.prototype.getEdgesLowerThanCutoff = function (cutOff) {
  let cutEdges = this.edges;
  if (cutOff && cutOff > 0) {
    cutEdges = cutEdges.filter((e) => {
      return e.value < cutOff;
    });
  }
  return new GraphsymEdges(this.nodes, cutEdges);
};

GraphsymEdges.prototype.getEdgesGreaterThanCutoff = function (cutOff) {
  let cutEdges = this.edges;
  if (cutOff && cutOff > 0) {
    cutEdges = cutEdges.filter((e) => {
      return e.value > cutOff;
    });
  }
  return new GraphsymEdges(this.nodes, cutEdges);
};

export default GraphsymEdges;
