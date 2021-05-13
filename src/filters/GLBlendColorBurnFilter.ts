import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl?raw";
import BlendColorBurnFragmentShader from "../shaders/BlendColorBurnFragmentShader.glsl?raw";

const { vec4 } = SchemaTypes;

export default class GLBlendColorBurnFilter extends GLFilter {
  name = "blendColorBurn";
  protected vertexShader = VertexShader;
  protected fragmentShader = BlendColorBurnFragmentShader;
  protected uniformsConfig = {
    color: { type: vec4, default: [0, 0, 0, 0] },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
