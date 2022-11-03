import AppDataSource from "../../data-source";
import Users from "../../entities/user.entity";

const listUsersService = async (): Promise<Users[]> => {
	const userRepository = AppDataSource.getRepository(Users);
	const users = await userRepository.find();
	return users;
};

export default listUsersService;
