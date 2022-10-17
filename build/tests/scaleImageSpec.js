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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const scaleImage_1 = __importDefault(require("../utils/scaleImage"));
describe('Testing image scaling using sharp', () => {
    it('Scales and save image correctly without failures', () => __awaiter(void 0, void 0, void 0, function* () {
        const height = 250;
        const width = 250;
        // Get original image path
        const originalImagePath = path_1.default.join(__dirname, '../../assets/images/pickachu.jpg');
        const resultImagePath = path_1.default.join(__dirname, '../../assets/images/pickachu_h_250_w_250.jpg');
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, scaleImage_1.default)(originalImagePath, resultImagePath, height, width);
            // Get check if new image has been created
            const isImageCreated = fs_1.default.existsSync(resultImagePath);
            expect(isImageCreated).toEqual(true);
        })).not.toThrow;
    }));
});
