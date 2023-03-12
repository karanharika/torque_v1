import Make from "../models/make.js";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    const existingMake = await Make.findOne({ name });
    if (existingMake) {
      return res.json({ error: "Already exists" });
    }

    const make = await new Make({ name, slug: slugify(name) });
    make.save();
    res.json(make);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { makeId } = req.params;
    const make = await Make.findByIdAndUpdate(
      makeId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.json(make);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const removed = await Make.findByIdAndDelete(req.params.makeId);
    res.json(removed);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Make.find({});
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const read = async (req, res) => {
  try {
    const make = await Make.findOne({ slug: req.params.slug });
    res.json(make);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
