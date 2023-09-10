// Get the WebGL context
var canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
var gl = canvas.getContext('webgl');

// Define vertices and colors
var vertices = new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5,
    0.00,0.5,
  0.0,  0.5,  // Vertex 1
 -0.5, -0.5,  // Vertex 2
  0.5, -0.5,
  0.5, 0.5,
  0.5, -0.5,
  0.00,0.5  // Vertex 3
  
]);

var colors = new Float32Array([
  1.0,  1.0,  1.0, 1.0,  // Red
  0.0, 1.0, 0.0, 1.0,  // Green
  0.0, 0.0, 1.0, 1.0,   // Blue
  1.0,  1.0,  1.0, 1.0,  // Red
  0.0, 1.0, 0.0, 1.0,  // Green
  0.0, 0.0, 1.0, 1.0,   // Blue
  1.0,  1.0,  1.0, 1.0,  // Red
  0.0, 1.0, 0.0, 1.0,  // Green
  0.0, 0.0, 1.0, 1.0   // Blue
]);

// Create a buffer for vertices
var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Create a buffer for colors
var colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

// Define the vertex shader
var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, `
  attribute vec2 coordinates;
  attribute vec4 color;
  varying vec4 vColor;

  void main(void) {
    gl_Position = vec4(coordinates, 0.0, 1.0);
    vColor = color;
  }
`);
gl.compileShader(vertShader);

// Define the fragment shader
var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, `
  precision mediump float;
  varying vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }
`);
gl.compileShader(fragShader);

// Create the shader program
var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Bind the buffer object to the shader
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
var coord = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
var color = gl.getAttribLocation(shaderProgram, "color");
gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(color);

// Draw the triangle
gl.clearColor(0.5, 0.5, 0.5, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0, 0, canvas.width, canvas.height);
gl.drawArrays(gl.TRIANGLES, 0, 9);
