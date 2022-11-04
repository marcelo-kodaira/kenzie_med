import AppDataSource from "../../data-source";
import bcrypt from "bcrypt";
import Addresses from "../../entities/address.entity";
import Doctors from "../../entities/doctor.entity";
import { IDoctorRequest } from "../../interfaces/doctor";
import Specialties from "../../entities/specialty.entity";
import AppError from "../../Error/AppError";

const createDoctorService = async({name, email, password, CRM, age, sex, specialtiesId, address }:IDoctorRequest): Promise<Doctors> => {

const doctorRepository = AppDataSource.getRepository(Doctors);
const doctors = await doctorRepository.find();

const emailAlreadyExists = doctors.find((doctor) => doctor.email === email);

if(emailAlreadyExists){
throw new AppError("Email already exists" )
}

const specialtyRepository = AppDataSource.getRepository(Specialties);
const findSpecialties = await specialtyRepository.findOneBy({
id: specialtiesId
});
console.log("CONCOLE LOG", findSpecialties)
if(!findSpecialties){
throw new AppError("Speciality is not exists",404 )
}

const addressesRepository = AppDataSource.getRepository(Addresses);
const findAddresses = await addressesRepository.findOne({
where: {
city: address.city,
district: address.district,
zipCode: address.zipCode,
state: address.state,
number: address.number
}
});

const createAddresses = addressesRepository.create({
city: address.city,
district: address.district,
zipCode: address.zipCode,
state: address.state,
number: address.number
})
await addressesRepository.save(createAddresses)

const doctor = new Doctors()
doctor.name = name
doctor.email = email
doctor.password = bcrypt.hashSync(password, 10)
doctor.CRM = CRM
doctor.sex = sex
doctor.age = age
doctor.isActive = true
doctor.createdAt= new Date()
doctor.updatedAt= new Date()
doctor.specialties= findSpecialties
doctor.address= createAddresses

doctorRepository.create(doctor)

await doctorRepository.save(doctor)

return doctor;

}

export default createDoctorService
