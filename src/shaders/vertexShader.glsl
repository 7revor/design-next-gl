attribute vec4 position;
attribute vec2 texCoord;
attribute vec2 reverseTexCoord;
uniform int reverse;
varying highp vec2 vTexCoord;
void main(){
  if(reverse==1){
    vTexCoord=reverseTexCoord;
  }else{
    vTexCoord=texCoord;
  }
  gl_Position=position;
}