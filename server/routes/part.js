import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import {
  create,
  list,
  read,
  photo,
  remove,
  update,
  filteredParts,
  partsCount,
  listParts,
  partsSearch,
} from "../controllers/part.js";

router.post("/part", requireSignin, isAdmin, formidable(), create);
router.get("/parts", list);
router.get("/part/:slug", read);
router.get("/part/photo/:partId", photo);
router.delete("/part/:partId", requireSignin, isAdmin, remove);
router.put("/part/:partId", requireSignin, isAdmin, formidable(), update);
router.post("/filtered-parts", filteredParts);
router.get("/parts-count", partsCount);
router.get("/list-parts/:page", listParts);
router.get("/parts/search/:keyword", partsSearch);

export default router;
