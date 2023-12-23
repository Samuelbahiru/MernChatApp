import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import axios from "axios";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);

app.post("/authenticate", async (req, res) => {
  console.log("req.body", req.body);
  const { username } = req.body;
  console.log("username", username);
  try {
    const result = await axios.put(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: username,
        first_name: username,
      },
      {
        headers: {
          "private-key": "cb7ce992-aa44-4717-a79e-2acf26ffe7de",
        },
      }
    );
    console.log("data", result.data);
    return res.status(200).json(result.data);
  } catch (err) {
    console.error("error on accessing the chat api", err);
  }

  return res.json({ username: username, secret: "sha256..." });
});

app.listen(PORT, () => {
  console.log("the server started runing");
});
