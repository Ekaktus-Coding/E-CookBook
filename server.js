const express = require("express");
const app = express();

const recipeRoutes = require("./routes/recipes");
const ingredientRoutes = require("./routes/ingredients");

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