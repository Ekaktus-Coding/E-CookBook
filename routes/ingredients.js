const express = require("express");
const router = express.Router();
const ingredientDao = require("../dao/ingredientDao");

// CREATE
router.post("/", (req, res) => {
  const ingredient = ingredientDao.create(req.body);
  res.status(201).json(ingredient);
});

// GET by ID
router.get("/:id", (req, res) => {
  const ingredient = ingredientDao.get({ id: req.params.id });
  if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });
  res.json(ingredient);
});

// LIST
router.get("/", (req, res) => {
  const result = ingredientDao.list();
  res.json(result);
});

// UPDATE
router.put("/:id", (req, res) => {
  const ingredient = ingredientDao.update({ id: req.params.id, ...req.body });
  if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });
  res.json(ingredient);
});

// DELETE
router.delete("/:id", (req, res) => {
  const deleted = ingredientDao.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Ingredient not found" });
  res.json({ message: "Ingredient deleted", ingredient: deleted });
});

module.exports = router;