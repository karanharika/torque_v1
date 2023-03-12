import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import { create, update, remove, list, read } from "../controllers/model.js";

router.post("/model", requireSignin, isAdmin, create);
router.put("/model/:modelId", requireSignin, isAdmin, update);
router.delete("/model/:modelId", requireSignin, isAdmin, remove);
router.get("/models", list);
router.get("/model/:slug", read);

export default router;
