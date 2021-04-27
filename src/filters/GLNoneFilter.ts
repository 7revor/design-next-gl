import GLFilter from "../GLFilter";
import { Beam } from "@7revor/beam-gl";
import VertexShader from "../shaders/vertexShader.glsl?raw";
import FragmentShader from "../shaders/FragmentShader.glsl?raw";

export default class GLNoneFilter extends GLFilter {
  name = "none";
  protected vertexShader = VertexShader;
  protected fragmentShader = FragmentShader;
  protected uniformsConfig = {};

  constructor(source: Beam | HTMLCanvasElement) {
    super(source);
    this.shader = this.initShader();
  }
}
