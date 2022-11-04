import * as bcrypt from "bcrypt";
import AppDataSource from "../../data-source";
import Addresses from "../../entities/address.entity";
import Users from "../../entities/user.entity";
import AppError from "../../Error/AppError"
import { IUserRequest } from "../../interfaces/user";

const createUserService = async ({ name, email, age, password, CPF, sex, img, isAdmin, address }: IUserRequest): Promise<Users> => {
	console.log('entrou no service do users')
	const userRepository = AppDataSource.getRepository(Users);	
	const addressRepository = AppDataSource.getRepository(Addresses)	

	const users = await userRepository.find();	
	
	const emailAlreadyExists = users.find((user) => user.email === email);

	if (emailAlreadyExists) {
		throw new AppError("Email already exist!");
	}

	const cpfAlreadyExists = users.find(user => user.CPF === CPF);

	if (cpfAlreadyExists) {
		throw new AppError("CPF already exist")
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const createdAddress = addressRepository.create(address);

	await addressRepository.save(createdAddress);

	const user = userRepository.create({
		name,
		email,
		age,
		password: hashedPassword,
		CPF,
		sex,
		img,
		isAdmin,
		address: createdAddress
	});

	await userRepository.save(user);

	return user;
};

export default createUserService;