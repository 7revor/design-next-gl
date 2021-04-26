import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import SharpenVertexShader from "../shaders/SharpenVertexShader.glsl";
import SharpenFragmentShader from "../shaders/SharpenFragmentShader.glsl";

const { float } = SchemaTypes;

export default class GLSharpenFilter extends GLFilter {
  name = "sharpen";
  protected vertexShader = SharpenVertexShader;
  protected fragmentShader = SharpenFragmentShader;
  protected uniformsConfig = {
    sharpen: { type: float, default: 0 },
    imageWidthFactor: { type: float, default: 0 },
    imageHeightFactor: { type: float, default: 0 },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
