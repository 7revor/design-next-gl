precision highp float;
uniform sampler2D img;
varying highp vec2 vTexCoord;
uniform float hue;
const highp vec4 kRGBToYPrime=vec4(.299,.587,.114,0.);
const highp vec4 kRGBToI=vec4(.595716,-.274453,-.321263,0.);
const highp vec4 kRGBToQ=vec4(.211456,-.522591,.31135,0.);

const highp vec4 kYIQToR=vec4(1.,.9563,.6210,0.);
const highp vec4 kYIQToG=vec4(1.,-.2721,-.6474,0.);
const highp vec4 kYIQToB=vec4(1.,-1.1070,1.7046,0.);
void main(){
  vec4 color=texture2D(img,vTexCoord);
  // float angle=hue*3.141592653;
  // float s=sin(angle),c=cos(angle);
  // vec3 weights=(vec3(2.*c,-sqrt(3.)*s-c,sqrt(3.)*s-c)+1.)/3.;
  // float len=length(color.rgb);
  // color.rgb=vec3(
    //   dot(color.rgb,weights.xyz),
    //   dot(color.rgb,weights.zxy),
    //   dot(color.rgb,weights.yzx)
  // );
  highp float YPrime=dot(color,kRGBToYPrime);
  highp float I=dot(color,kRGBToI);
  highp float Q=dot(color,kRGBToQ);
  
  // Calculate the hue and chroma
  highp float _hue=atan(Q,I);
  highp float chroma=sqrt(I*I+Q*Q);
  
  // Make the user's adjustments
  _hue+=(-hue);//why negative rotation?
  
  // Convert back to YIQ
  Q=chroma*sin(_hue);
  I=chroma*cos(_hue);
  
  // Convert back to RGB
  highp vec4 yIQ=vec4(YPrime,I,Q,0.);
  color.r=dot(yIQ,kYIQToR);
  color.g=dot(yIQ,kYIQToG);
  color.b=dot(yIQ,kYIQToB);
  gl_FragColor=color;
}