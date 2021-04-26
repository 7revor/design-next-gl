precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
uniform float exposure;
void main(){
  vec4 color=texture2D(img,vTexCoord);
  color.rgb=color.rgb*pow(2.,exposure);// rgb * 2^效果值
  gl_FragColor=color;
}