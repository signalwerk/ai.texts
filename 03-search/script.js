document.addEventListener("DOMContentLoaded", () => {
  const source = `
    <svg viewBox="0 0 {{width}} {{height}}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <marker id="arrowhead" markerWidth="{{markerWidth}}" markerHeight="{{markerHeight}}" refX="0" refY="{{markerHalfHeight}}" orient="auto">
                <polygon fill="black" points="0 0, {{markerWidth}} {{markerHalfHeight}}, 0 {{markerHeight}}" />
            </marker>
            <marker id="arrowheadMagnitude" markerWidth="{{markerWidth}}" markerHeight="{{markerHeight}}" refX="0" refY="{{markerHalfHeight}}" orient="auto-start-reverse">
                <polygon fill="#c69c6d" points="0 0, {{markerWidth}} {{markerHalfHeight}}, 0 {{markerHeight}}" />
            </marker>
            <marker id="arrowheadDirection" markerWidth="{{markerWidth}}" markerHeight="{{markerHeight}}" refX="0" refY="{{markerHalfHeight}}" orient="auto-start-reverse">
                <polygon fill="#ed1e79" points="0 0, {{markerWidth}} {{markerHalfHeight}}, 0 {{markerHeight}}" />
            </marker>
        </defs>
        <rect x="0" y="0" width="{{width}}" height="{{height}}" style="fill:transparent;" />
        <g transform="rotate({{angle}}, {{widthHalf}}, {{heightHalf}})">
            <text id="vectorLabel" x="{{magnitudeLabelX}}" y="{{directionLabelY}}" text-anchor="middle" fill="black" style="font-size:{{fontSizeVector}}">Vector</text>
            <line id="magnitudeLine" x1="{{magnitudeX}}" y1="{{magnitudeY}}" x2="{{magnitudeX2markerCompensation}}" y2="{{magnitudeY2}}" style="stroke:black;stroke-width:{{magnitudeStrokeWidth}}" marker-end="url(#arrowhead)" />
            <line id="magnitudeLineStart" x1="{{magnitudeX}}" y1="{{magnitudeLineMarkY1}}" x2="{{magnitudeX}}" y2="{{magnitudeLineMarkY2}}" style="stroke:#c69c6d;stroke-width:1" />
            <line id="magnitudeLineEnd" x1="{{magnitudeX2}}" y1="{{magnitudeLineMarkY1}}" x2="{{magnitudeX2}}" y2="{{magnitudeLineMarkY2}}" style="stroke:#c69c6d;stroke-width:1" />
            <line id="directionLine" x1="{{directionX}}" y1="{{directionY}}" x2="{{directionX2}}" y2="{{directionY2}}" style="stroke:#ed1e79;stroke-width:{{directionStrokeWidth}}; stroke-dasharray:4;"  marker-end="url(#arrowheadDirection)" />
            <text id="direction" x="{{directionX}}" y="{{directionLabelY}}" fill="#ed1e79" style="font-size:{{fontSize}}">Direction</text>
            <line id="magnitudeLineDistance" x1="{{magnitudeX1smallMarkerCompensation}}" y1="{{magnitudeLineDistanceY}}" x2="{{magnitudeX2smallMarkerCompensation}}" y2="{{magnitudeLineDistanceY}}" style="stroke:#c69c6d;stroke-width:1;stroke-dasharray:4;fill:red" marker-end="url(#arrowheadMagnitude)" marker-start="url(#arrowheadMagnitude)" />
            <text id="magnitudeLabel" x="{{magnitudeLabelX}}" y="{{magnitudeLabelY}}" fill="black" text-anchor="middle" style="font-size:{{fontSize}};fill:#c69c6d">Magnitude</text>
        </g>
    </svg>
    `;
  // Compile the template
  const template = Handlebars.compile(source);

  // Calculate vector magnitude and start and end points for arrow
  const width = 210;
  const height = 120;
  const offset = 10;

  // Calculate the angle in degrees
  const radians = Math.atan(height / width);
  const angle = 0 - radians * (180 / Math.PI);
  const widthHalf = width / 2; // center of rotation
  const heightHalf = height / 2; // center of rotation

  const markerWidth = 8;
  const markerHeight = 5;

  const directionLength = width - 2 * offset;
  const directionX = offset;
  const directionY = height / 2;
  const directionX2 = directionX + directionLength;
  const directionStrokeWidth = 1;
  const magnitudeLengthFactor = 0.6;
  const magnitudeLength = directionLength * magnitudeLengthFactor;
  const magnitudeX =
    directionX + directionLength * .3;
  const magnitudeStrokeWidth = 3;
  const magnitudeX2 = magnitudeX + magnitudeLength;
  const magnitudeX2markerCompensation =
    magnitudeX2 - markerWidth * magnitudeStrokeWidth;

  const magnitudeX1smallMarkerCompensation = magnitudeX + markerWidth;
  const magnitudeX2smallMarkerCompensation = magnitudeX2 - markerWidth;

  const magnitudeY = directionY;
  const magnitude = (directionX2 - directionX).toFixed(2);

  const magnitudeLineMarkY1 = magnitudeY - height / 40; // position for start and end line marks
  const magnitudeLineMarkY2 = magnitudeY + height / 4;

  const magnitudeLabelX = magnitudeX + magnitudeLength / 2;
  const magnitudeLabelY = magnitudeLineMarkY2 
  const magnitudeLineDistanceY = magnitudeLabelY - height / 9;

  // Generate the SVG
  const svg = template({
    width,
    height,

    angle,
    widthHalf,
    heightHalf,

    fontSize: height / 12,
    fontSizeVector: height / 9,
    markerWidth,
    markerHeight,
    markerHalfHeight: markerHeight / 2,
    directionX,
    directionY,
    directionX2,
    directionY2: directionY,
    directionStrokeWidth,
    directionLabelY: directionY - height / 15,
    magnitudeX,
    magnitudeX2,
    magnitudeX2markerCompensation,
    magnitudeX1smallMarkerCompensation,
    magnitudeX2smallMarkerCompensation,
    magnitudeY,
    magnitudeY2: magnitudeY,
    magnitudeStrokeWidth,
    magnitude: magnitude,
    magnitudeLineMarkY1,
    magnitudeLineMarkY2,
    magnitudeLineDistanceY,
    magnitudeLabelX,
    magnitudeLabelY,
  });

  // Inject SVG into the HTML
  const resultDiv = document.getElementById("svg-vector");
  resultDiv.innerHTML += svg;

//   document.body.innerHTML += svg;
});
