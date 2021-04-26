attribute vec4 position;
attribute vec2 texCoord;
attribute vec2 reverseTexCoord;

uniform int reverse;
uniform float imageWidthFactor;
uniform float imageHeightFactor;
uniform float sharpen;

varying highp vec2 vTexCoord;

varying highp vec2 leftTextureCoordinate;
varying highp vec2 rightTextureCoordinate;
varying highp vec2 topTextureCoordinate;
varying highp vec2 bottomTextureCoordinate;

varying highp float centerMultiplier;
varying highp float edgeMultiplier;

void main(){
  
  vec2 widthStep=vec2(imageWidthFactor,0.);
  vec2 heightStep=vec2(0.,imageHeightFactor);
  
  if(reverse==1){
    vTexCoord=reverseTexCoord;
  }else{
    vTexCoord=texCoord;
  }
  leftTextureCoordinate=vTexCoord.xy-widthStep;
  rightTextureCoordinate=vTexCoord.xy+widthStep;
  topTextureCoordinate=vTexCoord.xy+heightStep;
  bottomTextureCoordinate=vTexCoord.xy-heightStep;
  
  centerMultiplier=1.+4.*sharpen;
  edgeMultiplier=sharpen;
  gl_Position=position;
  
}