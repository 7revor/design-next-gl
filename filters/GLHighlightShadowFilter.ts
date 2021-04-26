import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "@/core/gl/shaders/vertexShader.glsl";
import HighlightShadowFragmentShader from "@/core/gl/shaders/HighlightShadowFragmentShader.glsl";

const { float } = SchemaTypes;

export default class GLHighlightShadowFilter extends GLFilter {
  name = "highlightshadow";
  protected vertexShader = VertexShader;
  protected fragmentShader = HighlightShadowFragmentShader;
  protected uniformsConfig = {
    highlights: { type: float, default: 1 },
    shadows: { type: float, default: 0 },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
