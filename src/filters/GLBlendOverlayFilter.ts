import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl?raw";
import BlendOverlayFragmentShader from "../shaders/BlendOverlayFragmentShader.glsl?raw";

const { vec4 } = SchemaTypes;

export default class GLBlendOverlayFilter extends GLFilter {
  name = "blendOverlay";
  protected vertexShader = VertexShader;
  protected fragmentShader = BlendOverlayFragmentShader;
  protected uniformsConfig = {
    color: { type: vec4, default: [0, 0, 0, 0] },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
