export const mockedDoctors = [
  {
    name: "Mr. Correct One",
    email: "okone@mail.com",
    password: "123456",
    CRM: "OK111111",
    age: 90,
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Street A",
      zipCode: "121342352",
      number: 300,
      city: "Correctville",
      state: "OK",
    },
  },
  {
    name: "Mr. Correct Two",
    email: "oktwo@mail.com",
    password: "123456",
    CRM: "OK222222",
    age: 90,
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Street B",
      zipCode: "12312312",
      number: 400,
      city: "Correctville",
      state: "OK",
    },
  },
  {
    name: "Mr. Correct Three",
    email: "okthree@mail.com",
    password: "123456",
    CRM: "OK333333",
    age: 90,
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Street C",
      zipCode: "12312312",
      number: 400,
      city: "Correctville",
      state: "OK",
    },
  },
]

interface INulledTest {
  name?: string | null
  email?: string | null
  password?: string | null
  CRM?: string | null
  age?: number | null | string
  specialtiesId?: { id: number | null } | null | string
  sex?: string | null
  address?:
    | {
        district?: string | null
        zipCode?: string | null
        number?: number | null | string
        city?: string | null
        state?: string | null
      }
    | null
    | string
  nulledProp: string
}

export const mockedNulledProperties: INulledTest[] = [
  {
    name: "",
    email: "mrwatson@yahoo.com",
    password: "123456",
    age: 30,
    CRM: "BA 995577",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Deploys",
      zipCode: "31030010",
      number: 333,
      city: "Springtown",
      state: "BA",
    },
    nulledProp: "name",
  },
  {
    name: "James Watson",
    email: "",
    password: "123456",
    age: 30,
    CRM: "BA 995577",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Deploys",
      zipCode: "31030010",
      number: 333,
      city: "Springtown",
      state: "BA",
    },
    nulledProp: "email",
  },
  {
    name: "James Watson",
    email: "mrwatson@yahoo.com",
    password: "",
    age: 30,
    CRM: "BA 995577",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Deploys",
      zipCode: "31030010",
      number: 333,
      city: "Springtown",
      state: "BA",
    },
    nulledProp: "password",
  },
  {
    name: "James Watson",
    email: "mrwatson@yahoo.com",
    password: "123456",
    age: null,
    CRM: "BA 995577",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Deploys",
      zipCode: "31030010",
      number: 333,
      city: "Springtown",
      state: "BA",
    },
    nulledProp: "age",
  },
  {
    name: "James Watson",
    email: "mrwatson@yahoo.com",
    password: "123456",
    age: 30,
    CRM: null,
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Deploys",
      zipCode: "31030010",
      number: 333,
      city: "Springtown",
      state: "BA",
    },
    nulledProp: "crm",
  },
  {
    name: "James Watson",
    email: "mrwatson@yahoo.com",
    password: "123456",
    age: 30,
    CRM: "BA 995577",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Deploys",
      zipCode: "31030010",
      number: 333,
      city: "Springtown",
      state: "BA",
    },
    nulledProp: "specialtiesId.id",
  },
  {
    name: "James Watson",
    email: "mrwatson@yahoo.com",
    password: "123456",
    age: 30,
    CRM: "BA 995577",
    specialtiesId: "",
    sex: "Masculino",
    address: {
      district: "Rua dos Deploys",
      zipCode: "31030010",
      number: 333,
      city: "Springtown",
      state: "BA",
    },
    nulledProp: "speciality",
  },
  {
    name: "James Watson",
    email: "mrwatson@yahoo.com",
    password: "123456",
    age: 30,
    CRM: "BA 995577",
    specialtiesId: { id: 1 },
    sex: "",
    address: {
      district: "Rua dos Deploys",
      zipCode: "31030010",
      number: 333,
      city: "Springtown",
      state: "BA",
    },
    nulledProp: "sex",
  },
  {
    name: "James Watson",
    email: "mrwatson@yahoo.com",
    password: "123456",
    age: 30,
    CRM: "BA 995577",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "",
      zipCode: "31030010",
      number: 333,
      city: "Springtown",
      state: "BA",
    },
    nulledProp: "address.district",
  },
  {
    name: "James Watson",
    email: "mrwatson@yahoo.com",
    password: "123456",
    age: 30,
    CRM: "BA 995577",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Deploys",
      zipCode: "",
      number: 333,
      city: "Springtown",
      state: "BA",
    },
    nulledProp: "address.zipCode",
  },
  {
    name: "James Watson",
    email: "mrwatson@yahoo.com",
    password: "123456",
    age: 30,
    CRM: "BA 995577",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Deploys",
      zipCode: "31030010",
      number: "",
      city: "Springtown",
      state: "BA",
    },
    nulledProp: "address.number",
  },
  {
    name: "James Watson",
    email: "mrwatson@yahoo.com",
    password: "123456",
    age: 30,
    CRM: "BA 995577",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Deploys",
      zipCode: "31030010",
      number: 333,
      city: "",
      state: "BA",
    },
    nulledProp: "address.city",
  },
  {
    name: "James Watson",
    email: "mrwatson@yahoo.com",
    password: "123456",
    age: 30,
    CRM: "BA 995577",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Deploys",
      zipCode: "31030010",
      number: 333,
      city: "Springtown",
      state: "",
    },
    nulledProp: "address.state",
  },
  {
    name: "James Watson",
    email: "mrwatson@yahoo.com",
    password: "123456",
    age: 30,
    CRM: "BA 995577",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: "",
    nulledProp: "address",
  },
]

