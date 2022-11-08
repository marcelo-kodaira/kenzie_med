/* import { Request, Response } from "express";
import permanentDeleteDoctorService from "../../services/doctors/permanentDeleteDoctor.service";

const permantentDeleteController = async (req: Request, res: Response) => {

    const id = req.params.id;

    await permanentDeleteDoctorService(id);

    return res.status(204).send();
}

export default permantentDeleteController; */
