import { Request, Response } from "express";
import { ReviewModel } from "../schemas/reviews";

export const createReview = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const existingReview = await ReviewModel.findOne({
      userId: body.userId,
      serviceId: body.animalId,
    });

    if (existingReview) {
      return res.status(400).json({ error: "Review already exists" });
    }

    const newReview = new ReviewModel(body);
    await newReview.save();
    res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getReviewsByService = async (req: Request, res: Response) => {
  try {
    const reviews = await ReviewModel.aggregate([
      {
        $match: { animalId: req.params.serviceId },
      },
      {
        $addFields: {
          userObjectId: { $toObjectId: "$userId" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userObjectId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          _id: 1,
          rating: 1,
          review: 1,
          comment: 1,
          user: { name: 1, email: 1 },
        },
      },
    ]);

    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
