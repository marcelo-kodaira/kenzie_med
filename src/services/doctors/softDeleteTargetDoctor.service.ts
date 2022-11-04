import AppDataSource from "../../data-source";
import Doctors from "../../entities/doctor.entity";

const softDeleteTargetDoctorService = async (id: string ) => {
    const doctorRepository = AppDataSource.getRepository( Doctors );

    const docotrToDelete = await doctorRepository.find();

    const account = docotrToDelete.find( targetDocotr => targetDocotr.id === id );

    account!.isActive = false;

    await doctorRepository.save(account!);

    return account;
}

export default softDeleteTargetDoctorService;