import { json, Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import softDeleteScheduleService from "../../services/schedules/softDeleteSchedule.service";

const softDeleteScheduleController =async (req: Request, res: Response) => {

    const scheduleID = req.params.id
    
    const cancelSchedule = await softDeleteScheduleService(scheduleID)

    if(cancelSchedule){
        return res.status(200).json({
            message: "Schedule deleted with success!"
        })
    }
   
    
}

export default softDeleteScheduleController