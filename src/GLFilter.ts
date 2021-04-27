import {
  Beam,
  Shader,
  TexturesResource,
  UniformsResource,
  ResourceTypes,
  Resource,
  SchemaTypes,
  VertexBuffersResource,
  IndexBufferResource,
} from "@7revor/beam-gl";

export interface BufferConfig {
  vertex: {
    position: number[];
    reverseTexCoord?: number[];
    texCoord?: number[];
  };
  index: { array: number[] };
}

export interface UniformsConfig {
  [key: string]: {
    type: SchemaTypes;
    default: number | number[];
  };
}

const { vec2, vec4, tex2D, int } = SchemaTypes;
const { VertexBuffers, IndexBuffer } = ResourceTypes;
/**
 * 基础滤镜虚类
 */
export default abstract class GLFilter {
  // 滤镜名称
  abstract name: string;
  // 顶点着色器
  protected abstract vertexShader: string;
  // 片段着色器
  protected abstract fragmentShader: string;
  // 全局变量配置
  protected abstract uniformsConfig: UniformsConfig;
  // beam实例
  protected beam: Beam;
  // 着色器
  protected shader!: Shader;
  // 顶点
  protected vertexBuffer: VertexBuffersResource;
  // 缓冲索引
  protected indexBuffer: IndexBufferResource;
  // 纹理
  protected textures?: TexturesResource;
  // 全局变量
  protected uniforms?: UniformsResource;
  // 2D Buffer Resource
  protected bufferResource: BufferConfig = {
    index: { array: [0, 1, 2, 2, 3, 0] }, // indexArrayBuffer
    vertex: {
      position: [-1, -1, 1, -1, 1, 1, -1, 1], // 定点坐标（GL坐标系）
      texCoord: [0, 0, 1, 0, 1, 1, 0, 1], // 纹理坐标（纹理坐标系）
      reverseTexCoord: [0, 1, 1, 1, 1, 0, 0, 0], // 反转纹理坐标（读取像素时需反转纹理坐标系）
    },
  };
  // common shader  Param
  protected common2DShaderParam = {
    buffers: {
      position: { type: vec4, n: 2 }, // gl坐标
      texCoord: { type: vec2 }, // 纹理坐标
      reverseTexCoord: { type: vec2 }, // 反转纹理坐标
    },
    textures: {
      img: { type: tex2D },
    },
    uniforms: {
      reverse: { type: int, default: 1 },
    },
  };

  // 构造函数
  constructor(source: HTMLCanvasElement | Beam) {
    this.beam = source instanceof Beam ? source : new Beam(source);
    this.vertexBuffer = this.beam.resource(VertexBuffers, this.bufferResource.vertex);
    this.indexBuffer = this.beam.resource(IndexBuffer, this.bufferResource.index);
  }

  // 初始化着色器
  protected initShader(): Shader {
    const shaderSource = {
      ...this.common2DShaderParam,
      vs: this.vertexShader,
      fs: this.fragmentShader,
      uniforms: {
        ...this.common2DShaderParam.uniforms,
        ...this.uniformsConfig,
      },
    };
    return this.beam.shader(shaderSource);
  }

  /**
   * 设置纹理
   */
  setTextures(image: HTMLImageElement) {
    if (!this.textures) {
      const { Textures } = ResourceTypes;
      this.textures = this.beam.resource(Textures);
    }
    this.textures.set("img", { image, flip: true });
  }

  /**
   * 设置全局变量
   */
  setUniforms(key: string, value: number | number[]) {
    if (!this.uniforms) {
      const { Uniforms } = ResourceTypes;
      this.uniforms = this.beam.resource(Uniforms);
    }
    this.uniforms.set(key, value);
  }

  /**
   * 渲染函数
   * 默认使用自身texture渲染
   * 链式渲染时，外部传入textures参数
   * @param textures 纹理
   */
  render(textures = this.textures) {
    // eslint-disable-next-line
    const resources: Resource<any, {}>[] = [this.vertexBuffer, this.indexBuffer];
    if (textures) resources.push(textures);
    if (this.uniforms) resources.push(this.uniforms);
    if (textures === this.textures) this.beam.clear(); // 自身texture渲染时清空画布
    this.beam.draw(this.shader, ...resources);
  }

  /**
   * 销毁
   */
  destory() {
    Object.keys(this.vertexBuffer.buffers).forEach((key) => this.vertexBuffer.destroy(key));
    this.indexBuffer.destroy();
    if (this.textures) {
      for (let key of Object.keys(this.textures.textures)) {
        this.textures.destroy(key);
      }
    }
    this.beam.gl.deleteProgram(this.shader.shaderRefs.program);
  }
}
