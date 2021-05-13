precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
uniform vec4 color;

float blendSoftLight(float base,float blend){
  return(blend<.5)?(2.*base*blend+base*base*(1.-2.*blend)):(sqrt(base)*(2.*blend-1.)+2.*base*(1.-blend));
}

vec3 blendSoftLight(vec3 base,vec3 blend){
  return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));
}

vec3 blendSoftLight(vec3 base,vec3 blend,float opacity){
  return(blendSoftLight(base,blend)*opacity+base*(1.-opacity));
}

void main()
{
  vec4 bgColor=texture2D(img,vTexCoord);
  
  gl_FragColor=vec4(blendSoftLight(bgColor.rgb,color.rgb,color.a),bgColor.a);
}
