import { Skia } from '@shopify/react-native-skia'

export const GRAY_SHADER = Skia.RuntimeEffect.Make(`
uniform shader image;

vec3 greyscale(vec3 color, float str) {
  float g = dot(color, vec3(0.299, 0.587, 0.114));
  return mix(color, vec3(g), str) * vec3(1.2, 0, 0);
}

half4 main(float2 xy) {   
  vec4 p = image.eval(xy).rgba;
  vec3 grey = greyscale(vec3(p.r, p.g, p.b), 1.0);
  return vec4(grey, 1);
}
`)!
