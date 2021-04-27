precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
uniform lowp float whitebalance;

const lowp vec3 warmFilter=vec3(.93,.54,0.);
const mediump mat3 RGBtoYIQ=mat3(.299,.587,.114,.596,-.274,-.322,.212,-.523,.311);
const mediump mat3 YIQtoRGB=mat3(1.,.956,.621,1.,-.272,-.647,1.,-1.105,1.702);
const mediump float tint=0.;
void main(){
  vec4 color=texture2D(img,vTexCoord);
  mediump vec3 yiq=RGBtoYIQ*color.rgb;//adjusting tint
  yiq.b=clamp(yiq.b+tint*.5226*.1,-.5226,.5226);
  lowp vec3 rgb=YIQtoRGB*yiq;
  lowp vec3 processed=vec3(
    (rgb.r<.5?(2.*rgb.r*warmFilter.r):(1.-2.*(1.-rgb.r)*(1.-warmFilter.r))),//adjusting whitebalance
    (rgb.g<.5?(2.*rgb.g*warmFilter.g):(1.-2.*(1.-rgb.g)*(1.-warmFilter.g))),
    (rgb.b<.5?(2.*rgb.b*warmFilter.b):(1.-2.*(1.-rgb.b)*(1.-warmFilter.b))));
    
    color.rgba=vec4(mix(rgb,processed,whitebalance),color.a);
    
    gl_FragColor=color;
  }