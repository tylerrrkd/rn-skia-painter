import React from 'react'
import CanvasTest, { Image, ImageData } from 'react-native-canvas'

export interface CNCHandlerRef {
  getGCode: (params: { base64: string; width: number; height: number }) => Promise<string>
  getImageData: (params: { base64: string; width: number; height: number }) => Promise<ImageData>
}

/**
 * @description cnc工厂
 */
const CNCHandler = React.forwardRef<CNCHandlerRef>((_, ref) => {
  const canvasRef = React.useRef<CanvasTest>(null)

  const getGCode: CNCHandlerRef['getGCode'] = async ({ base64, width, height }) => {
    try {
      const imageData = await getImageData({ base64, width, height })

      const pixelData = imageData.data
      const imageWidth = imageData.width

      const outputArray: string[] = []
      outputArray.push('M3 S0')
      outputArray.push('G90')
      outputArray.push('F3000')
      outputArray.push('M4 S0')

      for (let y = 0; y < imageData.height; y++) {
        // const rowIndex = y * imageWidth * 4
        if (y % 2 === 0) {
          // Even rows: Left to right
          for (let x = 0; x < imageWidth; x++) {
            //const pixelIndex = rowIndex + x * 4;
            const red = pixelData[y * imageData.width * 4 + x * 4]
            // console.log('单行：red---' + red + '---X---' + x + '---Y---' + y)
            if (red != 255) {
              outputArray.push('G1 X' + x + ' Y-' + y + ' S0')

              // console.log('S0')
              for (; x < imageWidth; x++) {
                const red = pixelData[y * imageData.width * 4 + x * 4]
                // console.log('A行：red---' + red + '---X---' + x + '---Y---' + y)
                if (red === 255) {
                  //白色
                  outputArray.push('G1 X' + x + ' Y-' + y + ' S1000')
                  // console.log('S1000')
                  break
                }
                if (x === imageWidth - 1) {
                  //单前行的最后一个像素
                  outputArray.push('G1 X' + x + ' Y-' + y + ' S1000')
                  // console.log('S1000')
                  break
                }
              }
            }
          }
        } else {
          // Odd rows: Right to left
          for (let x = imageWidth - 1; x >= 0; x--) {
            //const pixelIndex = rowIndex + x * 4;
            const red = pixelData[y * imageData.width * 4 + x * 4]
            // console.log('双行：red---' + red + '---X---' + x + '---Y---' + y)
            if (red != 255) {
              outputArray.push('G1 X' + x + ' Y-' + y + ' S0')
              for (; x >= 0; x--) {
                const red = pixelData[y * imageData.width * 4 + x * 4]
                // console.log('双行：red---' + red + '---X---' + x + '---Y---' + y)
                if (red === 255) {
                  //白色
                  outputArray.push('G1 X' + x + ' Y-' + y + ' S1000')
                  break
                }
                if (x === 0) {
                  // 双行从右到左，读到最左边的一个
                  outputArray.push('G1 X' + x + ' Y-' + y + ' S1000')
                  break
                }
              }
            }
          }
        }
      }
      // console.log('OutputArray:', outputArray);
      // 将数组内容转换为字符串
      const outputText = outputArray.join('\n')
      return outputText
    } catch (error) {
      throw error
    }
  }

  const getImageData = React.useCallback<CNCHandlerRef['getImageData']>(
    ({ base64, width, height }) =>
      new Promise<ImageData>((resolve, reject) => {
        const canvas = canvasRef?.current
        if (canvas) {
          const context = canvas?.getContext?.('2d')
          const image = new Image(canvas, width, height)
          image.src = `data:image/jpeg;base64,${base64}` // 替换为你的图像路径
          image.addEventListener('load', async () => {
            canvas.width = width
            canvas.height = height
            context.drawImage(image, 0, 0, width, height)
            const imageData = await context.getImageData(0, 0, canvas.width, canvas.height)

            const threshold = 128 // 阈值，亮度超过该值的像素设为白色，否则为黑色
            for (let i = 0; i < imageData.data.length; i += 4) {
              const r = imageData.data[i]!
              const g = imageData.data[i + 1]!
              const b = imageData.data[i + 2]!

              const brightness = (r + g + b) / 3

              if (brightness >= threshold) {
                imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = 255 // 设置为白色
              } else {
                imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = 0 // 设置为黑色
              }
            }

            context.putImageData(imageData, 0, 0)
            resolve(imageData)
          })
          image.addEventListener('error', reject)
        }
      }),
    [canvasRef.current]
  )

  React.useImperativeHandle(ref, () => ({
    getGCode,
    getImageData,
  }))

  return <CanvasTest ref={canvasRef} style={{ position: 'absolute', left: 0, top: 0 }} />
})

export default CNCHandler
