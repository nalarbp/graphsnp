// function GraphEdgeList(graphAdjacencyMap) {
//   //instance of edge list that take an adjacency map object
//   this.adjMap = graphAdjacencyMap;
// }

// GraphEdgeList.prototype.nodes = function () {
//   return graphAdjacencyMap.keys();
// };

// GraphEdgeList.prototype.edges = function () {
//   let edgeList = [];
//   this.adjMap.forEach((val, key) => {
//     val.forEach((c) => {
//       edgeList.push({ source: key, target: c.target, value: c.value });
//     });
//   });
//   return edgeList;
// };

// GraphEdgeList.prototype.symetricEdges = function () {
//   let symEdges = this.edges();
//   symEdges = symEdges.filter(
//     (thing, index, self) =>
//       index ===
//       self.findIndex(
//         (t) =>
//           t.source === thing.target &&
//           t.target === thing.source &&
//           t.value === thing.value
//       )
//   );
//   return symEdges;
// };

// GraphEdgeList.prototype.cutSymeticEdges = function (cutOff) {
//   let cutSymEdges = this.symetricEdges();
//   if (cutOff && cutOff > 0) {
//     cutSymEdges = edgeList.filter((e) => {
//       return e.val < cutOff;
//     });
//   }
//   return cutSymEdges;
// };

// export default GraphEdgeList;
