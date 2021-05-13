import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl?raw";
import BlendLinearBurnFragmentShader from "../shaders/BlendLinearBurnFragmentShader.glsl?raw";

const { vec4 } = SchemaTypes;

export default class GLBlendLinearBurnFilter extends GLFilter {
  name = "blendLinearBurn";
  protected vertexShader = VertexShader;
  protected fragmentShader = BlendLinearBurnFragmentShader;
  protected uniformsConfig = {
    color: { type: vec4, default: [0, 0, 0, 0] },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
