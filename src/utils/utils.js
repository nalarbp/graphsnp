import * as al from "./algorithms";

export function filterUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function generateCytoscapeGraph(seq, colDate, expDate, settings) {
  let graphData = { method: null, cytoscape: null, distanceMatrix: null };
  switch (settings.method) {
    case "slv":
      if (seq) {
        let mcgDist = al.createMEG(seq);
        if (mcgDist && mcgDist.snpDistDF) {
          //create cytoscape data structure
          //let data = [{ data: { id: id, label: name } },
          //            { data: {source: s, target: t, weight: w} }  ]
          let cytoscapeData = [];
          let matrixTableHeaders = [];
          let matrixTableCells = [];
          let nodes = seq
            .map((d) => {
              return d.id;
            })
            .filter(filterUnique);
          matrixTableHeaders.push({
            key: "root",
            title: "",
            dataIndex: "rowKey",
          });
          //adding nodes data
          nodes.forEach((d, idx) => {
            cytoscapeData.push({ data: { id: d } });
            //Matrix - headers
            matrixTableHeaders.push({ key: d, title: d, dataIndex: d });
            //Matrix - cells
            let raw_cells = mcgDist.snpDistMat.get(d); //return [{col: MS01, val: 0}]
            let mat_cells = { key: d, rowKey: d };
            raw_cells.forEach((e) => {
              mat_cells[e.col] = e.val;
            });
            matrixTableCells.push(mat_cells);
          });
          //adding edges data
          mcgDist.snpDistDF.forEach(function (d) {
            //cytoscape
            cytoscapeData.push({
              data: {
                source: d.var1,
                target: d.var2,
                weight: d.dist,
                dir: "none",
              },
            });
          });
          //matrix

          graphData.distanceMatrix = {
            headers: matrixTableHeaders,
            cells: matrixTableCells,
          };
          graphData.method = "mcg";
          graphData.cytoscape = cytoscapeData;
        }
      }
      break;
    case "cathai":
      break;

    default:
      break;
  }
  return graphData;
}
