varying vec2 vUv;
varying float vElevation;
varying vec3 depthColor;
varying vec3 surfaceColor;
uniform float uColorMultiplier;
uniform float uColorOffset;



void main (){

    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
  
    vec3 color = mix(depthColor, surfaceColor, mixStrength);


         gl_FragColor = vec4(color, 1.0);
   
}