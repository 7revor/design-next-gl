precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
uniform float brightness;
void main(){
  vec4 color=texture2D(img,vTexCoord);
  color.rgb+=brightness;
  gl_FragColor=color;
}