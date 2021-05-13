

precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
uniform vec4 color;

float blendLinearDodge(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}

vec3 blendLinearDodge(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendAdd
	return min(base+blend,vec3(1.0));
}

vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
	return (blendLinearDodge(base, blend) * opacity + base * (1.0 - opacity));
}

void main()
{
  vec4 bgColor=texture2D(img,vTexCoord);
  
  gl_FragColor=vec4(blendLinearDodge(bgColor.rgb,color.rgb,color.a),bgColor.a);
}