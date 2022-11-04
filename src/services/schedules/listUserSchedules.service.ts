import AppDataSource from "../../data-source";
import Schedules from "../../entities/schedule.entity";

const listUserSchedulesService = async (userID: string): Promise<Schedules[]> => {

    const scheduleRepository = AppDataSource.getRepository(Schedules)


    const userSchedules = await scheduleRepository.find({
        where: {
            user: {
                id: userID
            }
        }
    })


    return userSchedules;
};

export default listUserSchedulesService;