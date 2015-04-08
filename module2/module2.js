var gl = null,
        canvas = null,
        glProgram = null,
        fragmentShader = null,
        vertexShader = null;

var radius = 1.0;
var angle = 20;

function initWebGL()
{
    canvas = document.getElementById("my-canvas");
    try 
    {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } 
    catch (e) 
    {}

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
    var fs_source = document.getElementById('shader-fs').innerHTML,
            vs_source = document.getElementById('shader-vs').innerHTML;

    vertexShader = makeShader(vs_source, gl.VERTEX_SHADER);
    fragmentShader = makeShader(fs_source, gl.FRAGMENT_SHADER);

    //create program
    glProgram = gl.createProgram();

    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);
    gl.linkProgram(glProgram);

    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }

    //use program
    gl.useProgram(glProgram);
}

function makeShader(src, type)
{
    //compile the vertex shader
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
    }
    return shader;
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
    var radiusLocation = gl.getUniformLocation(glProgram, "radius");
    gl.uniform1f(radiusLocation, radius);
    var angleLocation = gl.getAttribLocation(glProgram, "angle");
    gl.enableVertexAttribArray(angleLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, angleBuffer);
    gl.vertexAttribPointer(angleLocation, 1, gl.FLOAT, false, 0, 0);
    if (document.getElementById("line").checked)
        gl.drawArrays(gl.LINE_LOOP, 0, 360 / angle);
    else if (document.getElementById("point").checked)
        gl.drawArrays(gl.POINTS, 0, 360 / angle);
    else
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 360 / angle);
}