const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const FILE = path.join(__dirname, "../data/ingredients.json");

function readData() {
  const raw = fs.readFileSync(FILE, "utf-8");
  return raw ? JSON.parse(raw) : [];
}

function writeData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function create(uuObject) {
  const data = readData();
  const newItem = { id: uuidv4(), ...uuObject };
  data.push(newItem);
  writeData(data);
  return newItem;
}

function get(filter) {
  const data = readData();
  return data.find((item) => item.id === filter.id) || null;
}

function list(query = {}) {
  const data = readData();
  const filtered = query.recipeId
    ? data.filter((item) => item.recipeId === query.recipeId)
    : data;
  const pageInfo = query.pageInfo || {};
  const pageIndex = pageInfo.pageIndex || 0;
  const pageSize = pageInfo.pageSize || 10;
  const start = pageIndex * pageSize;
  const itemList = filtered.slice(start, start + pageSize);
  return { itemList, pageInfo: { pageIndex, pageSize, total: filtered.length } };
}

function update(uuObject) {
  const data = readData();
  const index = data.findIndex((item) => item.id === uuObject.id);
  if (index === -1) return null;
  data[index] = { ...data[index], ...uuObject };
  writeData(data);
  return data[index];
}

function remove(id) {
  const data = readData();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const deleted = data.splice(index, 1);
  writeData(data);
  return deleted[0];
}

function removeByRecipeId(recipeId) {
  const data = readData();
  const remaining = data.filter((item) => item.recipeId !== recipeId);
  const removed = data.filter((item) => item.recipeId === recipeId);
  if (removed.length === 0) return [];
  writeData(remaining);
  return removed;
}

module.exports = { create, get, list, update, remove, removeByRecipeId };