
precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
uniform vec4 color;

float blendColorDodge(float base, float blend) {
	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

vec3 blendColorDodge(vec3 base, vec3 blend) {
	return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));
}

vec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {
	return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));
}





void main()
{
  vec4 bgColor=texture2D(img,vTexCoord);
  
  gl_FragColor=vec4(blendColorDodge(bgColor.rgb,color.rgb,color.a),bgColor.a);
}