import { Request, Response } from "express";
import { IDoctorUpdate } from "../../interfaces/doctor";
import updateUserService from "../../services/doctors/patchDoctors.service";

const updateUserController = async (req: Request, res: Response) => {
  const { name, email, password, age, sex, address }: IDoctorUpdate = req.body;

<<<<<<< HEAD
    const { name, email, password, age, sex, address }: IDoctorUpdate= req.body;
=======
  const userId = req.params.id;
>>>>>>> 77d79ad22d42b7c5157da5416dd13d3ba016bab0

  const updatedUser = await updateUserService(
    { name, email, password, age, sex, address },
    userId
  );

<<<<<<< HEAD
    const updatedUser = await updateUserService(
        { name, email, password, age, sex, address },
        userId
    );

    return res.json(updatedUser);
=======
  return res.json(updatedUser);
>>>>>>> 77d79ad22d42b7c5157da5416dd13d3ba016bab0
};
export default updateUserController;
