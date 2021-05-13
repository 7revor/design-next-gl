import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl?raw";
import BlendSoftLightFragmentShader from "../shaders/BlendSoftLightFragmentShader.glsl?raw";

const { vec4 } = SchemaTypes;

export default class GLBlendSoftLightFilter extends GLFilter {
  name = "blendSoftLight";
  protected vertexShader = VertexShader;
  protected fragmentShader = BlendSoftLightFragmentShader;
  protected uniformsConfig = {
    color: { type: vec4, default: [0, 0, 0, 0] },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
