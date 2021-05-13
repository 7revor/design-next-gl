import GLFilterChain from "./GLFilterChain";
import GLNoneFilter from "./filters/GLNoneFilter";
import GLBrightnessFilter from "./filters/GLBrightnessFilter";
import GLContrastFilter from "./filters/GLContrastFilter";
import GLExposureFilter from "./filters/GLExposureFilter";
import GLGammaFilter from "./filters/GLGammaFilter";
import GLHighlightShadowFilter from "./filters/GLHighlightShadowFilter";
import GLHueFilter from "./filters/GLHueFilter";
import GLPixellateFilter from "./filters/GLPixellateFilter";
import GLSaturationFilter from "./filters/GLSaturationFilter";
import GLSharpenFilter from "./filters/GLSharpenFilter";
import GLVibranceFilter from "./filters/GLVibranceFilter";
import GLVignetteFilter from "./filters/GLVignetteFilter";
import GLWhiteBalanceFilter from "./filters/GLWhiteBalanceFilter";
import { Beam } from "@7revor/beam-gl";
import GLBlendSoftLightFilter from "./filters/GLBlendSoftLightFilter";
import GLBlendScreenFilter from "./filters/GLBlendScreenFilter";
import GLBlendMultiplyFilter from "./filters/GLBlendMultiplyFilter";
import GLBlendColorBurnFilter from "./filters/GLBlendColorBurnFilter";
import GLBlendLinearBurnFilter from "./filters/GLBlendLinearBurnFilter";
import GLBlendColorDodgeFilter from "./filters/GLBlendColorDodgeFilter";
import GLBlendLinearDodgeFilter from "./filters/GLBlendLinearDodgeFilter";
import GLBlendOverlayFilter from "./filters/GLBlendOverlayFilter";

export interface FilterParam {
  value: number | number[];
  min?: number | number[];
  max?: number | number[];
  step?: number | number[];
}

export interface Filter {
  name: string;
  title?: string;
  param?: { [key: string]: FilterParam };
}
/**
 * 当前使用的滤镜链
 */
interface CurrentChain {
  resource: HTMLImageElement;
  filters: Filter[];
  chain: GLFilterChain;
}

const getFilter = (name: string, beam: Beam) => {
  switch (name) {
    case "none":
      return new GLNoneFilter(beam);
    case "brightness":
      return new GLBrightnessFilter(beam);
    case "exposure":
      return new GLExposureFilter(beam);
    case "contrast":
      return new GLContrastFilter(beam);
    case "saturation":
      return new GLSaturationFilter(beam);
    case "whitebalance":
      return new GLWhiteBalanceFilter(beam);
    case "hue":
      return new GLHueFilter(beam);
    case "gamma":
      return new GLGammaFilter(beam);
    case "highlightshadow":
      return new GLHighlightShadowFilter(beam);
    case "sharpen":
      return new GLSharpenFilter(beam);
    case "vibrance":
      return new GLVibranceFilter(beam);
    case "pixellate":
      return new GLPixellateFilter(beam);
    case "vignette":
      return new GLVignetteFilter(beam);
    case "blendSoftLight":
      return new GLBlendSoftLightFilter(beam);
    case "blendScreen":
      return new GLBlendScreenFilter(beam);
    case "blendMultiply":
      return new GLBlendMultiplyFilter(beam);
    case "blendColorBurn":
      return new GLBlendColorBurnFilter(beam);
    case "blendLinearBurn":
      return new GLBlendLinearBurnFilter(beam);
    case "blendColorDodge":
      return new GLBlendColorDodgeFilter(beam);
    case "blendLinearDodge":
      return new GLBlendLinearDodgeFilter(beam);
    case "blendOverlay":
      return new GLBlendOverlayFilter(beam);
    default:
      return null;
  }
};

let currentChain: CurrentChain | null = null;

/**
 * 销毁当前滤镜链
 */
export const GLClear = () => {
  currentChain?.chain.destory();
  currentChain = null;
};
/**
 * 初始化滤镜链
 * @param resource 输入纹理
 * @param filters 滤镜参数
 * @param canvas 目标画布
 * @returns
 */
const initChain = (resource: HTMLImageElement, filters: Filter[], canvas: HTMLCanvasElement): GLFilterChain => {
  GLClear();
  const chain = new GLFilterChain(canvas);
  for (let filter of filters) {
    const glFilter = getFilter(filter.name, chain.beam);
    if (!glFilter) throw new Error("GLFilter " + filter.name + " not mapped!");
    if (filter.param) {
      for (let key of Object.keys(filter.param)) {
        filter.param && glFilter.setUniforms(key, filter.param[key].value);
      }
    }
    chain.addFilter(glFilter);
  }
  currentChain = { resource, filters, chain };
  return chain;
};
/**
 * 执行渲染
 * @param resource 输入纹理
 * @param filters 滤镜参数
 * @param canvas 目标画布
 * @param reverse 是否翻转图像
 */
export const GLRender = (
  resource: HTMLImageElement,
  filters: Filter[],
  canvas: HTMLCanvasElement,
  reverse = 0
): void => {
  if (!filters.length) filters = [{ name: "none" }]; // 无滤镜直接渲染
  const { width, height } = resource;
  const w = Math.ceil(width);
  const h = Math.ceil(height);
  canvas.width = w;
  canvas.height = h;
  let chain: GLFilterChain;
  if (
    currentChain &&
    currentChain.resource === resource && // 目标纹理相同
    currentChain.chain.filters.length === filters.length && // 目标滤镜长度相同
    currentChain.chain.filters.every((filter, index) => filter.name === filters[index].name) // 目标滤镜顺序相同
  ) {
    // 复用当前chain
    chain = currentChain.chain;
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      const renderer = chain.filters[i];
      if (filter.param) {
        for (let key of Object.keys(filter.param)) {
          renderer.setUniforms(key, filter.param[key].value);
        }
      }
    }
    chain.render(true);
  } else {
    chain = initChain(resource, filters, canvas);
    chain.setUniforms("reverse", reverse);
    chain.setTextures(resource);
    chain.render(false);
  }
};
/**
 * 获取渲染后的图片imageData
 * @param resource 输入纹理
 * @param filters 滤镜参数
 * @param canvas 目标画布
 * @returns 图片像素数据
 */
export const GLGetImageData = (resource: HTMLImageElement, filters: Filter[], canvas: HTMLCanvasElement) => {
  GLRender(resource, filters, canvas, 1);
  const gl = currentChain?.chain?.beam.gl as WebGLRenderingContext;
  const buffer = new Uint8ClampedArray(resource.width * resource.height * 4);
  gl.readPixels(0, 0, resource.width, resource.height, gl.RGBA, gl.UNSIGNED_BYTE, buffer);
  return new ImageData(buffer, resource.width, resource.height);
};
