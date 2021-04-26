import { Beam, Offscreen2DCommand, OffscreenTargetResource, TexturesResource, ResourceTypes } from "@7revor/beam-gl";
import GLFilter from "./GLFilter";

const { OffscreenTarget, Textures } = ResourceTypes;
/**
 * 滤镜链
 */
export default class GLFilterChain {
  // 滤镜链
  filters: GLFilter[] = [];
  // beam实例
  beam: Beam;
  // 离屏缓冲对象
  private offscreenTargets: OffscreenTargetResource[] = [];
  // 输出纹理
  private outputTextureses: TexturesResource[] = [];
  // 输入纹理
  private inputTextures?: TexturesResource;
  // 构造函数
  constructor(resource: HTMLCanvasElement | Beam) {
    if (resource instanceof Beam) {
      this.beam = resource;
    } else {
      this.beam = new Beam(resource, { contextAttributes: { premultipliedAlpha: false } });
    }
    this.beam.define(Offscreen2DCommand);
  }
  // 添加滤镜
  addFilter(filter: GLFilter) {
    this.filters.push(filter);
  }
  /**
   * 设置纹理
   * @param image 纹理对象
   */
  setTextures(image: HTMLImageElement) {
    if (!this.inputTextures) {
      const { Textures } = ResourceTypes;
      this.inputTextures = this.beam.resource(Textures);
    }
    this.inputTextures.set("img", { image, flip: true });
  }
  /**
   * 设置全局变量
   * @param key
   * @param val
   */
  setUniforms(key: string, val: number | number[]) {
    this.filters.forEach((filter) => filter.setUniforms(key, val));
  }
  /**
   * 初始化离屏资源
   */
  private initOffscreenResource() {
    this.destoryOffscreenResource();
    for (let i = 1; i < this.filters.length; i++) {
      const offscreenTarget = this.beam.resource(OffscreenTarget); // 离屏对象
      const outputTextures = this.beam.resource(Textures); // 中间环节所用的纹理资源
      outputTextures.set("img", offscreenTarget);
      this.offscreenTargets.push(offscreenTarget);
      this.outputTextureses.push(outputTextures);
    }
  }
  /**
   * 执行渲染
   * @param cache 是否复用离屏缓冲层
   */
  render(cache = false) {
    this.beam.clear();
    /**
     * 单个滤镜，直接渲染上屏
     */
    if (this.filters.length === 1) {
      const filter = this.filters[0];
      filter.render(this.inputTextures);
      /**
       * 多个滤镜，使用离屏缓冲
       */
    } else {
      if (!cache) this.initOffscreenResource();
      for (let i = 0; i < this.filters.length - 1; i++) {
        const filter = this.filters[i];
        this.beam.offscreen2D(this.offscreenTargets[i], () => {
          if (i === 0) {
            filter.render(this.inputTextures); // 首个渲染采用原始纹理
          } else {
            filter.render(this.outputTextureses[i - 1]); // 中间层使用outputTextureses
          }
        });
      }
      const lastFilter = this.filters[this.filters.length - 1];
      lastFilter.render(this.outputTextureses[this.filters.length - 2]); // 最后一轮渲染直接上屏
    }
  }
  /**
   * 销毁离屏缓冲
   */
  private destoryOffscreenResource() {
    this.outputTextureses.forEach((outputTextures) => {
      Object.keys(outputTextures.textures).forEach((key) => outputTextures.destroy(key));
    });
    this.offscreenTargets.forEach((offscreenTarget) => {
      const { fbo, rbo, colorTexture, depthTexture } = offscreenTarget;
      this.beam.gl.deleteFramebuffer(fbo);
      this.beam.gl.deleteRenderbuffer(rbo);
      this.beam.gl.deleteTexture(colorTexture);
      this.beam.gl.deleteTexture(depthTexture);
    });
    this.outputTextureses.length = 0;
    this.offscreenTargets.length = 0;
  }
  /**
   * 销毁滤镜链
   */
  destory() {
    this.destoryOffscreenResource();
    this.filters.forEach((filter) => filter.destory());
    if (this.inputTextures) {
      for (let key of Object.keys(this.inputTextures.textures)) {
        this.inputTextures.destroy(key);
      }
    }
  }
}
