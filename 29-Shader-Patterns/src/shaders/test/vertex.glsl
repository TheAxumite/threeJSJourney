
attribute vec2 Random;
varying vec2 vUv;
uniform float uTime;
attribute vec2 auv2;
varying vec2 uv2;
varying float time;
varying vec2 randomnum;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
    uv2 = auv2;
    time = uTime;
    randomnum = Random;
}