interface IMissingTest {
  name?: string
  email?: string
  password?: string
  CRM?: string
  age?: number
  specialtiesId?: { id: number }
  sex?: string
  address?: {
    district: string
    zipCode: string
    number: number
    city: string
    state: string
  }
  missingProp: string
}

export const mockedMissingProperties: IMissingTest[] = [
  {
    email: "chopper@mail.com",
    password: "123456",
    CRM: "SE 791234",
    age: 28,
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Bugs",
      zipCode: "31030010",
      number: 333,
      city: "Javaville",
      state: "SE",
    },
    missingProp: "name",
  },
  {
    name: "Tony Tony Chopper",
    password: "123456",
    CRM: "SE 791234",
    age: 28,
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Bugs",
      zipCode: "31030010",
      number: 333,
      city: "Javaville",
      state: "SE",
    },
    missingProp: "email",
  },
  {
    name: "Tony Tony Chopper",
    email: "chopper@mail.com",
    CRM: "SE 791234",
    age: 28,
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Bugs",
      zipCode: "31030010",
      number: 333,
      city: "Javaville",
      state: "SE",
    },
    missingProp: "password",
  },
  {
    name: "Tony Tony Chopper",
    email: "chopper@mail.com",
    password: "123456",
    age: 28,
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Bugs",
      zipCode: "31030010",
      number: 333,
      city: "Javaville",
      state: "SE",
    },
    missingProp: "crm",
  },
  {
    name: "Tony Tony Chopper",
    email: "chopper@mail.com",
    password: "123456",
    CRM: "SE 791234",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Bugs",
      zipCode: "31030010",
      number: 333,
      city: "Javaville",
      state: "SE",
    },
    missingProp: "age",
  },
  {
    name: "Tony Tony Chopper",
    email: "chopper@mail.com",
    password: "123456",
    CRM: "SE 791234",
    age: 28,
    sex: "Masculino",
    address: {
      district: "Rua dos Bugs",
      zipCode: "31030010",
      number: 333,
      city: "Javaville",
      state: "SE",
    },
    missingProp: "speciality",
  },
  {
    name: "Tony Tony Chopper",
    email: "chopper@mail.com",
    password: "123456",
    CRM: "SE 791234",
    age: 28,
    specialtiesId: { id: 1 },
    missingProp: "address",
  },
]

//CRM deve possuir no maximo 8 caracteres (2 letras e 6 numeros)
export const mockedInvalidCrm = [
  {
    name: "James Watson",
    email: "mrwatson@yahoo.com",
    password: "123456",
    age: 30,
    CRM: "BA 995577A",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Deploys",
      zipCode: "31030010",
      number: 333,
      city: "Springtown",
      state: "BA",
    },
  },
  {
    name: "Sherlock Holmes",
    email: "mrholmes@hotmail.com",
    password: "123456",
    age: 32,
    CRM: "AL 6712458",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Rua dos Arrays",
      zipCode: "31030010",
      number: 999,
      city: "Mongo Paradise",
      state: "AL",
    },
  },
]

export const mockedInvalidAge = [
  {
    name: "Albus Dumbledore",
    email: "albus@gmail.com",
    password: "123456",
    age: 0,
    CRM: "MG 125634",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "Firebase Street",
      zipCode: "31030010",
      number: 999,
      city: "Dockerville",
      state: "MG",
    },
  },
  {
    name: "Gellert Grindelwald",
    email: "gellert@gmail.com",
    password: "123456",
    age: 120,
    CRM: "SP 135577",
    specialtiesId: { id: 1 },
    sex: "Masculino",
    address: {
      district: "AWS Alley",
      zipCode: "21152454",
      number: 999,
      city: "Mocktown",
      state: "SP",
    },
  },
]

export const mockedInvalidStates = [
  {
    name: "Beatrice Prior",
    email: "tris@gmail.com",
    password: "123456",
    age: 16,
    CRM: "DF 999999",
    specialtiesId: { id: 1 },
    sex: "Feminino",
    address: {
      district: "Sql Square",
      zipCode: "31252425",
      number: 999,
      city: "New Error",
      state: "DFF",
    },
  },
  {
    name: "Beatrice Prior",
    email: "tris@gmail.com",
    password: "123456",
    age: 16,
    CRM: "DF 999999",
    specialtiesId: { id: 1 },
    sex: "Feminino",
    address: {
      district: "Sql Square",
      zipCode: "31252425",
      number: 999,
      city: "New Error",
      state: "D",
    },
  },
]
