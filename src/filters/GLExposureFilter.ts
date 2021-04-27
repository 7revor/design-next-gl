import GLFilter from "../GLFilter";
import { Beam, SchemaTypes } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl?raw";
import ExposureFragmentShader from "../shaders/ExposureFragmentShader.glsl?raw";

export default class GLExposureFilter extends GLFilter {
  name = "exposure";
  protected vertexShader = VertexShader;
  protected fragmentShader = ExposureFragmentShader;
  protected uniformsConfig = {
    exposure: { type: SchemaTypes.float, default: 0 },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
  
}
