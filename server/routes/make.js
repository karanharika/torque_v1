import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import { create, update, remove, list, read } from "../controllers/make.js";

router.post("/make", requireSignin, isAdmin, create);
router.put("/make/:makeId", requireSignin, isAdmin, update);
router.delete("/make/:makeId", requireSignin, isAdmin, remove);
router.get("/makes", list);
router.get("/make/:slug", read);

export default router;
