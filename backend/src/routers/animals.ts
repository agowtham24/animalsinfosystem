import { Router } from "express";
import multer from "multer";
import {
  addAnimal,
  getAll,
  deleteAnimal,
  editAnimal,
} from "../controllers/animals";

export const animalRouter = Router();
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/animals");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});
const upload = multer({ storage: Storage });
animalRouter.post("/", upload.single("image"), addAnimal);
animalRouter.get("/",getAll)
animalRouter.delete("/:id",deleteAnimal)
animalRouter.patch("/:id",upload.single("image"),editAnimal)