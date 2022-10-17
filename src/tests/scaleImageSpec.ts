import path from 'path';
import fs from 'fs';
import scaleAndSaveImage from '../utils/scaleImage';

describe('Testing image scaling using sharp', () => {
  it('Scales and save image correctly without failures', async () => {
    const height = 250;
    const width = 250;
    // Get original image path
    const originalImagePath: string = path.join(
      __dirname,
      '../../assets/images/pickachu.jpg'
    );
    const resultImagePath: string = path.join(
      __dirname,
      '../../assets/images/pickachu_h_250_w_250.jpg'
    );
    expect(async () => {
      await scaleAndSaveImage(
        originalImagePath,
        resultImagePath,
        height,
        width
      );
      // Get check if new image has been created
      const isImageCreated: boolean = fs.existsSync(resultImagePath);
      expect(isImageCreated).toEqual(true);
    }).not.toThrow;
  });
});
