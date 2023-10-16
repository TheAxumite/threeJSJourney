


 uniform vec3 uColor;
 uniform sampler2D UTexture;
 
 varying float vRandom;
 varying vec2 vUv;
 varying float vElevation;

 
        
        void main()
        {
            vec4 textureColor = texture2D(UTexture, vUv);
            textureColor.rgb *= vElevation  * 2.0 + 0.8;
            gl_FragColor = textureColor;
          \
        }