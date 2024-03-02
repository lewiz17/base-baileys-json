const { join } = require("path");
const { createReadStream } = require("fs");
const express = require("express");
const bodyParser = require("body-parser"); // Add body-parser for parsing request bodies
const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");

const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const adapterProvider = createProvider(BaileysProvider);

const app = express();
const port = process.env.PORT || 3000; // Set a default port (3000) or use the one from the environment variable

app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests

app.get("/", async (req, res) => {
  QRPortalWeb();
  res.send("Servidor iniciado");
});

app.post("/send-message", async (req, res) => {
  try {
    await handleSendMessageBot(req, res);
  } catch (error) {
    console.error("Error in send-message endpoint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/get-qr", async (req, res) => {
  try {
    await handleGetQR(req, res);
  } catch (error) {
    console.error("Error in get-qr endpoint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function handleSendMessageBot(req, res) {
  console.log("body", req?.body);
  await adapterProvider.sendText("573045405216@c.us", "Mensaje desde API");
  res.json({ data: "mensaje enviado!" });
}

async function handleGetQR(req, res) {
  const YOUR_PATH_QR = join(process.cwd(), `bot.qr.png`);
  const fileStream = createReadStream(YOUR_PATH_QR);
  res.setHeader("Content-Type", "image/png");
  fileStream.pipe(res);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
