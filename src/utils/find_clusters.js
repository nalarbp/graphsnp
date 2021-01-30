import { findConnectedComponents } from "../algorithm/cluster_fcc";
import { findLouvain } from "../algorithm/cluster_louvain";

export function findClusters(graphObject, clusterMethod) {
  let clusteringResult = null;
  switch (clusterMethod) {
    case "Connected Components":
      clusteringResult = findConnectedComponents(graphObject);
      break;
    case "Louvain":
      clusteringResult = findLouvain(graphObject);
      break;

    default:
      break;
  }
  return clusteringResult;
}
