export function createCytoscapeData(graphObject) {
  //create cytoscape data structure
  //let data = [{ data: { id: id, label: name } },
  //            { data: {source: s, target: t, weight: w} }  ]
  let cytoscapeData = [];
  let creatorMethod = graphObject.creator;
  let nodes = graphObject.nodes;
  let edges = graphObject.edges;

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
  //if method is mscg
  if (creatorMethod === "mscg") {
    ///adding nodes data
    nodes.forEach((d) => {
      let node_data = d.data;
      //if compound
      if (node_data && node_data.type === "compound") {
        //add parent
        cytoscapeData.push({
          data: { id: d.id, data: node_data },
        });
        //add childrens
        node_data.contents.forEach((s) => {
          cytoscapeData.push({
            data: {
              id: s,
              parent: d.id,
              data: { type: "singleton", size: null, contents: null },
            },
          });
        });
      }
      //else: singleton
      else {
        cytoscapeData.push({
          data: { id: d.id, data: node_data },
        });
      }
    });
  }
  //for other methods
  else {
    ///adding nodes data
    nodes.forEach((d) => {
      let node_data = { type: "singleton", size: null, contents: null };
      cytoscapeData.push({
        data: { id: d, data: node_data },
      });
    });
  }

  return cytoscapeData;
}

/*
if (creatorMethod === "mscg") {
    ///adding nodes data
    nodes.forEach((d) => {
      let node_data = d.data;
      cytoscapeData.push({
        data: { id: d.id, data: node_data },
      });
    });
  } else {
    ///adding nodes data
    nodes.forEach((d) => {
      let node_data = { type: "singleton", size: null, contents: null };
      cytoscapeData.push({
        data: { id: d, data: node_data },
      });
    });
  }
*/
