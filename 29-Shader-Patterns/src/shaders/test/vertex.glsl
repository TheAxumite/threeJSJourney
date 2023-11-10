attribute vec2 auv2; // Additional UV coordinates
attribute vec2 Random; // Assuming this is additional data you want to pass to the vertex

varying vec2 vUv;
varying vec2 uv2;
varying float time;
varying vec2 randomnum;

uniform float uTime;



void main() {
    // vec3 mid = cos(vec3(uTime))*2.0;
    vec3 mid = vec3(0);
    float rotation = (-uTime/6.0) ;
    
    // Simple rotation around the x-axis
    // vec3 rotatedPosition = vec3(
    //     position.x, // X coordinate remains unchanged
    //     position.y * cos(rotation) + position.z * sin(rotation), // Y' = Ycos(θ) + Zsin(θ)
    //     position.y * -sin(rotation) + position.z * cos(rotation)  // Z' = -Ysin(θ) + Zcos(θ)
    // );

    //  // Rotate around the Y-axis
    vec3 rotatedPosition2 = vec3(
        cos(rotation) * (position.x - mid.x) + sin(rotation) * (position.z - mid.z) + mid.x,
        position.y, // Y coordinate remains unchanged
        -sin(rotation) * (position.x - mid.x) + cos(rotation) * (position.z - mid.z) + mid.z
    );

    //  // Simple rotation around the Z-axis
    // vec3 rotatedPosition3 = vec3(
    //     cos(rotation) * (position.x - mid.x) - sin(rotation) * (position.y - mid.y) + mid.x,
    //     sin(rotation) * (position.x - mid.x) + cos(rotation) * (position.y - mid.y) + mid.y,
    //     position.zs
    // );

    gl_Position = projectionMatrix * modelViewMatrix * vec4(rotatedPosition2, 1.0);
    
    vUv = uv;
    uv2 = auv2;
    time = uTime;
    randomnum = Random;
}
