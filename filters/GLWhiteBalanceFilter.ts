import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "@/core/gl/shaders/vertexShader.glsl";
import WhiteBalanceFragmentShader from "@/core/gl/shaders/WhiteBalanceFragmentShader.glsl";

const { float } = SchemaTypes;

export default class GLWhiteBalanceFilter extends GLFilter {
  name = "whitebalance";
  protected vertexShader = VertexShader;
  protected fragmentShader = WhiteBalanceFragmentShader;
  protected uniformsConfig = {
    whitebalance: { type: float, default: 0 },
  };
  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
