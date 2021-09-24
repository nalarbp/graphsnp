import { ExportToCsv } from "export-to-csv";
import { downloadFileAsText } from "./utils";

const Graph = require("graphlib").Graph;
const dot = require("graphlib-dot");

export function createClusterCSVFile(members) {
  if (members) {
    const options = {
      fieldSeparator: ",",
      filename: "GraphSNP_clusterID",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(members);
  }
}

export function createSNPdistCSVFile(snp_dist) {
  //its like un-filtered edges
  if (snp_dist) {
    const options = {
      fieldSeparator: ",",
      filename: "GraphSNP_symetric_pairwise_snp_differences",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(snp_dist);
  }
}

export function createDOTGraph(graphObject) {
  let directedList = ["hierSnpsMetaStayOverlap"];
  let isDirected =
    directedList.indexOf(graphObject.creator) !== -1 ? true : false;
  let nodes = graphObject.nodes;
  let edges = graphObject.edges;

  let digraph = new Graph({ multigraph: true });

  if (Array.isArray(nodes) && nodes.length > 0) {
    nodes.forEach((n) => {
      digraph.setNode(n);
    });
  }

  if (Array.isArray(edges) && edges.length > 0) {
    edges.forEach((e) => {
      let source = e.source;
      let target = e.target;
      let weight = e.value === 0 || e.value ? e.value : "null";
      let dir = isDirected ? "forward" : "none";
      digraph.setEdge(source, target, { weight: weight, dir: dir });
    });
  }

  let graphDOTcontent = dot.write(digraph);

  downloadFileAsText("Graph_in_DOT.gv", graphDOTcontent);
}
