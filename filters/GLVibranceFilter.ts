import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl";
import VibranceFragmentShader from "../shaders/VibranceFragmentShader.glsl";

const { float } = SchemaTypes;

export default class GLVibranceFilter extends GLFilter {
  name = "vibrance";
  protected vertexShader = VertexShader;
  protected fragmentShader = VibranceFragmentShader;
  protected uniformsConfig = {
    vibrance: { type: float, default: 0 },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
