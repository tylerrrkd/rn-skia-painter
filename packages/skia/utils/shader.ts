import { Skia } from '@shopify/react-native-skia'

/**
 * @description 重要（texture转换vec3）
 * vec4 p = image.eval(xy).rgba;
 * vec3(p.r, p.g, p.b) 相当于 texture(iChannel0, uv).rgb
 */

export const BLACK_AND_WHITE_SHADER = Skia.RuntimeEffect.Make(`
uniform shader image;

vec4 main(vec2 xy)
{
    // Normalized pixel coordinates (from 0 to 1)
    vec4 texColor= image.eval(xy).rgba;
    
    // get gray scale or luminescence
    float gray = 0.33 * (texColor.r + texColor.g + texColor.b);
    
    // mix white and black by the value of step(threshold, gray)
    float threshold = 0.39;
    if(gray > threshold) {
      // white
      texColor.rgb = vec3(1.0);   
    } else {
      // black
      texColor.rgb = vec3(0.0);
    }
    
    // Output to screen
    return texColor;
}
`)!

export const GRAY_SHADER = Skia.RuntimeEffect.Make(`
uniform shader image;

half4 main(in vec2 xy)
{
  //Grabbing the texture color at the current pixel.
  vec4 texColor = image.eval(xy).rgba;
  
  vec3 gray_scale = vec3(dot(vec3(0.5, 0.5, 0.5), texColor.rgb));
      
  // Output to screen
  return vec4(gray_scale, texColor.a) ;
}
`)!
