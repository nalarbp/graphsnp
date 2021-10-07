import { filterUnique } from "../utils/utils";
const louvain = require("louvain");
/*
group: [[], [], []]
members: [{sample: taxa, clusterID: groupNumber}]
*/
export function findLouvain(graphObject) {
  let edges = graphObject.edges;
  let all_nodes = graphObject.nodes;
  let nodes = [];
  edges.forEach((d) => {
    nodes.push(d.source, d.target);
  });
  nodes = nodes.filter(filterUnique);
  let groups = new Map();
  let members = [];
  let community = louvain.jLouvain().nodes(nodes).edges(edges);
  let louvainResult = community();
  let taxas = [];

  for (let key in louvainResult) {
    taxas.push(key);
    let clusterGroup = louvainResult[key] + 1;
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

  //make all nodes saved in members
  all_nodes.forEach((n) => {
    if (taxas.indexOf(n) === -1) {
      members.push({
        sample: n,
        clusterID: "na",
      });
    }
  });
  console.log("Louvain", group, members);

  return { group: group, members: members };
}
