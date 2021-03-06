import GLFilter from "../GLFilter";
import { SchemaTypes, Beam } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl?raw";
import PixellateFragmentShader from "../shaders/PixellateFragmentShader.glsl?raw";

const { float } = SchemaTypes;

export default class GLPixellateFilter extends GLFilter {
  name = "pixellate";
  protected vertexShader = VertexShader;
  protected fragmentShader = PixellateFragmentShader;
  protected uniformsConfig = {
    pixellate: { type: float, default: 0 },
        aspectRatio: { type: float, default: 1 },
  };

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
