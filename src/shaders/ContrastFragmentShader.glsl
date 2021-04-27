precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
uniform float contrast;
void main(){
  vec4 color=texture2D(img,vTexCoord);
  color.rgb=vec3(((color.rgb-vec3(.5))*(contrast+1.)+vec3(.5)));
  gl_FragColor=color;
}