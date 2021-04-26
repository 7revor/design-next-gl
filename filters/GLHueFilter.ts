import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl";
import HueFragmentShader from "../shaders/HueFragmentShader.glsl";

const { float } = SchemaTypes;

export default class GLHueFilter extends GLFilter {
  name = "hue";
  protected vertexShader = VertexShader;
  protected fragmentShader = HueFragmentShader;
  protected uniformsConfig = {
    hue: { type: float, default: 0 },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
