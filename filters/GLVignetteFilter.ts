import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl";
import VignetteFragmentShader from "../shaders/VignetteFragmentShader.glsl";

const { float, vec3, vec2 } = SchemaTypes;

export default class GLVignetteFilter extends GLFilter {
  name = "vignette";
  protected vertexShader = VertexShader;
  protected fragmentShader = VignetteFragmentShader;
  protected uniformsConfig = {
    vignetteCenter: { type: vec2, default: [0.5, 0.5] },
    vignetteColor: { type: vec3, default: [0, 0, 0] },
    vignetteStart: { type: float, default: 0.5 },
    vignette: { type: float, default: 0 },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
