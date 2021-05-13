precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
uniform vec4 color;

float blendLinearBurn(float base,float blend){
  // Note : Same implementation as BlendSubtractf
  return max(base+blend-1.,0.);
}

vec3 blendLinearBurn(vec3 base,vec3 blend){
  // Note : Same implementation as BlendSubtract
  return max(base+blend-vec3(1.),vec3(0.));
}

vec3 blendLinearBurn(vec3 base,vec3 blend,float opacity){
  return(blendLinearBurn(base,blend)*opacity+base*(1.-opacity));
}
void main()
{
  vec4 bgColor=texture2D(img,vTexCoord);
  
  gl_FragColor=vec4(blendLinearBurn(bgColor.rgb,color.rgb,color.a),bgColor.a);
}