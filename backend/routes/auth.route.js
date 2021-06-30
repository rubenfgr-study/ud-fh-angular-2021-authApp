const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login, renew } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");

const router = Router();

router.post("/new", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("password", "Password min length is 6").not().isEmpty().isLength({ min: 6 }),
    validateFields
],createUser);

router.post(
  "/login",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields
  ],
  login
);

router.get("/renew", [
  validateJWT
], renew);

module.exports = router;
