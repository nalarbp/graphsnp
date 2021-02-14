import { ExportToCsv } from "export-to-csv";

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
