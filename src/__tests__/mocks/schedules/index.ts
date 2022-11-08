import { IScheduleRequest } from "../../../interfaces/schedule";

export const mockedCreateSpeciality = {
	"name": "teste"
}

export const mockedCreateDoctor = {
	"name": "Doctor teste",
	"email": "teste@gmail.com",
	"password": "123456",
	"CRM": "MG124464",
	"sex": "Masculino",
	"age": 33,
	"specialtiesId": {
		"id": 1
	},
	"address": {
		"district": "Rua Doctor Pires de camargo",
		"zipCode": "18155000",
		"number": "68",
		"city": "Piedade",
		"state": "SP"
	}
}


export const mockedLoginDoctor = {
    "email": "teste@gmail.com",
	"password": "123456"
}