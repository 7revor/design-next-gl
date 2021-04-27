precision highp float;

varying vec2 vTexCoord;

uniform sampler2D img;

uniform float pixellate;
uniform float aspectRatio;

void main()
{
  if(pixellate==0.){
    gl_FragColor=texture2D(img,vTexCoord);
  }else{
    vec2 sampleDivisor=vec2(pixellate,pixellate/aspectRatio);
    vec2 samplePos=vTexCoord-mod(vTexCoord,sampleDivisor)+.5*sampleDivisor;
    gl_FragColor=texture2D(img,samplePos);
  }
}