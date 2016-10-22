var vertices = [[292, 63], [346, 114], [298, 158], [231, 181], [358, 198], [435, 211], [443, 282], [292, 246], [320, 292], [249, 291]]
var edges = [[8, 9], [7, 8], [7, 9], [4, 7], [4, 5], [5, 6], [4, 6], [2, 4], [1, 2], [0, 1], [0, 2], [2, 3], [0, 3], [1, 4]]

N = vertices.length

function constArray(n, value) {
  return Array.apply(0, Array(n)).map(function (_, _) {return value})
}


function range(start, end) {
  if(arguments.length == 1) {
    end = start
    start = 0
  }
  var n = Math.max(end - start, 0)

  return Array.apply(0, Array(n)).map(function (_, i) {return start + i})
}

function edgeListToAdjacencyList() {
  var N = vertices.length

  var adjacencyList = Array.apply(0, Array(N)).map(function (_, _) {return []})

  edges.forEach(function (e, index, array) {
    adjacencyList[e[0]].push([e[0], e[1]])
    adjacencyList[e[1]].push([e[1], e[0]])
  })

  return adjacencyList
}

function swap(e) {
  return [e[1], e[0]]
}

function dfs_edge_orienting(r, adjacencyList) {
  function joinBackedges(forwardEdges) {
    var backwardEdges = []
    
    for(let e of edges) {
      var forward = false
      for(let f of forwardEdges) {
        if((e[0] == f[0] && e[1] == f[1]) ||
           (e[1] == f[0] && e[0] == f[1])) {
          forward = true
        }
      }
      if(!forward) {
        if(discovered[e[0]] < discovered[e[1]]) backwardEdges.push([e[0], e[1]])
        else backwardEdges.push([e[1], e[0]])
      }
    }
    
    return {all: forwardEdges.concat(backwardEdges), backedges: backwardEdges}
  }
  
  function dfs(v, counter) {
    discovered[v] = counter
    counter += 1
    
    for(let e of adjacencyList[v]) {
      if(discovered[e[1]] == 0) {
        forwardEdges.push(swap(e))
        counter = dfs(e[1], counter)
      }
    }
    
    return counter
  }
  var discovered = constArray(N, 0)
  var forwardEdges = []
  
  dfs(r, 1)
  
  console.log(forwardEdges)
  var ret = joinBackedges(forwardEdges)
  ret.order = discovered
  return ret
}

var M = edges.length

function printDirectedEdges(directedEdges) {
  directedEdges.sort(function (e, f) {
    return e[0]-f[0]
  });
  
  var counter = 0;
  var s = "<br>"
  for( var i=0; i<N; i += 1) {
    s += i + ": "
    while(counter < M && directedEdges[counter][0] == i) {
      s += "(" + i + ", " + directedEdges[counter][1] + "); "
      counter += 1
    }
    s += "<br>"
  }
  return s
}

var adjacencyList = edgeListToAdjacencyList()
var directedEdges = dfs_edge_orienting(0, adjacencyList)

directedEdges.backedges.sort(function (a, b) { 
  								var order = directedEdges.order
                                return order.indexOf(a[0]) - order.indexOf(b[0])
							})

console.log(directedEdges.all)
console.log(directedEdges.backedges)
console.log(edges.length)

function and(arr) {
  return arr.reduce( function (p, v) { return p&&v });
}

function or(arr)  {
  return arr.reduce( function (p, v) { return p||v });
}

function twoConnectedness(allEdges, backedges) {
  var chainCycles = constArray(backedges.length, false)
  var visitedVerts = constArray(N, false)
  var visitedEdges = constArray(M, false)
  
  function markVisited(edge) {
    for(var i=0; i<M; i += 1) {
      var e = allEdges[i]
      if(edge[0] == e[0] && edge[1] == e[1])
      {
        var ret = visitedEdges[i]
        visitedEdges[i] = true
        return ret
      }
    }
  }
  
  function runThroughChain(backedge) {
    var start = backedge[0]
    var nextVert = backedge[1]
    
    visitedVerts[start] = true
    markVisited(backedge)
    
    while(!visitedVerts[nextVert]) {
      visitedVerts[nextVert] = true
      for(var i=0; i<allEdges.length; i+=1) {
        var e = allEdges[i]
        if(e[0] == nextVert) 
        {
          nextVert = e[1]
          visitedEdges[i] = true
          break
        }
      }
    } 
    
    return nextVert == start
  }
  
  
  for(var i=0; i<backedges.length; i += 1) {
    chainCycles[i] = runThroughChain(backedges[i])
    console.log(chainCycles[i])
  }
  
  console.log(visitedEdges)
  console.log(chainCycles)
  
  if(!and(visitedEdges)) return 0; //not 2-edge-connected
  else if(or(chainCycles.slice(1, chainCycles.length))) return 1; //2-edge-connected
  					//but not 2-connected
  else return 2 //2-connected
}

function printConnInfo(connInfo) {
  if(connInfo == 0) return "Graph is not 2-edge-connected<br>"
  else if(connInfo == 1) return "Graph is 2-edge-connected but not 2-connected<br>"
  else return "Graph is 2-connected<br>"
}

var connInfo = twoConnectedness(directedEdges.all, directedEdges.backedges)

printConnInfo(connInfo)