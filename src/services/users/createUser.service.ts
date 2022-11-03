import * as bcrypt from "bcrypt";
import AppDataSource from "../../data-source";
import Users from "../../entities/user.entity";
import AppError from "../../Error/AppError"
import { IUserRequest } from "../../interfaces/user";

const createUserService = async ({ name, email, age, password, CPF, sex, img, isAdmin, address }: IUserRequest): Promise<Users> => {
	const userRepository = AppDataSource.getRepository(Users);

	const users = await userRepository.find();

	const emailAlredyExists = users.find((user) => user.email === email);

	if (emailAlredyExists) {
		throw new AppError("Email already exists!");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const { city, district, number, state, zipCode } = address

	const user = userRepository.create({
		name,
		email,
		age,
		password: hashedPassword,
		CPF,
		sex,
		img,
		isAdmin,
		address: {
			city,
			district,
			number,
			state,
			zipCode
		}
	});

	await userRepository.save(user);

	return user;
};

export default createUserService;