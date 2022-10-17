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
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require(".."));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const request = (0, supertest_1.default)(__1.default);
describe('Testing getImage API', () => {
    it('fetches original image without scaling', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/getImage?fileName=pikachu').expect(200);
        const isFileSaved = fs_1.default.existsSync(path_1.default.join(__dirname, '../../assets/images/pikachu.jpg'));
        expect(isFileSaved).toEqual(true);
    }));
    it('fetches original image with scaling height only', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/getImage?fileName=pikachu&height=200').expect(200);
        // Get check if new image has been created
        const isFileSaved = fs_1.default.existsSync(path_1.default.join(__dirname, '../../assets/images/pikachu_h_200.jpg'));
        expect(isFileSaved).toEqual(true);
    }));
    it('fetches original image with scaling width only', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/getImage?fileName=pikachu&width=200').expect(200);
        const isFileSaved = fs_1.default.existsSync(path_1.default.join(__dirname, '../../assets/images/pikachu_w_200.jpg'));
        expect(isFileSaved).toEqual(true);
    }));
    it('fetches original image with scaling height and width', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get('/api/getImage?fileName=pikachu&height=200&width=200')
            .expect(200);
        const isFileSaved = fs_1.default.existsSync(path_1.default.join(__dirname, '../../assets/images/pikachu_h_200_w_200.jpg'));
        expect(isFileSaved).toEqual(true);
    }));
});
