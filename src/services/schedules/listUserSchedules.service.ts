import AppDataSource from "../../data-source";
import Schedules from "../../entities/schedule.entity";
import AppError from "../../Error/AppError";

const listUserSchedulesService = async (userID: string): Promise<Schedules[]> => {

    const scheduleRepository = AppDataSource.getRepository(Schedules)


    const userSchedules = await scheduleRepository.find({
        where: {
            user: {
                id: userID
            }
        }
    })

    if(userSchedules.length === 0){
        throw new AppError("User dont have any schedule", 400)
    }
    return userSchedules;
};

export default listUserSchedulesService;