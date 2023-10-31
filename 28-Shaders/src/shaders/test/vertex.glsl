// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;
uniform int length;
attribute float aRandom;

// attribute vec3 position;
attribute vec3 newSize;
// attribute vec2 uv;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;
varying float time;



void main()
{
    // Transforms the vertex position from object/local space to world space.
    vec4 modelPosition = modelMatrix * vec4(newSize, 1.0);

    float elevation = -sin(modelPosition.x * uFrequency.x - uTime) * 0.01;
    float elevation2 = -sin(modelPosition.x * uFrequency.x - uTime) * 0.04;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
 

    modelPosition.z += elevation * 0.02; 
    modelPosition.y += elevation2 * 0.05; 
    // modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    // modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
    // modelPosition.y += sin(uTime * 0.05 );
    // modelPosition.x += sin(uTime * 0.05 );
  
   
    // Transforms the vertex position from world space to camera/view space.
    vec4 viewPosition = viewMatrix * modelPosition;

    // Transforms the vertex position from view space to screen space, while also applying perspective.
    // Objects outside the camera's frustum will be clipped.
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vRandom = aRandom;
    vUv = uv;
    vElevation = elevation;
    time = uTime;
}
