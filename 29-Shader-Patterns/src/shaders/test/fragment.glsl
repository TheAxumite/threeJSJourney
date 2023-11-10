#define PI 3.1415926358979

varying vec2 vUv;
varying vec2 uv2;
varying float time;
varying vec2 randomnum;


float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}




void main() {
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //Pattern 3
    // float strength = vUv.x;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //Pattern 4
    // float strength = vUv.y;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //Pattern 5
    // float strength = 1.0 - vUv.y;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //Pattern 6
    // float strength = vUv.y * 10.0;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //Pattern 7
    // float strength = mod(vUv.y * 10.0, 1.0) ;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

     //Pattern 8
    // float strength = mod(vUv.y * 10.0, 1.0) ;
    //Regular if statement
    // if(strength < 0.5){
    //     strength = 0.0;
    // }
    // else{
    //     strength = 1.0+;
    // }

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

     //Altnernative to if statement
    //  float strength = mod(vUv.y * 10.0, 1.0) ;
    //  strength = strength < 0.5 ? 0.0 : 1.0;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //Pattern 9
    // float strength = mod(vUv.y * 10.0, 1.0) ;

    //Alternative to if statement(fastest)
    //  strength = step(0.5, strength);
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //Pattern 10
    // float strength = mod(vUv.x * 10.0, 1.0) ;
    // strength = step(0.5, strength);

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Pattern 11
   float strength =step(0.8, mod(vUv.x * 10.0, 1.0));
   strength  += step(0.8, mod(vUv.y * 10.0, 1.0));

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// //Pattern 12
//    float strength =step(0.8, mod(vUv.x * 10.0, 1.0));
//    strength  *= step(0.8, mod(vUv.y * 10.0, 1.0));

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// //Pattern 13
//    float strength =step(0.4, mod(vUv.x * 10.0, 1.0));
//    strength  -= step(0.2, mod(vUv.y * 10.0, 1.0));

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //Pattern 14
//    float xaxis =step(0.4, mod(vUv.y * 10.0, 1.0));
//     xaxis  *= step(0.8, mod(vUv.x * 10.0,1.0));
//   float yaxis =step(0.4, mod(vUv.x * 10.0, 1.0));
//     yaxis  *= step(0.8, mod(vUv.y * 10.0, 1.0)); 
//   float strength = xaxis + yaxis;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//   Pattern 15
//    float xaxis =step(0.4, mod(vUv.y * 10.0, 1.0));
//    xaxis  *= step(0.8, mod(vUv.x * 10.0,1.0));
//   float yaxis =step(0.4, mod(vUv.x * 10.0 + 0.8, 1.0));
//     yaxis  *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
//   float strength = xaxis + yaxis;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 // Pattern 16  
 //The abs function returns the absolute value of its argument. The absolute value of a number is its value without regard to its sign. In other words, abs converts negative numbers to positive numbers and leaves positive numbers unchanged.
// float strength = abs(vUv.x - 0.5);

// // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Pattern 17
//float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//  Pattern 18
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//  Pattern 19
    // float strength = step(0.25, abs(vUv.x - 0.5)) + step(0.25, abs(vUv.y - 0.5)); 

//  Pattern 20
// float strength = step(0.40, abs(vUv.x - 0.5)) + step(0.40, abs(vUv.y - 0.5)); 
    
//Pattern 21
//  float strength =  floor(vUv.x * 10.0) * 0.1;


// //Pattern 22
// float strength =  floor(vUv.x * 10.0) * 0.099;
// strength *= floor(vUv.y * 10.0) * 0.1;

//Pattern 23
// float strength =  random(vUv);


//Pattern 24
// vec2 gridUv = vec2(
//     floor(vUv.x * 10.0) * 0.1,
//     floor(vUv.y * 10.0) * 0.1 );

// float strength = random(gridUv);

// Pattern 25
// vec2 gridUv = vec2(
//     floor(vUv.x * 10.0)  / 05.0,
//     floor((vUv.y + vUv.x) * 10.0) / 05.0
//     );

// float strength = random(gridUv);

// Pattern 26
// float strength = length(vUv);

// Pattern 27
// float strength = length(vUv - 0.5) - 0.02;

// Pattern 28
// float strength = 1.0 - length(vUv - 0.5) - 0.02;

// Pattern 29
// float strength = 0.015 / length(vUv - 0.5) * 1.0;

// Pattern MyOwn
// float strength = 0.095 / distance(vUv.y, 0.5)/ 10.0;
// strength += 0.095 / distance(vUv, vec2(0.5))/ 1.5;

// Pattern 30
// vec2 lightUv = vec2( 
//     vUv.x * 0.1 + 0.45,
//      vUv.y  * 0.5 + 0.25
// );
// float strength =  0.015 / distance(lightUv, vec2(0.5));

// Pattern 31
// vec2 lightUvX = vec2( 
//     vUv.x * 0.1 + 0.45,
//      vUv.y  * 0.5 + 0.25
// );

// float strength = 0.015 / distance(lightUvX, vec2(0.5));

// Pattern 31
// vec2 lightUvX = vec2( 
//     vUv.x * 0.1 + 0.45,
//      vUv.y  * 0.5 + 0.25
// );

// vec2 lightUvY = vec2( 
//     vUv.y * 0.1 + 0.45,
//      vUv.x  * 0.5 + 0.25
// );

// float lightX = 0.0055 / distance(lightUvX, vec2(0.5));
// float lightY = 0.0055 / distance(lightUvY, vec2(0.5));
// float strength = lightX + lightY;

// Pattern 32

// vec2 rotatedUv=  rotate(vUv, PI * 0.25, vec2(0.5));

// vec2 lightUvX = vec2( 
//     rotatedUv.x * 0.1 + 0.45,
//      rotatedUv.y  * 0.5 + 0.25
// );

// vec2 lightUvY = vec2( 
//     rotatedUv.y * 0.1 + 0.45,
//      rotatedUv.x  * 0.5 + 0.25
// );

// float lightX = 0.0055 / distance(lightUvX, vec2(0.5));
// float lightY = 0.0055 / distance(lightUvY, vec2(0.5));
// float strength = lightX + lightY;

//Pattern 33
// float strength = step(abs(cos((time* 0.5))) * 0.5, distance(vUv, vec2(0.5)));

//Pattern 34
// float strength = abs(distance(vUv, vec2(0.5)) -0.25);
//Equivalent using the actual distance formula
// float strength = sqrt((pow(abs(vUv.x - 0.5), 2.0)) + (pow(abs(vUv.y - 0.5), 2.0)))-0.25; 

//Pattern 35
// float strength = step(0.01, abs(distance(vUv, vec2(0.5)) -0.25));
//Equivalent using the actual distance formula
// float strength = step(0.01, abs(sqrt((pow(abs(vUv.x - 0.5), 2.0)) + (pow(abs(vUv.y - 0.5), 2.0)))-0.25)); 

//Pattern 36
// float strength = step(abs(distance(vUv, vec2(0.5)) -0.25), 0.01);
//Equivalent using the actual distance formula

// float strength = step(abs(sqrt((pow(abs(vUv.x - 0.5), 2.0)) + (pow(abs(vUv.y - 0.5), 2.0)))-0.25), 0.01); 


//Pattern 37
// float strength = step(abs(distance(vUv, vec2(0.5)) -0.25), 0.01);
//Equivalent using the actual distance formula

// vec2 waveUV = vec2(vUv.x,
// (vUv.y) + sin(vUv.x * 10.0) * 0.1
// );
// float strength = step(abs(sqrt((pow(abs(waveUV.x - 0.5), 2.0)) + (pow(abs(waveUV.y - 0.5), 2.0)))-0.25), 0.010); 


//Pattern 38
// float strength = step(abs(distance(vUv, vec2(0.5)) -0.25), 0.01);
//Equivalent using the actual distance formula

// vec2 waveUV = vec2(vUv.x + sin(vUv.y * 30.0) * 0.1,
// (vUv.y) + sin(vUv.x * 30.0) * 0.1
// );
// float strength = step(abs(sqrt((pow(abs(waveUV.x - 0.5), 2.0)) + (pow(abs(waveUV.y - 0.5), 2.0)))-0.25), 0.010); 


//Pattern 39
// float strength = step(abs(distance(vUv, vec2(0.5)) -0.25), 0.01);
//Equivalent using the actual distance formula

// vec2 waveUV = vec2(vUv.x + sin(vUv.y * 150.0 * sin(time * 0.05)) * 0.1,
// (vUv.y) + sin(vUv.x * 150.0 * sin(time*0.005)) * 0.1
// );
// float strength = step(abs(sqrt((pow(abs(waveUV.x - 0.5), 2.0)) + (pow(abs(waveUV.y - 0.5), 2.0)))-0.25), 0.010); 


//Pattern 40
// // float angle = atan(vUv.x,vUv.y)
// // float strength = angle;
// float strength = vUv.x;
// strength += 1.0-vUv.y ;

//Pattern 413
//Almost working version. My version
// float strength =  vUv.x - 0.5;
// strength += step(0.5, vUv.x);
// strength += 0.05 - vUv.y - 0.05;
//strength -= vUv.y + 0.05;

// float strength = atan(vUv.x - 0.5,vUv.y - 0.5);

//Pattern 42
// float strength = atan(vUv.x - 0.5,vUv.y - 0.5) *0.15;
// strength += step(-vUv.x , 0.5) * 0.45;

//His version
// float strength = atan(vUv.x - 0.5,vUv.y - 0.5);
// strength /= PI * 2.0;
// strength += 0.5;


//Pattern 43
// float strength = atan(vUv.x - 0.5,vUv.y - 0.5);
// strength /= PI * 2.0;
// strength += 0.5;
// strength *= 50.0;
// strength = mod(strength, 1.0);


//Pattern 44
// float angle = atan(vUv.x - 0.5,vUv.y - 0.5);
// angle /= PI * 2.0;
// angle += 0.5;
// float strength = sin((time*4.0) + angle * 100.0)  ;

//Pattern 45
// float angle = atan(vUv.x - 0.5,vUv.y - 0.5);
// angle /= PI * 2.0;
// angle += 0.5;
// float sinusiod = sin((time*4.0) + angle * 100.0)  ;

// float radius = 0.25 + sinusiod * 0.02;
// vec2 waveUV = vec2(vUv.x + cos(vUv.x * 0.50 ) * 0.05 ,
// (vUv.y) + cos(vUv.y * 0.5) * 0.05
// );
// float strength = step(abs(sqrt((pow(abs(waveUV.x - 0.5), 2.0)) + (pow(abs(waveUV.y - 0.5), 2.0))) - radius), 0.005); 

//Pattern 46
// float strength = cnoise(vUv * 10.0);

//Pattern 47
// float strength = cnoise(vUv * 10.0);


//Pattern 48
// float strength = step(0.0 ,cnoise(vUv * 10.0));


//Pattern 49
// float strength = 1.0 - abs(cnoise(vUv * 10.0));



//Pattern 50
// float strength = step(0.9, sin(cos(time * 4.5) * 10.5  + abs(cnoise(vUv * 10.0)) * 20.0));

//Black and white version
//  gl_FragColor = vec4(strength , strength , strength, 1.0);

//Animated colors that change
//  gl_FragColor = vec4(strength * sin(time*0.5), strength * abs(cos(time*0.05)), strength * abs(sin(time * 0.5 )), 1.0);
// gl_FragColor = vec4(strength + 1.5*abs(sin(time*0.2)) * 0.5 , strength + 1.5*abs(cos(time*0.2)) * 0.5, strength, 1.0);

//Clamp Strength
strength = clamp(strength, -0.0, 1.0);

//Colored version
vec3 blackColor = vec3(sin(time * 0.05));
vec3 uvColor = vec3(vUv, 1.1);
vec3 mixedColor = mix(blackColor, uvColor, strength);
gl_FragColor = vec4(mixedColor, 1.0);

}
