import { ILogin } from "../../../interfaces/login";
import { IUserRequest } from "../../../interfaces/user";

export const mockedUser: IUserRequest = {
    name: "Daniel",
    email: "daniel@mail.com",
    isAdmin: false,
    password: "123456",
    age: 30,
    CPF: "12345678911",
    sex: "Masculino",
    img: "htttp://",
    address: {
        district: "Rua São Vicente",
        city: "São Paulo",
        number: 89,
        state: "SP",
        zipCode: "121556"
    }
}

export const mockedUserActive: IUserRequest = {
    name: "Daniel Galvan",
    email: "danielgalvan@mail.com",
    isAdmin: false,
    password: "123456",
    age: 30,
    CPF: "12345678918",
    sex: "Masculino",
    img: "htttp://",
    address: {
        district: "Rua São Vicente",
        city: "São Paulo",
        number: 89,
        state: "SP",
        zipCode: "121556"
    }
}

export const mockedAdmin: IUserRequest = {
    name: "Daniel",
    email: "daniel2@mail.com",
    isAdmin: true,
    password: "123456",
    age: 30,
    CPF: "12345678912",
    sex: "Masculino",
    img: "htttp://",
    address: {
        district: "Rua São Vicente",
        city: "São Paulo",
        number: 89,
        state: "SP",
        zipCode: "121556"
    }
}

export const mockedUserInvalidCpf: IUserRequest = {
    name: "Daniel",
    email: "daniel@mail.com",
    isAdmin: false,
    password: "123456",
    age: 30,
    CPF: "1234567891",
    sex: "Masculino",
    img: "htttp://",
    address: {
        district: "Rua São Vicente",
        city: "São Paulo",
        number: 89,
        state: "SP",
        zipCode: "121556"
    }
}
export const mockedUserCpfAlredyExist: IUserRequest = {
    name: "Daniel",
    email: "daniel3@mail.com",
    isAdmin: false,
    password: "123456",
    age: 30,
    CPF: "12345678911",
    sex: "Masculino",
    img: "htttp://",
    address: {
        district: "Rua São Vicente",
        city: "São Paulo",
        number: 89,
        state: "SP",
        zipCode: "121556"
    }
}

export const mockedUserLogin: ILogin = {
    email: "daniel@mail.com",
    password: "123456"
}

export const mockedUserActiveLogin: ILogin = {
    email: "danielgalvan@mail.com",
    password: "123456"
}

export const mockedAdminLogin: ILogin = {
    email: "daniel2@mail.com",
    password: "123456"
}

