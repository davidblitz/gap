var vertices = []
var edges = []

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
        edges.push([index, focusIndex])
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
