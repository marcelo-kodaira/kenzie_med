import AppDataSource from "../../data-source";
import Addresses from "../../entities/address.entity";
import Doctors from "../../entities/doctor.entity";
import AppError from "../../Error/AppError";
import { IDoctorUpdate } from "../../interfaces/doctor";

const updateUserService = async (
  { name, email, password, CRM, age, sex, address }: IDoctorUpdate,
  userId: string
) => {
  const userRepository = AppDataSource.getRepository(Doctors);

  const addressesRepository = AppDataSource.getRepository(Addresses);

  const findDoctor = await userRepository.findOneBy({ id: userId });

  const addresses = await addressesRepository.find();

  if (!findDoctor) {
    throw new AppError("User not found", 404);
  }

  const addressDoctor = addresses.find(
    (foundAddress) => foundAddress.id === findDoctor.address.id
  );

  if (!addressDoctor) {
    throw new AppError("Address not found", 404);
  }

  await userRepository.update(userId, {
    name,
    email,
    password,
    age,
    sex,
  });

  if (address) {
    if (!addressDoctor) {
      throw new AppError("Address not found", 404);
    }
    await addressesRepository.update(addressDoctor.id, {
      city: address.city,
      district: address.district,
      number: address.number,
      zipCode: address.zipCode,
      state: address.state,
    });
  }
  const userDoctor = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      address: true,
      specialties: true,
      schedules: true,
    },
  });

  return userDoctor!;
};
export default updateUserService;
