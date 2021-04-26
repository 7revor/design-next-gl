import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "@/core/gl/shaders/vertexShader.glsl";
import GrainFragmentShader from "@/core/gl/shaders/GrainFragmentShader.glsl";

const { float, vec4 } = SchemaTypes;

export default class GLGrainFilter extends GLFilter {
  name = "grain";
  protected vertexShader = VertexShader;
  protected fragmentShader = GrainFragmentShader;
  protected uniformsConfig = {
    scale: { type: float, default: 0 },
    colorStart: { type: vec4, default: [0, 0, 0, 1] },
    colorFinish: { type: vec4, default: [1, 1, 1, 1] },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
