precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
uniform float saturation;
const mediump vec3 luminanceWeighting=vec3(.2125,.7154,.0721);
void main(){
  vec4 color=texture2D(img,vTexCoord);
  vec3 gray=vec3(dot(color.rgb,luminanceWeighting));
  color.rgb=vec3(mix(gray,color.rgb,saturation+1.));
  gl_FragColor=color;
}