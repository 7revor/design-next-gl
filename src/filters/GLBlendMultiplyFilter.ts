import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl?raw";
import BlendMultiplyFragmentShader from "../shaders/BlendMultiplyFragmentShader.glsl?raw";

const { vec4 } = SchemaTypes;

export default class GLBlendMultiplyFilter extends GLFilter {
  name = "blendMultiply";
  protected vertexShader = VertexShader;
  protected fragmentShader = BlendMultiplyFragmentShader;
  protected uniformsConfig = {
    color: { type: vec4, default: [0, 0, 0, 0] },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
