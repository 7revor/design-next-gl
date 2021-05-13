precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
uniform vec4 color;

vec3 blendMultiply(vec3 base, vec3 blend) {
	return base*blend;
}

vec3 blendMultiply(vec3 base, vec3 blend, float opacity) {
	return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));
}
void main()
{
  vec4 bgColor=texture2D(img,vTexCoord);
  
  gl_FragColor=vec4(blendMultiply(bgColor.rgb,color.rgb,color.a),bgColor.a);
}