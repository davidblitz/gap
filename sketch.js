
//==EditorTime====================================================
var div = document.createElement("div");
var myTextarea = document.createElement("textarea");
var evalButton = document.createElement("button");
evalButton.textContent = "Evaluate";
myTextarea.name = "post";
myTextarea.maxLength = "500";
myTextarea.cols = "80";
myTextarea.rows = "40";
div.appendChild(myTextarea); //appendChild
div.appendChild(evalButton)
document.body.appendChild(div)

  var editor = CodeMirror.fromTextArea(myTextarea, {
    lineNumbers: true
  });


evalButton.onclick = (function evalFun() {
  var code = editor.getValue()
  var result = eval(code)
  println("Result: " + result)
})

//--AlgoTime--

var infinity = 100000

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

  var adjacencyList = constArray(N, [])

  edges.forEach(function (e, index, array) {
    adjacencyList[e[0]].push([e[0], e[1]])
    adjacencyList[e[1]].push([e[1], e[0]])
  })

  return adjacencyList
}

function dijkstra() {
  var N = vertices.length
  var M = edges.length

  var adjacencyList = edgeListToAdjacencyList()

  var vertexQueue = range(N)
  var distances = constArray(N, infinity)
  var previousVertex = constArray(N, -1)

  distances[focusIndex] = 0


  while(vertexQueue.length > 0) {
    var u = Math.min(distances)
    var v = distances.indexOf(u)
    var pos = vertexQueue.indexOf(v)
    vertexQueue.splice(pos, 1)

    adjacencyList[v].forEach(function (e, index, array) {
      var alt = distances[v] + 1
      if(alt < distances[e[1]]) {
        distances[e[1]] = alt
        previousVertex[e[1]] = v
      }
    })

    return [distances, previous]
  }

  console.log(distances.toString())
}

//--UITime--

var printTupleArr = function () {
  arrString = this.name + " = ["

  this.forEach(function (el, index, array) {
    arrString += "[" + el[0] + ", " + el[1] + "]"
    if(index != array.length-1) arrString += ", "
  })

  arrString += "]"
  println(arrString)
  return arrString
}

//var vertices = [[70, 120], [50, 50]]
//var edges = [[[0, 1]]]

var vertices = []
vertices.name = "vertices"
vertices.print = printTupleArr

var edges = []
edges.name = "edges"
edges.print = printTupleArr

var vertexRadius = 15
var focusIndex = -1

function draw_vertices() {
  vertices.forEach(function (v, index, array){
    if(focusIndex == index) fill(0, 255, 0)
    ellipse(v[0], v[1], vertexRadius, vertexRadius)
    fill(255)
  })
}

function draw_edges() {
  edges.forEach(function (e, index, array) {
    stroke(255)
    line(vertices[e[0]][0], vertices[e[0]][1], vertices[e[1]][0], vertices[e[1]][1])
    noStroke()
  })
}

function mouseClicked() {
  function inVertexNbhd() {
    var inNbhd = false

    vertices.forEach(function (v, index, array) {
      if(abs(v[0]-mouseX) < vertexRadius + 5 && abs(v[1]-mouseY) < vertexRadius + 5) {
        var v1 = Math.min(index, focusIndex)
        var v2 = Math.max(index, focusIndex)

        var inEdges = false
        edges.forEach(function (e, index, array) {
          if(e[0] == v1 && e[1] == v2) inEdges = true
        })
        if(!inEdges) edges.push([v1, v2])

        focusIndex = index
        inNbhd = true
      }
    })
    return inNbhd
  }

  if(!inVertexNbhd()) {
    vertices.push([mouseX, mouseY])
    focusIndex = vertices.length-1
  }

  //printData()
  console.log("=====================================")
  vertString = vertices.print()
  edgeString = edges.print()
  editString = "var " + vertString + "\n" + "var " + edgeString + "\n"
  editor.setValue(editString)
  var treeBool = isTree()
  println("isTree() = " + treeBool)
  if(treeBool) {
    ret = dijkstra()
    distances = ret[0]
    previous = ret[1]
    outString = "Distances: \n"
    distances.forEach(function (d, ind, array) {
      outString += ind + ":" +  d
      if(ind != array.length-1) outString += ", "
    })
  }
  return false
}

function setup() {
  createCanvas(600, 400)
  background(0)
  noStroke()
}

function draw() {
  draw_vertices()
  draw_edges()
}
