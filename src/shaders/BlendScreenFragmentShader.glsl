precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
uniform vec4 color;

float blendScreen(float base,float blend){
  return 1.-((1.-base)*(1.-blend));
}

vec3 blendScreen(vec3 base,vec3 blend){
  return vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));
}

vec3 blendScreen(vec3 base,vec3 blend,float opacity){
  return(blendScreen(base,blend)*opacity+base*(1.-opacity));
}

void main()
{
  vec4 bgColor=texture2D(img,vTexCoord);
  
  gl_FragColor=vec4(blendScreen(bgColor.rgb,color.rgb,color.a),bgColor.a);
}