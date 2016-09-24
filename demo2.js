var vertices = [[293, 207], [224, 207], [354, 208], [411, 207], [164, 202], [162, 257], [95, 196], [293, 128], [222, 137], [220, 87], [218, 34], [371, 36], [366, 79], [363, 125]]
var edges = [[0, 1], [4, 6], [1, 4], [1, 5], [7, 13], [7, 8], [7, 9], [7, 10], [7, 11], [7, 12], [0, 7], [0, 2], [2, 3]]

function isTree() {
  var N = vertices.length
  var M = edges.length

  if(M !=  N-1) return false

  connectedVertices = []
  edges.forEach(function (e, index, array) {
    if(connectedVertices.indexOf(e[0]) < 0) {
      connectedVertices.push(e[0])
    }
    if(connectedVertices.indexOf(e[1]) < 0) {
      connectedVertices.push(e[1])
    }
  })
  if(connectedVertices.length < N) return false
  else return true
}

isTree()

var infinity = 100000

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

function printAdjacencyList(adjacencyList) {
  var adjacencyString = "<p>" + vertices.length + " vertices, " + 
    edges.length + " edges </p>"

  adjacencyList.forEach( function(v, index, array) {
  	adjacencyString += (index+1) + ": "
    v.forEach( function(e, innerIndex, innerArray) {
      	adjacencyString += "[" + (e[0]+1) + ", " + (e[1]+1) + "]"
        if(innerIndex < innerArray.length - 1) {
          adjacencyString += ", "
        }
   	})
   
    adjacencyString += "<br>"
  })

  return adjacencyString
}

function arrayMin(arr) {
  return arr.reduce(function (p, v) {
    return ( p < v ? p : v );
  });
}

function arrayMax(arr) {
  return arr.reduce(function (p, v) {
    return ( p > v ? p : v );
  });
}

function dijkstra() {
  var N = vertices.length
  var M = edges.length

  var adjacencyList = edgeListToAdjacencyList()

  println(adjacencyList)
  var vertexQueue = range(N)
  var distances = constArray(N, infinity)
  println(distances)
  var previousVertex = constArray(N, -1)

  distances[focusIndex] = 0

  while(vertexQueue.length > 0) {
    queueDistances = []
    vertexQueue.forEach( function(v, index, array) {
      queueDistances.push(distances[v])
    })
    
    var minDist = arrayMin(queueDistances)
    var pos = queueDistances.indexOf(minDist)
    var v = vertexQueue[pos]
    println(v)
    println(minDist)
    //var pos = vertexQueue.indexOf(v)
    vertexQueue.splice(pos, 1)

    adjacencyList[v].forEach(function (e, index, array) {
      var alt = distances[v] + 1
      if(alt < distances[e[1]]) {
        distances[e[1]] = alt
        previousVertex[e[1]] = v
      }
    })
  }

  console.log(distances.toString())
  return distances
}

function distanceSums() {
  var N = vertices.length
  var sumArray = constArray(N, 0)
  
  sumArray.forEach( function(s, index, array) {
    focusIndex = index
  	var distSum = dijkstra().reduce(function (sum, dist) {
      sum += dist
      return sum
  	})
    array[index] = distSum
  })
  
  return sumArray
}

function printDistanceSums() {
  var sumArray = distanceSums()
  
  var distanceString = "<p> Distances for " + vertices.length + " vertices </p>"
  sumArray.forEach( function (sum, index, array) {
    distanceString += index + ": " + sum + "<br>"
  })
  
  return distanceString
}

printDistanceSums()