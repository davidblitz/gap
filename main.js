var backgroundColour = 200
var vertexFill = 255
var vertexStroke = 0
var edgeColour = 255
var focusColour = [0, 255, 0]
var textColour = 0

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

var vertices = []
vertices.name = "vertices"
vertices.print = printTupleArr

var edges = []
edges.name = "edges"
edges.print = printTupleArr


//==EditorTime====================================================
var evalButton = document.getElementById("evalButton");
var saveButton = document.getElementById("saveButton");
var loadButton = document.getElementById("loadButton");

var editor = CodeMirror(document.getElementById("editor"), {
  mode:  "javascript",
  lineNumbers: true
});
var outputText = document.getElementById("outputText")
/*myTextarea.name = "post";
myTextarea.maxLength = "500";
myTextarea.cols = "80";
myTextarea.rows = "40";
div.appendChild(myTextarea); //appendChild
div.appendChild(evalButton)
document.body.appendChild(div)

  var editor = CodeMirror.fromTextArea(myTextarea, {
    lineNumbers: true
  });

*/
evalButton.onclick = (function evalFun() {
  var code = editor.getValue()
  var result = eval(code)
  outputText.innerHTML = "Result: " + result
})

saveButton.onclick = (function saveFun() {
  var code = editor.getValue()
  var file = new File([code], "graphEdit.js", {type: "text/plain;charset=utf-8"});
  saveAs(file);
})

var openFile = function(event) {
  var input = event.target;

  var reader = new FileReader();
  reader.onload = function(){
    var text = reader.result;
    editor.setValue(text);
    var splitContent  = text.split('\n');
    background(0);
    vertices = eval(splitContent[0].split("=")[1])
    vertices.print = printTupleArr
    edges = eval(splitContent[1].split("=")[1])
    edges.print = printTupleArr
    eval(splitContent[1]);

    focusIndex = 0

    console.log("File loaded.");
  };
  reader.readAsText(input.files[0]);
};

//loadButton.onclick = ()
//--CanvasTime-------------------------------------------------


//var vertices = [[70, 120], [50, 50]]
//var edges = [[[0, 1]]]
var vertexRadius = 15
var focusIndex = -1

function draw_vertices() {
  vertices.forEach(function (v, index, array){
    stroke(vertexStroke)
    fill(vertexFill)
    if(focusIndex == index) fill(0, 255, 0)
    ellipse(v[0], v[1], vertexRadius, vertexRadius)
    stroke(textColour)
    fill(textColour)
    text(index, v[0]+vertexRadius, v[1]+vertexRadius)

  })
}

function draw_edges() {
  edges.forEach(function (e, index, array) {
    stroke(edgeColour)
    var a = {x: vertices[e[0]][0], y: vertices[e[0]][1]}
    var b = {x: vertices[e[1]][0], y: vertices[e[1]][1]}
    var n = {x: b.y-a.y, y: a.x - b.x}
    var controlPoint1 = {x: (3*a.x/4 + b.x/4 + n.x/3), y: (3*a.y/4 + b.y/4 + n.y/3)}
    var controlPoint2 = {x: (3*b.x/4 + a.x/4 + n.x/3), y: (3*b.y/4 + a.y/4 + n.y/3)}

    noFill()
    //bezier(a.x, a.y, controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, b.x, b.y)
    line(a.x, a.y, b.x, b.y)
    //noStroke()
  })
}

function mouseOnCanvas( mouseX, mouseY) {
  if(mouseX > -1 && mouseX <= width && mouseY > -1 && mouseY <= height) return true
  return false
}

function mouseClicked() {
  if(!mouseOnCanvas(mouseX, mouseY)) return
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

        if(!inEdges && v1 != v2) edges.push([v1, v2])

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
  var editorContent = editor.getValue()
  var splitContent  = editorContent.split('\n')
  splitContent[0] = "var " + vertices.print()
  splitContent[1] = "var " + edges.print()
  var newEditorContent = splitContent.join("\n")
  editor.setValue(newEditorContent)

  /*var treeBool = isTree()
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
  }*/
  return false
}

function setup() {
  var canvas = createCanvas(600, 400)
  canvas.parent('canvas')
  background(backgroundColour)
}

function draw() {
  background(backgroundColour)
  draw_vertices()
  draw_edges()
}
