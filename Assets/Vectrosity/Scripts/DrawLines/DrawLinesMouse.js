// The DrawLinesTouch script adapted to work with mouse input

var lineMaterial : Material;
var maxPoints = 1000;
var lineWidth = 4.0;
var minPixelMove = 5;	// Must move at least this many pixels per sample for a new segment to be recorded
private var linePoints : Vector2[];
private var line : VectorLine;
private var lineIndex = 0;
private var previousPosition : Vector2;
private var sqrMinPixelMove : int;
private var canDraw = false;

function Start () {
	linePoints = new Vector2[maxPoints];
	line = new VectorLine("DrawnLine", linePoints, lineMaterial, lineWidth, LineType.Continuous);
	sqrMinPixelMove = minPixelMove*minPixelMove;
}

function Update () {
	var mousePos = Input.mousePosition;
	if (Input.GetMouseButtonDown(0)) {
		Vector.ZeroPointsInLine(line);
		line.minDrawIndex = 0;
		Vector.DrawLine(line);
		previousPosition = linePoints[0] = mousePos;
		lineIndex = 0;
		canDraw = true;
	}
	else if (Input.GetMouseButton(0) && (mousePos - previousPosition).sqrMagnitude > sqrMinPixelMove && canDraw) {
		previousPosition = linePoints[++lineIndex] = mousePos;
		line.minDrawIndex = lineIndex-1;
		line.maxDrawIndex = lineIndex;
		if (lineIndex >= maxPoints-1) canDraw = false;
		Vector.DrawLine(line);
	}
}