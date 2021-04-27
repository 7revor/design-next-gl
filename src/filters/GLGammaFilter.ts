import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl?raw";
import GammaFragmentShader from "../shaders/GammaFragmentShader.glsl?raw";

export default class GLGammaFilter extends GLFilter {
  name = "gamma";
  protected vertexShader = VertexShader;
  protected fragmentShader = GammaFragmentShader;
  protected uniformsConfig = {
    gamma: { type: SchemaTypes.float, default: 1 },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
