import { animalModel } from "../schemas/animals";
import { Request, Response } from "express";

export const addAnimal = async (req: Request, res: Response) => {
  try {
    const data = {
      ...req.body,
      image: req.file?.filename,
    };
    const existingAnimal = await animalModel.findOne({
      name: data.name,
    });
    if (existingAnimal) {
      return res.status(400).send({ msg: "Animal Already exists" });
    }
    const add = new animalModel(data);
    await add.save();
    res.status(200).send({ msg: "Animal Added Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const data = await animalModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await animalModel.findById(req.params.id);
    if (!animal) {
      return res.status(400).send({ msg: "Animal not exists on Id" });
    }
    await animalModel.findByIdAndDelete(req.params.id);
    res.send({ msg: "Animal deleted SuccessfullyF" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const editAnimal = async (req: Request, res: Response) => {
  try {
    let body = {
      ...req.body,
    };
    if (req.files) {
      body.image = req.file?.filename;
    }
    await animalModel.findByIdAndUpdate(req.params.id, body);
    res.send({ msg: "Animal updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
