import { compare } from "bcrypt";
import AppDataSource from "../../data-source";
import Users from "../../entities/user.entity";
import AppError from "../../Error/AppError";
import { ILogin } from "../../interfaces/login";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginUserService = async ({ email, password }: ILogin) => {
	const userRepository = AppDataSource.getRepository(Users);


	if (!email) {
		throw new AppError("email is a required information");
	}

	const user = await userRepository.findOneBy({
		email
	});

	if (!user) {
		throw new AppError("Wrong password or email",403);
	}
	
	if (!user.isActive) {
		console.error(user)
		throw new AppError("User is currently inactive");
	}

	const matchUser = await compare(password, user.password);
	if (!matchUser) {
		throw new AppError("Wrong password or email",403);
	}

	const token = jwt.sign(
		{
			isAdmin: user.isAdmin,
		},
		process.env.SECRET_KEY as string,
		{
			expiresIn: "2h",
			subject: user.id,
		}
	);

	return token;
};

export default loginUserService;
