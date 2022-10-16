import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { validation } from "../../middleware/validation";
import scaleAndSaveImage from "../../utils/scaleImage";

const getImageRoute = Router();

getImageRoute.get('/getImage', validation, async (req: Request, res: Response) => {
    // Get [fileName]
    // We are sure that THERE IS a fileName because
    // the validation middleware took care of it
    const fileName = String(req.query.fileName);

    // Check if the required image does not exists
    let originalImagePath: string = path.join(
        __dirname,
        '../../../assets/images',
        `${fileName}.jpg`
    );
    if (!fs.existsSync(originalImagePath)) {
        // If the origianl image does not exist, we return 404 error
        return res.status(404).send('Image not found');
    }

    // Since the image exists, 
    // check height and width and
    // check if image has been scaled before with given constraints
    const { height, width } = req.query;
    let fileNameSuffix: string = '';
    let shouldScaleImage: boolean = false;

    if (height) {
        fileNameSuffix = fileNameSuffix.concat(`_h_${height}`);
        shouldScaleImage = true
    }
    if (width) {
        fileNameSuffix = fileNameSuffix.concat(`_w_${width}`);
        shouldScaleImage = true
    }
    // Get scaled image path
    var imagePath = path.join(
        __dirname,
        '../../../assets/images',
        `${fileName?.concat(fileNameSuffix)}.jpg`
    );

    // we have created the path of scaled image
    // if it already exists, it is immediately returned
    console.log(imagePath);
    if (fs.existsSync(imagePath)) {
        return res.sendFile(imagePath);
    }

    // If we have to scale, and scaled image does not already exists
    // then scale it and then return it
    if (shouldScaleImage) {
        console.log('======\nscaling the image\n======');
        await scaleAndSaveImage(originalImagePath, imagePath, Number(height), Number(width));
        // Send the scaled image to client
        return res.sendFile(imagePath);
    }
    else {
        // if there is no need to scale, respond with the original image
        return res.sendFile(originalImagePath);
    }
});

export default getImageRoute;