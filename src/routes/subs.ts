import { Request, Response, Router } from "express";
import { isEmpty } from "class-validator";
import User from "../entities/User";
import auth from "../middleware/auth";
import { getRepository } from "typeorm";
import Sub from "../entities/Sub";
import user from "../middleware/user";

const createSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;
  const user: User = res.locals.user;
  try {
    let errors: any = {};
    if (isEmpty(name)) errors.name = "Name must not be null";
    if (isEmpty(title)) errors.title = "Title must not be null";

    // check if sub exists
    const sub = await getRepository(Sub)
      .createQueryBuilder("sub")
      .where("lower(sub.name) = :name", { name: name.toLowerCase() })
      .getOne();
    if (sub) errors.name = "Sub exists already";

    if (Object.keys(errors).length > 0) {
      throw errors;
    }
  } catch (err) {
    return res.status(400).json(err);
  }

  try {
    const newSub = new Sub({ name, description, title, user });
    await newSub.save();

    return res.json(newSub);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const router = Router();

router.post("/", user, auth, createSub);

export default router;
