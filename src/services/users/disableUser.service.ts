import AppDataSource from "../../data-source";
import Users from "../../entities/user.entity";
import AppError from "../../Error/AppError";

const disableUserService = async (userId: string): Promise<void> => {
	const userRepository = AppDataSource.getRepository(Users);

	const user = await userRepository.findOneBy({ id: userId });

	if (!user) {
		throw new AppError("User not found", 404);
	}

	if (!user.isActive) {
		throw new AppError('User already inactive');
	}

	await userRepository.update(userId, { isActive: false });
};

export default disableUserService;
