"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = (req, res, next) => {
    // Get fileName from request's  query
    const { fileName } = req.query;
    // Reject the request if there is no query parameter names: fileName
    if (!fileName) {
        return res.status(404).send('No file name');
    }
    // Go to next middleware if any is available
    next();
};
exports.validation = validation;
