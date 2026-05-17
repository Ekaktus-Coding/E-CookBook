const express = require("express");
const router = express.Router();
const recipeDao = require("../dao/recipeDao");
const ingredientDao = require("../dao/ingredientDao");

router.post("/", (req, res) => {
  const recipe = recipeDao.create(req.body);
  res.status(201).json(recipe);
});

router.get("/:id", (req, res) => {
  const recipe = recipeDao.get({ id: req.params.id });
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  res.json(recipe);
});

router.get("/", (req, res) => {
  const result = recipeDao.list();
  res.json(result);
});

router.get("/:id/ingredients", (req, res) => {
  const recipe = recipeDao.get({ id: req.params.id });
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  const result = ingredientDao.list({ recipeId: req.params.id });
  res.json(result);
});

router.post("/:id/ingredients", (req, res) => {
  const recipe = recipeDao.get({ id: req.params.id });
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  const ingredient = ingredientDao.create({ ...req.body, recipeId: req.params.id });
  res.status(201).json(ingredient);
});

router.put("/:id", (req, res) => {
  const recipe = recipeDao.update({ id: req.params.id, ...req.body });
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  res.json(recipe);
});

router.delete("/:id", (req, res) => {
  const deleted = recipeDao.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Recipe not found" });
  ingredientDao.removeByRecipeId(req.params.id);
  res.json({ message: "Recipe deleted", recipe: deleted });
});

module.exports = router;
