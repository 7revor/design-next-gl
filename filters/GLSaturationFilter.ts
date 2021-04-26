import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "@/core/gl/shaders/vertexShader.glsl";
import SaturationFragmentShader from "@/core/gl/shaders/SaturationFragmentShader.glsl";

const { float } = SchemaTypes;

export default class GLSaturationFilter extends GLFilter {
  name = "saturation";
  protected vertexShader = VertexShader;
  protected fragmentShader = SaturationFragmentShader;
  protected uniformsConfig = {
    saturation: { type: float, default: 0 },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
