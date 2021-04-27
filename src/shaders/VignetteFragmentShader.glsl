precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;

uniform vec2 vignetteCenter;
uniform vec3 vignetteColor;
uniform float vignetteStart;
uniform float vignette;
void main(){
  vec4 sourceImageColor=texture2D(img,vTexCoord);
  if(vignette==0.){
    gl_FragColor=sourceImageColor;
  }else{
    float d=distance(vTexCoord,vec2(vignetteCenter.x,vignetteCenter.y));
    float percent=smoothstep(vignetteStart,1.-vignette,d);
    gl_FragColor=vec4(mix(sourceImageColor.rgb,vignetteColor,percent),sourceImageColor.a);
  }
}