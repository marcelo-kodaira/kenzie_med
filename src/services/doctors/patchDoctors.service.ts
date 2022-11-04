import AppDataSource from "../../data-source";
import { hash } from "bcrypt";
import { IDoctorUpdate } from "../../interfaces/doctor";
import Doctors from "../../entities/doctor.entity";
import AppError from "../../Error/AppError";

const patchDoctorsService = async({name, email, password, sex, age, specialtiesId, address }: IDoctorUpdate, id: string) => {

    const doctorsRepository = AppDataSource.getRepository(Doctors)

    const findDoctor = await doctorsRepository.findOneBy({
        id
    })

    if(!findDoctor){
        throw new AppError('Doctor not found', 404)
    }

    await doctorsRepository.update(
        id,
        {
            name: name ? name : findDoctor.name,
            email: email ? email : findDoctor.email,
            password: password ? await hash(password, 10) : findDoctor.password,
            sex: sex ? sex : findDoctor.sex,
            age: age ? age : findDoctor.age,     
        }
    )

    const doctor = await doctorsRepository.findOneBy({
        id
    });

    return {name,email,password, sex, address};
}

export default patchDoctorsService