const { response } = require("express");
const { findById, update } = require("../models/ItemModel");
const ItemModel = require("../models/ItemModel");
const { all } = require("../routes/item.router");

module.exports = {
  getItems: async (request, response) => {
    try {
      const items = await ItemModel.find({});
      response.status(200).json(items);
    } catch (error) {
      next(error);
    }
  },
  getSingleItem: async (request, response) => {
    const { id } = request.params;
    const item = await ItemModel.findById(id);
    if (item.title) {
      response.status(200).json(item);
    } else {
      response.status(400).json({ message: "Item not found" });
    }
  },
  addItem: async (request, response) => {
    const { title, description, category, price, date } = request.body;
    const newItem = new ItemModel({
      title,
      description,
      category,
      price,
      date,
    });
    const saved = await newItem.save();
    if (saved.title) {
      return response.status(201).json(saved);
    } else {
      return response.status(400).json({ message: "Item not created" });
    }
  },
  updateItem: async(request, response) => {
    const { id } = request.params;
    await ItemModel.findByIdAndUpdate({_id: id},request.body);
    const updatedItem = await ItemModel.findById(id);
    response.status(200).json(updatedItem);
  },
  removeItem: async (request, response) => {
    const {id} = request.params;
    await ItemModel.findByIdAndDelete({_id: id});
    const allItems = await ItemModel.find({});
    response.status(200).json({success: true});
  }
};
