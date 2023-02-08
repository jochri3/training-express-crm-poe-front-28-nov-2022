const express = require("express");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}!!!!`);
});
