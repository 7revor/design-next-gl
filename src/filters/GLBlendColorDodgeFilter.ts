import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl?raw";
import BlendColorDodgeFragmentShader from "../shaders/BlendColorDodgeFragmentShader.glsl?raw";

const { vec4 } = SchemaTypes;

export default class GLBlendColorDodgeFilter extends GLFilter {
  name = "blendColorDodge";
  protected vertexShader = VertexShader;
  protected fragmentShader = BlendColorDodgeFragmentShader;
  protected uniformsConfig = {
    color: { type: vec4, default: [0, 0, 0, 0] },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
