import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const partSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: {},
      trim: true,
      required: true,
      maxlength: 3000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    make: {
      type: ObjectId,
      ref: "Make",
      required: true,
    },
    model: {
      type: ObjectId,
      ref: "Model",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    truckYear: {
      type: Number,
      required: true,
    },
    partNumber: {
      type: String,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Part", partSchema);
