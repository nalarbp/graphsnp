import { findConnectedComponents } from "../algorithm/cluster_fcc";

export function findClusters(graphObject, clusterMethod) {
  let clusteringResult = null;
  switch (clusterMethod) {
    case "Connected Components":
      clusteringResult = findConnectedComponents(graphObject);
      break;
    case "cathai":
      break;

    default:
      break;
  }
  return clusteringResult;
}
