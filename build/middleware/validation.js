"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = (req, res, next) => {
    // Get fileName, height and width from request's  query
    const { fileName, height, width } = req.query;
    // Reject the request if there is no query parameter names: fileName
    if (!fileName) {
        return res.status(404).send('No file name');
    }
    // Reject the request if height or width are invalid
    if (!isValidConstraint(String(height))) {
        return res.status(400).send('Height parameter is not valid');
    }
    if (!isValidConstraint(String(width))) {
        return res.status(400).send('Width parameter is not valid');
    }
    // Go to next middleware if any is available
    next();
};
exports.validation = validation;
function isValidConstraint(value) {
    if (value == 'undefined')
        return true;
    if (!Number.parseInt(value))
        return false;
    if (Number(value) < 1)
        return false;
    return true;
}
