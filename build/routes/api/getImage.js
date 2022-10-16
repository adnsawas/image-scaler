"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const validation_1 = require("../../middleware/validation");
const scaleImage_1 = __importDefault(require("../../utils/scaleImage"));
const getImageRoute = (0, express_1.Router)();
getImageRoute.get('/getImage', validation_1.validation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get [fileName]
    // We are sure that THERE IS a fileName because
    // the validation middleware took care of it
    const fileName = String(req.query.fileName);
    // Check if the required image does not exists
    let originalImagePath = path_1.default.join(__dirname, '../../../assets/images', `${fileName}.jpg`);
    if (!fs_1.default.existsSync(originalImagePath)) {
        // If the origianl image does not exist, we return 404 error
        return res.status(404).send('Image not found');
    }
    // Since the image exists, 
    // check height and width and
    // check if image has been scaled before with given constraints
    const { height, width } = req.query;
    let fileNameSuffix = '';
    let shouldScaleImage = false;
    if (height) {
        fileNameSuffix = fileNameSuffix.concat(`_h_${height}`);
        shouldScaleImage = true;
    }
    if (width) {
        fileNameSuffix = fileNameSuffix.concat(`_w_${width}`);
        shouldScaleImage = true;
    }
    // Get scaled image path
    var imagePath = path_1.default.join(__dirname, '../../../assets/images', `${fileName === null || fileName === void 0 ? void 0 : fileName.concat(fileNameSuffix)}.jpg`);
    // we have created the path of scaled image
    // if it already exists, it is immediately returned
    console.log(imagePath);
    if (fs_1.default.existsSync(imagePath)) {
        return res.sendFile(imagePath);
    }
    // If we have to scale, and scaled image does not already exists
    // then scale it and then return it
    if (shouldScaleImage) {
        console.log('======\nscaling the image\n======');
        yield (0, scaleImage_1.default)(originalImagePath, imagePath, Number(height), Number(width));
        // Send the scaled image to client
        return res.sendFile(imagePath);
    }
    else {
        // if there is no need to scale, respond with the original image
        return res.sendFile(originalImagePath);
    }
}));
exports.default = getImageRoute;
