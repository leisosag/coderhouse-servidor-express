const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 8080;
const data = fs.readFileSync("./productos.txt", "utf-8");
const dataParsed = JSON.parse(data);

app.listen(PORT, () =>
	console.log(`Servidor corriendo en http://localhost:${PORT}`)
);

app.get("/", (req, res) => {
	res.send("Home");
});

app.get("/productos", (req, res) => {
	res.send(dataParsed);
});

app.get("/productoRandom", (req, res) => {
	const idRandom = Math.floor(Math.random() * (dataParsed.length + 1 - 1) + 1);
	const found = dataParsed.filter((obj) => obj.id === idRandom);
	res.send(`${JSON.stringify(found)}`);
});

app.on("error", (err) => console.log(`Fallo la conexion: ${err}`));
