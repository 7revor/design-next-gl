precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
void main(){
  gl_FragColor=texture2D(img,vTexCoord);
}