"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getImage_1 = __importDefault(require("./api/getImage"));
const routes = (0, express_1.Router)();
routes.use('/api', getImage_1.default);
routes.get('*', (req, res) => {
    res.status(404);
    res.send('<h1>Page is not found</h1>');
});
exports.default = routes;
