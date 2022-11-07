import { compare } from "bcrypt";
import AppDataSource from "../../data-source";
import AppError from "../../Error/AppError";
import { ILogin } from "../../interfaces/login";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Doctors from "../../entities/doctor.entity";

const loginDoctorService = async ({ email, password }: ILogin): Promise<string> => {
  const docRepository = AppDataSource.getRepository(Doctors);

  const doctor = await docRepository.findOneBy({
    email,
  });

  if (!email) {
		throw new AppError("email is a required information");
	}

	if (!doctor?.isActive) {
		throw new AppError("Doctor is currently inactive", 403);
	}

  if (!doctor) {
    throw new AppError("Wrong password or email");
  }

  const matchDoc = await compare(password, doctor.password);
  if (!matchDoc) {
    throw new AppError("Wrong password or email");
  }

  const token = jwt.sign(
    {
      crm: doctor.CRM,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "2h",
      subject: doctor.id,
    }
  );

  return token;
};

export default loginDoctorService;
