import Part from "../models/part.js";
import fs from "fs";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      make,
      model,
      quantity,
      truckYear,
      partNumber,
    } = req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name.trim():
        return res.json({ error: "Name is required." });
      case !description.trim():
        return res.json({ error: "Description is required." });
      case !price.trim():
        return res.json({ error: "Price is required." });
      case !category.trim():
        return res.json({ error: "Category is required." });
      case !make.trim():
        return res.json({ error: "Make is required." });
      case !model.trim():
        return res.json({ error: "Model is required." });
      case !quantity.trim():
        return res.json({ error: "Quantity is required." });
      case !truckYear.trim():
        return res.json({ error: "Year is required." });
      case !partNumber.trim():
        return res.json({ error: "Part Number is required." });
    }

    // create part
    const part = new Part({ ...req.fields, slug: slugify(name) });
    if (photo) {
      part.photo.data = fs.readFileSync(photo.path);
      part.photo.contentType = photo.type;
    }

    await part.save();
    res.json(part);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const parts = await Part.find({})
      .populate(["category", "make", "model"])
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.json(parts);
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const part = await Part.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate(["category", "make", "model"]);
    res.json(part);
  } catch (err) {
    console.log(err);
  }
};

export const photo = async (req, res) => {
  try {
    const part = await Part.findById(req.params.partId).select("photo");
    if (part.photo.data) {
      res.set("Content-Type", part.photo.contentType);
      return res.send(part.photo.data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const remove = async (req, res) => {
  try {
    const part = await Part.findByIdAndDelete(req.params.partId).select(
      "-photo"
    );
    res.json(part);
  } catch (err) {
    console.log(err);
  }
};

export const update = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      make,
      model,
      quantity,
      truckYear,
      partNumber,
    } = req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name.trim():
        return req.json({ error: "Name is required." });
      case !description.trim():
        return req.json({ error: "Description is required." });
      case !price.trim():
        return req.json({ error: "Price is required." });
      case !category.trim():
        return req.json({ error: "Category is required." });
      case !make.trim():
        return req.json({ error: "Make is required." });
      case !model.trim():
        return req.json({ error: "Model is required." });
      case !quantity.trim():
        return req.json({ error: "Quantity is required." });
      case !truckYear.trim():
        return req.json({ error: "Year is required." });
      case !partNumber.trim():
        return req.json({ error: "Part Number is required." });
    }

    // update part
    const part = await Part.findByIdAndUpdate(
      req.params.partId,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      part.photo.data = fs.readFileSync(photo.path);
      part.photo.contentType = photo.type;
    }

    await part.save();
    res.json(part);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const filteredParts = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    console.log("args => ", args);

    const parts = await Part.find(args);
    console.log("filtered products query => ", parts.length);
    res.json(parts);
  } catch (err) {
    console.log(err);
  }
};

export const partsCount = async (req, res) => {
  try {
    const total = await Part.find({}).estimatedDocumentCount();
    res.json(total);
  } catch (err) {
    console.log(err);
  }
};

export const listParts = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;

    const parts = await Part.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.json(parts);
  } catch (err) {
    console.log(err);
  }
};

export const partsSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Part.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { partNumber: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");

    res.json(results);
  } catch (err) {
    console.log(err);
  }
};
