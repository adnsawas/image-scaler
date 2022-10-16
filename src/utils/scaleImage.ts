import sharp from "sharp";

const scaleAndSaveImage = async function (imagePath: string, imageSavePath: string, height: number, width: number): Promise<void> {
    // Scale the image
    const scaledSharpImage: sharp.Sharp = sharp(imagePath).resize(
        isNaN(width) ? undefined : width,
        isNaN(height) ? undefined : height,
        { fit: sharp.fit.fill }
    );
    // Save image to a new file
    await scaledSharpImage.toFile(imageSavePath);
};

export default scaleAndSaveImage;