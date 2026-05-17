const express = require("express");
const app = express();

const recipeRoutes = require("./routes/recipes");
const ingredientRoutes = require("./routes/ingredients");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(express.json());

app.use("/recipes", recipeRoutes);
app.use("/ingredients", ingredientRoutes);

app.get("/", (req, res) => {
  res.json({ message: "E-CookBook API is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});