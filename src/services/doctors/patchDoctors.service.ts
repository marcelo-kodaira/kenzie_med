import AppDataSource from "../../data-source";
import bcrypt, { hash } from "bcrypt";
import { IDoctorUpdate } from "../../interfaces/doctor";
import Doctors from "../../entities/doctor.entity";
import AppError from "../../Error/AppError";
import Addresses from "../../entities/address.entity";


const patchDoctorsService = async({name, email, password, sex, age, specialtiesId, address }: IDoctorUpdate, id: string): Promise<IDoctorUpdate>  => {

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
    })


    return {name,email,password, sex, address}

}

export default patchDoctorsService