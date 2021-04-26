import GLFilter from "../GLFilter";
import { Beam, SchemaTypes } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl";
import BrightnessFragmentShader from "../shaders/BrightnessFragmentShader.glsl";

export default class GLBrightnessFilter extends GLFilter {
  name = "brightness";
  protected vertexShader = VertexShader;
  protected fragmentShader = BrightnessFragmentShader;
  protected uniformsConfig = {
    brightness: { type: SchemaTypes.float, default: 0 }
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
