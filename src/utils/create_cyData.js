export function createCytoscapeData(graphObject) {
  //create cytoscape data structure
  //let data = [{ data: { id: id, label: name } },
  //            { data: {source: s, target: t, weight: w} }  ]
  let cytoscapeData = [];
  let nodeType = graphObject.nodeType;
  let nodes = graphObject.nodes;
  let edges = graphObject.edges;

  //adding nodes data
  nodes.forEach((d) => {
    let node_data = nodeType === "singleton" ? [] : d.data;
    cytoscapeData.push({ data: { id: d, type: nodeType, data: node_data } });
  });

  //adding edges data
  edges.forEach(function (d) {
    cytoscapeData.push({
      data: {
        source: d.source,
        target: d.target,
        weight: d.value,
        dir: "none",
      },
    });
  });

  return cytoscapeData;
}
