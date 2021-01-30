import { filterUnique } from "../utils/utils";
const louvain = require("louvain");
/*
group: [[], [], []]
members: [{sample: taxa, clusterID: groupNumber}]
*/
export function findLouvain(graphObject) {
  let edges = graphObject.edges;
  let nodes = [];
  edges.forEach((d) => {
    nodes.push(d.source, d.target);
  });
  nodes = nodes.filter(filterUnique);
  let groups = new Map();
  let members = [];
  let community = louvain.jLouvain().nodes(nodes).edges(edges);
  let louvainResult = community();
  for (let key in louvainResult) {
    let clusterGroup = louvainResult[key];
    members.push({ sample: key, clusterID: clusterGroup });

    if (groups.get(clusterGroup)) {
      let currentList = groups.get(clusterGroup);
      currentList.push(key);
      groups.set(clusterGroup, currentList);
    } else {
      groups.set(clusterGroup, [key]);
    }
  }
  let group = [];
  groups.forEach((val, key) => {
    group.push(val);
  });

  return { group: group, members: members };
}
