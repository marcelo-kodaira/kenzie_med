import AppDataSource from "../../data-source";
import Addresses from "../../entities/address.entity";
import Users from "../../entities/user.entity";
import AppError from "../../Error/AppError";
import { IUserUpdate } from "../../interfaces/user";

const updateUserService = async ({ name, email, password, age, sex, img, address }: IUserUpdate, userId: string): Promise<Users> => {
	const userRepository = AppDataSource.getRepository(Users);
	const addressesRepository = AppDataSource.getRepository(Addresses);
	const findUser = await userRepository.findOneBy({ id: userId });
	const addresses = await addressesRepository.find();
	
	if (!findUser) {
		throw new AppError("User nor found", 404);
	}

	const addressUser = addresses.find(findedAddress => findedAddress.id === findUser.address.id)
	
	await userRepository.update(userId, {
		name: name,
		email: email,
		password: password,
		age: age,
		sex: sex,
		img: img,
	});

	if (address) {
		if (!addressUser) {
			throw new AppError("Address not found", 404);
		}
		const updateAddress = await addressesRepository.update(addressUser.id, {
			city: address.city,
			district: address.district,
			number: address.number,
			zipCode: address.zipCode,
			state: address.state
		})
	}

	const user = await userRepository.findOne({
		where: {
			id: userId
		},
		relations: {
			address: true,
			schedules: true
		}
	});

	return user!;
};

export default updateUserService;
