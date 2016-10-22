function gViewSetup(canvasConf) {
  var canvas = SVG('canvas')
      .size(canvasConf.width, canvasConf.height)

  canvas.rect(canvasConf.width, canvasConf.height).fill(canvasConf.background)

  return canvas
}

var canvas = gViewSetup(standardConf.canvas)

function drawNode(xPos, yPos, nodeConf) {
  var circle = canvas.circle(2*nodeConf.radius)
                .move(xPos-nodeConf.radius, yPos-nodeConf.radius)
                .fill(nodeConf.color)

  return circle
}

function drawEdge(x1, y1, x2, y2, edgeConf) {
  var line = canvas.line(x1, y1, x2, y2)
                  .stroke({width: edgeConf.width, color: edgeConf.color})

  return line
}

function testDrawEdgeNode() {
  var simpleGraph = {nodes: [{x: 200, y: 150}, {x: 400, y: 250}],
            edges: [[0, 1]]}
  var nodeConf = standardConf.node
  var edgeConf = standardConf.edge
  for(let node of simpleGraph.nodes) {

    drawNode(node.x, node.y, nodeConf)
  }

  var nodes = simpleGraph.nodes
  for(let edge of simpleGraph.edges) {
    var node1 = nodes[edge[0]]
    var node2 = nodes[edge[1]]
    drawEdge(node1.x, node1.y, node2.x, node2.y, edgeConf)
  }
}

//testDrawEdgeNode()
