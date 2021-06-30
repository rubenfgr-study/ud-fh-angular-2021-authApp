const { request, response, NextFunction } = require("express");
const { validationResult } = require("express-validator");


const validateFields = (req = request, res = response, next = NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        msg: errors.mapped()
      });
    }

    next();
}

module.exports = {
    validateFields
}