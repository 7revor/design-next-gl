import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl?raw";
import BlendScreenFragmentShader from "../shaders/BlendScreenFragmentShader.glsl?raw";

const { vec4 } = SchemaTypes;

export default class GLBlendScreenFilter extends GLFilter {
  name = "blendScreen";
  protected vertexShader = VertexShader;
  protected fragmentShader = BlendScreenFragmentShader;
  protected uniformsConfig = {
    color: { type: vec4, default: [0, 0, 0, 0] },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
