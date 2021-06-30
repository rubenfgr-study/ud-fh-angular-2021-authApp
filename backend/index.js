const express = require("express");
const cors = require("cors");
const dbConnection = require("./db/db.config");
const path = require("path");
require("dotenv").config();

const port = Number.parseInt(process.env.PORT, 10);

const app = express();

dbConnection();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/auth", require("./routes/auth.route"));

// Manejar otras rutas
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
