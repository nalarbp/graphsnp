//========================================== Find connected component ================================================
/*
group: [[], [], []
members: [{sample: taxa, clusterID: groupNumber}]
*/
export function findConnectedComponents(graphObject) {
  let adjlist = createAdjacencyList(graphObject.edges);
  let groups = [];
  let visited = {};
  let v;

  for (v in adjlist) {
    if (adjlist.hasOwnProperty(v) && !visited[v]) {
      groups.push(breadthFirstSearch(v, adjlist, visited));
    }
  }

  let clusterResult = [];
  groups = groups.sort((a, b) => a.length - b.length);
  groups.forEach((g, i) => {
    if (Array.isArray(g) && g.length > 0) {
      g.forEach((s) => {
        clusterResult.push({
          sample: s,
          clusterID: i + 1,
        });
      });
    }
  });
  //console.log(clusterResult);
  return { group: groups, members: clusterResult };
}

function createAdjacencyList(edges) {
  let adjlist = {};
  let i, len, edge, u, v;
  for (i = 0, len = edges.length; i < len; i += 1) {
    edge = edges[i];
    u = edge.source;
    v = edge.target;
    if (adjlist[u]) {
      adjlist[u].push(v);
    } else {
      adjlist[u] = [v];
    }

    if (adjlist[v]) {
      adjlist[v].push(u);
    } else {
      adjlist[v] = [u];
    }
  }
  return adjlist;
}

function breadthFirstSearch(v, adjlist, visited) {
  let q = [];
  let current_group = [];
  let i, len, adjV, nextVertex;
  q.push(v);
  visited[v] = true;
  while (q.length > 0) {
    v = q.shift();
    current_group.push(v);
    // Go through adjacency list of vertex v, and push any unvisited
    // vertex onto the queue.
    // This is more efficient than our earlier approach of going
    // through an edge list.
    adjV = adjlist[v];
    for (i = 0, len = adjV.length; i < len; i += 1) {
      nextVertex = adjV[i];
      if (!visited[nextVertex]) {
        q.push(nextVertex);
        visited[nextVertex] = true;
      }
    }
  }
  return current_group;
}

//ARCHIVED

// export function findConnectedComponents(graphObject) {
//   let adjlist = graphObject.mapData;
//   let groups = [];
//   let visited = {};
//   let v;

//   adjlist.forEach((val, key) => {
//     if (adjlist.get(key) && !visited[key]) {
//       groups.push(breadthFirstSearch(key, adjlist, visited));
//     }
//   });

//   // for (v in adjlist) {
//   //   if (adjlist.hasOwnProperty(v) && !visited[v]) {
//   //     groups.push(breadthFirstSearch(v, adjlist, visited));
//   //   }
//   // }

//   let clusterResult = [];
//   groups.forEach((g, i) => {
//     if (Array.isArray(g) && g.length > 0) {
//       g.forEach((s) => {
//         clusterResult.push({
//           sample: s,
//           clusterID: i + 1,
//         });
//       });
//     }
//   });
//   //console.log(clusterResult);

//   return { group: groups, members: clusterResult };
// }

// function breadthFirstSearch(v, adjlist, visited) {
//   let q = [];
//   let current_group = [];
//   let i, len, adjV, nextVertex;
//   q.push(v);
//   visited[v] = true;
//   while (q.length > 0) {
//     v = q.shift();
//     current_group.push(v);
//     // Go through adjacency list of vertex v, and push any unvisited
//     // vertex onto the queue.
//     // This is more efficient than our earlier approach of going
//     // through an edge list.
//     adjV = adjlist.get(v);
//     for (i = 0, len = adjV.length; i < len; i += 1) {
//       nextVertex = adjV[i].target;
//       console.log();
//       if (!visited[nextVertex]) {
//         q.push(nextVertex);
//         visited[nextVertex] = true;
//       }
//     }
//   }
//   return current_group;
// }

// function createAdjacencyList(edges) {
//   /*
//   {
//     v1: [v,x,c] => v1:[{target:v}, {target:u}]
//     v2: [x,c]
//   }
//   */
//   let adjlist = {};
//   let i, len, edge, u, v;
//   for (i = 0, len = edges.length; i < len; i += 1) {
//     edge = edges[i];
//     u = edge.source;
//     v = edge.target;
//     if (adjlist[u]) {
//       adjlist[u].push(v);
//     } else {
//       adjlist[u] = [v];
//     }

//     if (adjlist[v]) {
//       adjlist[v].push(u);
//     } else {
//       adjlist[v] = [u];
//     }
//   }
//   return adjlist;
// }
