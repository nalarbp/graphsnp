export function createCytoscapeData(graphObject) {
  //create cytoscape data structure
  //let data = [{ data: { id: id, label: name } },
  //            { data: {source: s, target: t, weight: w} }  ]
  let creatorMethod = graphObject.creator;
  let nodes = graphObject.nodes;
  let edges = graphObject.edges;

  let cytoscapeData = [];
  //converting edges to cytoscape data
  edges.forEach((el) => {
    cytoscapeData.push({
      data: {
        source: el.source,
        target: el.target,
        weight: el.value,
        dir: el.dir === "forward" ? "forward" : "none",
      },
    });
  });

  ///adding nodes data
  nodes.forEach((d) => {
    let node_data = creatorMethod === "nlv" ? d.data : [];
    let node_type = creatorMethod === "nlv" ? "compound" : "singleton";
    cytoscapeData.push({
      data: { id: d, nodeType: node_type, data: node_data },
    });
  });

  return cytoscapeData;
}

/*
let cytoscapeData = [];
  //extracting edges
  let edgeList = [];
  graphObject.mapData.forEach((val, key) => {
    nodes.push(key);
    val.forEach((c) => {
      edgeList.push({ source: key, target: c.target, value: c.value });
    });
  });
  //Filtering duplicates edges
  let tracker = new Map();
  edgeList = edgeList.filter(function (g) {
    let currentPair = g.source.concat("-", g.target);
    let inversePair = g.target.concat("-", g.source);

    let inverseEdge = edgeList.find(function (h) {
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
      return true;
    }
  });
*/
