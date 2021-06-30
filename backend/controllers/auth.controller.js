const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT, verifyJWT } = require("../helpers/jwt.helper");

const createUser = async (req = request, res = response) => {
  const { name, email, password } = req.body;

  try {
    // Verify Email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        ok: false,
        msg: "El email ya existe",
      });
    }

    // Crear Usuario con el modelo
    const newUser = new User({ name, email, password });

    // Hash password
    newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync());

    // Generate JWT
    const { _id } = newUser;
    const token = await generateJWT(_id, name);

    // Crear usuario con el modelo
    await newUser.save();

    // Generate ok response
    return res.status(201).json({
      ok: true,
      msg: "Usuario creado con éxito",
      user: {
        uid: newUser._id,
        name,
        email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Contacte con el administrador",
      error,
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        ok: false,
        msg: "Credenciales incorrectas",
      });
    }

    // Confirmar si el password hace match
    const validPassword = bcrypt.compareSync(password, userExist.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Credenciales incorrectas",
      });
    }

    // Generar el JWT
    const token = await generateJWT(userExist._id, userExist.name);

    // Response
    return res.json({
      ok: true,
      msg: "Login exitoso",
      user: {
        uid: userExist._id,
        name: userExist.name,
        email: userExist.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Contacte con el administrador",
      error,
    });
  }
};

const renew = async (req = request, res = response) => {
  const { uid } = req;

  const dbUser = await User.findById(uid);
  const { name, email } = dbUser;

  const token = await generateJWT(uid, name);

  return res.json({
    ok: true,
    msg: "Renovación de token exitosa",
    user: {
      uid,
      name,
      email,
    },
    token,
  });
};

module.exports = { createUser, login, renew };
