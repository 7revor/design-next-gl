precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
uniform lowp float gamma;
void main(){
  vec4 color=texture2D(img,vTexCoord);
  color.rgba=vec4(pow(color.rgb, vec3(gamma)), color.a);
  gl_FragColor=color;
}