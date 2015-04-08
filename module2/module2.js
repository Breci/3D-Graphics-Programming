var vertexShader = null,
        fragmentShader = null,
        shaderProgram = null;

var canvas;
var gl = null;

var radius = 0.9;
var angle = 10;

function initWebGL()
{
    //don't touch this part
    canvas = document.getElementById("my-canvas");
    try
    {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch (e)
    {
    }

    if (gl)
    {
        //change here
        setupWebGL(); //prepare the drawing area
        initShaders(); //prepare shader
        setupBuffers(); // prepare data
        drawScene(); //draw data
    }
    else
    {
        alert("Error: Your browser does not appear to support WebGL.");
    }
}

function setupWebGL()
{
    gl.viewport(0, 0, canvas.width, canvas.height);
}

function initShaders()
{
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    var vertex_source = document.getElementById('shader-vs').innerHTML;
    var fragment_source = document.getElementById('shader-fs').innerHTML;

    gl.shaderSource(vertexShader, vertex_source);
    gl.shaderSource(fragmentShader, fragment_source);

    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert("Error compiling shader: " + gl.getShaderInfoLog(vertexShader));
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert("Error compiling shader: " + gl.getShaderInfoLog(fragmentShader));
    }

    //create program
    shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }

    gl.useProgram(shaderProgram);

}


function setupBuffers()
{
    var a = []; //angle array
    var i = 0;//counter

    //calculate the different angle for the points to draw
    for (i; i < 360 / angle; i++)
        a.push(angle * i);

    angleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, angleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(a), gl.STATIC_DRAW);
}

function drawScene()
{
    var radiusLocation = gl.getUniformLocation(shaderProgram, "radius");
    gl.uniform1f(radiusLocation, radius);
    var angleLocation = gl.getAttribLocation(shaderProgram, "angle");
    gl.enableVertexAttribArray(angleLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, angleBuffer);
    gl.vertexAttribPointer(angleLocation, 1, gl.FLOAT, false, 0, 0);
    if (document.getElementById("line").checked)
        gl.drawArrays(gl.LINE_LOOP, 0, 360 / angle);
    else if (document.getElementById("point").checked)
        gl.drawArrays(gl.POINTS, 0, 360 / angle);
    else if (document.getElementById("polygon").checked)
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 360 / angle);
}