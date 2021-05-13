import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl?raw";
import BlendLinearDodgeFragmentShader from "../shaders/BlendLinearDodgeFragmentShader.glsl?raw";

const { vec4 } = SchemaTypes;

export default class GLBlendLinearDodgeFilter extends GLFilter {
  name = "blendLinearDodge";
  protected vertexShader = VertexShader;
  protected fragmentShader = BlendLinearDodgeFragmentShader;
  protected uniformsConfig = {
    color: { type: vec4, default: [0, 0, 0, 0] },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
