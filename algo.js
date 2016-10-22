export function isTree() {
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
