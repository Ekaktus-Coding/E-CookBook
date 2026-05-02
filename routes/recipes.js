const express = require("express");
const router = express.Router();
const recipeDao = require("../dao/recipeDao");

// CREATE
router.post("/", (req, res) => {
  const recipe = recipeDao.create(req.body);
  res.status(201).json(recipe);
});

// GET by ID
router.get("/:id", (req, res) => {
  const recipe = recipeDao.get({ id: req.params.id });
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  res.json(recipe);
});

// LIST
router.get("/", (req, res) => {
  const result = recipeDao.list();
  res.json(result);
});

// UPDATE
router.put("/:id", (req, res) => {
  const recipe = recipeDao.update({ id: req.params.id, ...req.body });
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  res.json(recipe);
});

// DELETE
router.delete("/:id", (req, res) => {
  const deleted = recipeDao.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Recipe not found" });
  res.json({ message: "Recipe deleted", recipe: deleted });
});

module.exports = router;