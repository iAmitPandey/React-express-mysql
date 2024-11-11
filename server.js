import express from "express";
import cors from "cors";
import tutorialRoutes from "./app/routes/tutorial.routes.js";

const app = express();

let corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Enigmatic application." });
});

tutorialRoutes(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
