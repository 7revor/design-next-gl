precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
uniform float vibrance;
void main(){
  vec4 color=texture2D(img,vTexCoord);
  float average=(color.r+color.g+color.b)/3.;
  float mx=max(color.r,max(color.g,color.b));
  float amt=(mx-average)*(-vibrance*3.);
  color.rgb=mix(color.rgb,vec3(mx),amt);
  gl_FragColor=color;
}