import Model from "../models/model.js";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    const existingModel = await Model.findOne({ name });
    if (existingModel) {
      return res.json({ error: "Already exists" });
    }

    const model = await new Model({ name, slug: slugify(name) });
    model.save();
    res.json(model);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { modelId } = req.params;
    const model = await Model.findByIdAndUpdate(
      modelId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.json(model);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const removed = await Model.findByIdAndDelete(req.params.modelId);
    res.json(removed);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Model.find({});
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const read = async (req, res) => {
  try {
    const model = await Model.findOne({ slug: req.params.slug });
    res.json(model);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
