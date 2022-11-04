import AppDataSource from "../../data-source";
import Addresses from "../../entities/address.entity";
import Users from "../../entities/user.entity";
import AppError from "../../Error/AppError";

const deleteUserService = async (userId: string): Promise<void> => {
    const userRepository = AppDataSource.getRepository(Users);
    const addressesRepository = AppDataSource.getRepository(Addresses);
    const findUser = await userRepository.findOneBy({ id: userId });
    
    if (!findUser) {
        throw new AppError("User not found", 404);
    }

    await userRepository.delete(userId)
    await addressesRepository.delete(findUser.address.id)
}

export default deleteUserService;