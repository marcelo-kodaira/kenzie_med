import AppDataSource from "../../data-source"
import Users from "../../entities/user.entity"
import AppError from "../../Error/AppError"
import { IUser } from "../../interfaces/user"

const retrieveUserService = async (userId: string): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(Users)
  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      address: true,
      schedules: true,
    },
  })

  if (!findUser) {
    throw new AppError("User not found", 404)
  }

  return findUser
}

export default retrieveUserService
