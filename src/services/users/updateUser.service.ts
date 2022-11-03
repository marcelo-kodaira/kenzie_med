import AppDataSource from "../../data-source";
import Users from "../../entities/user.entity";
import AppError from "../../Error/AppError";
import { IUserUpdate } from "../../interfaces/user";

const updateUserService = async ({ name, email, password, age, sex, img, address }: IUserUpdate, userId: string): Promise<Users> => {
	const userRepository = AppDataSource.getRepository(Users);
	const findUser = await userRepository.findOneBy({ id: userId });

	if (!findUser) {
		throw new AppError("User nor found", 404);
	}

	await userRepository.update(userId, {
		name: name,
		email: email,
		password: password,
		age,
		sex,
		img,
		address,
	});

	const user = await userRepository.findOneBy({ id: userId });

	return user!;
};

export default updateUserService;
