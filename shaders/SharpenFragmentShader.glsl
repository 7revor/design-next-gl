precision highp float;
uniform sampler2D img;

varying highp vec2 vTexCoord;
varying highp vec2 leftTextureCoordinate;
varying highp vec2 rightTextureCoordinate;
varying highp vec2 topTextureCoordinate;
varying highp vec2 bottomTextureCoordinate;

varying highp float centerMultiplier;
varying highp float edgeMultiplier;

void main(){
  vec3 textureColor=texture2D(img,vTexCoord).rgb;
  vec3 leftTextureColor=texture2D(img,leftTextureCoordinate).rgb;
  vec3 rightTextureColor=texture2D(img,rightTextureCoordinate).rgb;
  vec3 topTextureColor=texture2D(img,topTextureCoordinate).rgb;
  vec3 bottomTextureColor=texture2D(img,bottomTextureCoordinate).rgb;
  
  gl_FragColor=vec4((textureColor*centerMultiplier-(leftTextureColor*edgeMultiplier+rightTextureColor*edgeMultiplier+topTextureColor*edgeMultiplier+bottomTextureColor*edgeMultiplier)),texture2D(img,vTexCoord).a);
  
}