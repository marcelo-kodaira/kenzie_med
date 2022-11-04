import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createScheduleService from "../../services/schedules/createSchedule.service";


const createScheduleController = async (req: Request, res: Response) => {   

    const {type, description, doctorsID, hour, date} = req.body   
    
    const newSchedule = await createScheduleService({type, description, doctorsID, hour, date})
 
    return res.status(201).send(instanceToPlain(newSchedule))
    
}

export default createScheduleController