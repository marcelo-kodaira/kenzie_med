import { Request, Response } from "express";
import deleteScheduleService from "../../services/schedules/deleteSchedule.service";

const deleteScheduleController = async (req: Request, res: Response) => {

    const scheduleID = req.params.id      

    await deleteScheduleService(scheduleID)  
   
        return res.status(200).json({
            message: "Deleted with sucess!"
        })
        
}

export default deleteScheduleController