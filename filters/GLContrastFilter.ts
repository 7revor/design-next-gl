import GLFilter from "../GLFilter";
import { Beam, SchemaTypes } from "@7revor/beam-gl";
import VertexShader from "@/core/gl/shaders/vertexShader.glsl";
import ContrastFragmentShader from "@/core/gl/shaders/ContrastFragmentShader.glsl";

export default class GLContrastFilter extends GLFilter {
  name = "contrast";
  protected vertexShader = VertexShader;
  protected fragmentShader = ContrastFragmentShader;
  protected uniformsConfig = {
    contrast: { type: SchemaTypes.float, default: 0 },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
