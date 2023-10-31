


 uniform vec3 uColor;
 uniform sampler2D UTexture;
 
 varying float vRandom;
 varying vec2 vUv;
 varying float vElevation;
 varying float time;


 
        
        void main()
        {
            vec4 textureColor = texture2D(UTexture, sin(vUv) + sin(time*0.5)* 0.2);
            textureColor.rgb *= vElevation  * 0.0 + 0.8;
            gl_FragColor = textureColor;
          
        }