/**
 * @description 获取缩放比例
 */
export const getRatio = (input: number, base: number) => input / base

/**
 * @description 根据比例缩放
 */
export const scaleByRatio = (input: number, ratio: number) => input * ratio
